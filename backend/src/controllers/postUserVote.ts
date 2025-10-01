import { Request, Response, NextFunction } from 'express';
import { prisma } from '../config/prisma';
import {
    ConflictError,
    NotFoundError,
    RangeNotSatisfiableError,
    RequestError,
} from '../errors/errors';

export const postUserVote = async (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    const clientIp = req.clientIp;
    console.log('Client IP:', clientIp);

    if (typeof clientIp !== 'string' || !clientIp) {
        return next(new RangeNotSatisfiableError('Invalid client IP'));
    }

    const { ideaId } = req.body;
    if (typeof ideaId !== 'string' || !ideaId) {
        return next(new RangeNotSatisfiableError('Invalid idea ID'));
    }

    try {
        // check if idea exists
        const ideaExists = await prisma.idea.findUnique({
            where: { id: ideaId },
            select: { id: true },
        });

        if (!ideaExists) {
            return next(new NotFoundError('The idea does not exist'));
        }

        // Transaction to ensure atomicity
        await prisma.$transaction(async (tx) => {
            // get or create IP record and lock it for update
            const ipRec = await tx.ipAddress.upsert({
                where: { ip: clientIp },
                update: {},
                create: { ip: clientIp, votesCount: 0 },
                select: {
                    id: true,
                    votesCount: true,
                },
            });

            const maxVotes = 10;

            // check if max is reached
            if (ipRec.votesCount >= maxVotes) {
                throw new ConflictError(
                    `You already voted ${ipRec.votesCount} times. Maximum ${maxVotes} votes`,
                );
            }

            // check if this IP has already voted for this idea
            const existingVote = await tx.vote.findUnique({
                where: {
                    ipAddressId_ideaId: {
                        ipAddressId: ipRec.id,
                        ideaId: ideaId,
                    },
                },
            });

            if (existingVote) {
                throw new ConflictError('Vote already recorded for this idea');
            }

            // create the vote and increment the votes count
            await tx.vote.create({
                data: { ipAddressId: ipRec.id, ideaId },
            });

            await tx.ipAddress.update({
                where: { id: ipRec.id },
                data: { votesCount: { increment: 1 } },
            });
            console.log(
                'Vote recorded successfully',
                ideaId,
                ipRec.votesCount + 1,
            );
        });
        return res.status(200).json({ message: 'Vote recorded successfully' });
    } catch (error: Error | any) {
        // Prisma error handling
        if (error?.code === 'P2002') {
            // record already exists
            return next(new ConflictError('Vote already recorded'));
        }
        if (error?.code === 'P2003') {
            // no such idea
            return next(new RequestError('The idea does not exist'));
        }

        // all other errors
        return next(new RequestError('Error recording vote'));
    }
};
