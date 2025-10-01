"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getIdeasList = void 0;
const prisma_1 = require("../config/prisma");
const getIdeasList = async (req, res, next) => {
    const clientIp = req.clientIp;
    console.log('Client IP:', clientIp);
    if (typeof clientIp !== 'string') {
        return next(new Error('Invalid client IP'));
    }
    const ideas = await prisma_1.prisma.idea.findMany({
        orderBy: { voteCount: 'desc' },
    });
    if (!clientIp) {
        return res.status(200).json(ideas.map((i) => ({ ...i, voted: false })));
    }
    const ipRec = await prisma_1.prisma.ipAddress.findUnique({
        where: { ip: clientIp },
        select: { id: true },
    });
    if (!ipRec) {
        return res.status(200).json(ideas.map((i) => ({ ...i, voted: false })));
    }
    const votes = await prisma_1.prisma.vote.findMany({
        where: { ipAddressId: ipRec.id },
        select: { ideaId: true },
    });
    const votedSet = new Set(votes.map((v) => v.ideaId));
    return res
        .status(200)
        .json(ideas.map((i) => ({ ...i, voted: votedSet.has(i.id) })));
};
exports.getIdeasList = getIdeasList;
