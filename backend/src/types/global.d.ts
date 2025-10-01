import 'express';

type Idea = {
    id: string;
    name: string;
    idea: string;
    voteCount: number;
    createdAt: Date;
    voted: boolean;
};

declare module 'express-serve-static-core' {
    // extend Request interface
    interface Request {
        // adding client IP address to req
        clientIp?: string;
        // all parsed IPs from proxy header
        clientIps?: string[];
    }
}
