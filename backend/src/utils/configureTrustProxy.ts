import { Express } from 'express';

export const configureTrustProxy = (app: Express) => {
    const trustProxyEnv = process.env.TRUST_PROXY;

    if (!trustProxyEnv) {
        // if TRUST_PROXY is not set, do not trust any proxy (default Express )
        app.set('trust proxy', false);
    } else if (trustProxyEnv === 'true') {
        // if TRUST_PROXY is 'true', trust all proxies (not for production)
        app.set('trust proxy', true);
    } else if (trustProxyEnv === 'false') {
        // Do not trust any proxies
        app.set('trust proxy', false);
    } else {
        // Trast specific proxy IPs or subnets
        app.set('trust proxy', trustProxyEnv);
    }
};
