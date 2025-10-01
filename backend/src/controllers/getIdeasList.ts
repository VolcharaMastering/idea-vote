import { Request, Response, NextFunction } from 'express';
import { prisma } from '../config/prisma';

export const getIdeasList = async (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    const clientIp = req.clientIp;
    console.log('Client IP:', clientIp);

    if (typeof clientIp !== 'string') {
        return next(new Error('Invalid client IP'));
    }
    const ideas = await prisma.idea.findMany({
        orderBy: { voteCount: 'desc' },
    });

    if (!clientIp) {
        return res.status(200).json(ideas.map((i) => ({ ...i, voted: false })));
    }

    const ipRec = await prisma.ipAddress.findUnique({
        where: { ip: clientIp },
        select: { id: true },
    });
    if (!ipRec) {
        return res.status(200).json(ideas.map((i) => ({ ...i, voted: false })));
    }

    const votes = await prisma.vote.findMany({
        where: { ipAddressId: ipRec.id },
        select: { ideaId: true },
    });

    const votedSet = new Set(votes.map((v) => v.ideaId));
    return res
        .status(200)
        .json(ideas.map((i) => ({ ...i, voted: votedSet.has(i.id) })));
};
