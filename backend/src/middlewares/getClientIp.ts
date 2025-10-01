import { Request, Response, NextFunction } from 'express';
import net from 'net';

/**
 * Normalizes an IP address string.
 * Deleates IPv4-mapped IPv6 prefix (::ffff:) and also the zone index in IPv6 (like %eth0).
 * @param ip - IP-address to normalize
 * @returns Normalized IP address or empty string if invalid
 */
export const normalizeIp = (ip: string | undefined | null): string | '' => {
    if (!ip) return '';

    if (ip.startsWith('::ffff:')) {
        ip = ip.substring(7); // Del of '::ffff:'
    }

    // Del of zone index in IPv6 (like "fe80::1%eth0")
    if (ip.includes('%')) {
        ip = ip.split('%')[0];
    }

    return net.isIP(ip) ? ip : '';
};

/**
 * middleware to extract and normalize client IP address from the request.
 */
export const getClientIp = (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    let clientIp: string = '';

    if (typeof req.ip === 'string') {
        clientIp = normalizeIp(req.ip);
    }

    // 2. If Express trust proxy is enabled and the IP is local, try to get the real client IP from X-Forwarded-For header
    const isLocalIp =
        !clientIp || clientIp === '127.0.0.1' || clientIp === '::1';
    if (isLocalIp) {
        const xForwardedFor = req.headers['x-forwarded-for'];

        if (xForwardedFor) {
            // check for list of IPs in X-Forwarded-For
            const ips = (
                typeof xForwardedFor === 'string'
                    ? xForwardedFor
                    : xForwardedFor[0]
            )
                .split(',')
                .map((ip) => ip.trim());

            // get the first valid IP from the list
            if (ips.length > 0) {
                clientIp = normalizeIp(ips[0]);
            }
        }
        // Special case for localhost
        if (clientIp === '::1') {
            clientIp = '127.0.0.1';
        }
    }

    // If we still don't have a valid IP, set it to empty string
    req.clientIp = clientIp || '';

    // Save all parsed IPs from the X-Forwarded-For chain (if any)
    if (Array.isArray(req.ips) && req.ips.length > 0) {
        // normalize all IPs in the chain
        req.clientIps = req.ips.map(normalizeIp).filter((ip) => ip !== '');
    } else {
        // if no chain, just use the single detected IP (if any)
        req.clientIps = req.clientIp ? [req.clientIp] : [];
    }

    // save to res.locals for easy access in views if needed
    res.locals.clientIp = req.clientIp;

    // console.log('Client IP detection:', {
    //     originalIp: req.ip,
    //     normalizedIp: req.clientIp,
    //     ipChain: req.clientIps,
    //     trustProxy: req.app.get('trust proxy'),
    // });

    next();
};
