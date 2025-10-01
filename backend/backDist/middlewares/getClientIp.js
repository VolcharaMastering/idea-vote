"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.normalizeIp = normalizeIp;
exports.getClientIp = getClientIp;
const net_1 = __importDefault(require("net"));
function normalizeIp(ip) {
    if (!ip)
        return '';
    // strip IPv4-mapped IPv6 prefix
    if (ip.startsWith('::ffff:'))
        ip = ip.replace('::ffff:', '');
    // remove port for raw socket addresses like '::1:54321' (rare)
    if (ip.includes('%'))
        ip = ip.split('%')[0]; // windows zone id in IPv6
    // basic validation
    return net_1.default.isIP(ip) ? ip : '';
}
function getClientIp(req, _res, next) {
    // Prefer express-provided req.ip / req.ips (works when app.set('trust proxy', ...) configured)
    let ip = typeof req.ip === 'string' ? req.ip : '';
    // If req.ips exists (when trust proxy), map/normalize them
    if (Array.isArray(req.ips) && req.ips.length) {
        const ips = req.ips;
        req.clientIps = ips.map(normalizeIp).filter(Boolean);
        // take first valid ipaddress
        ip = req.clientIps[0] || ip;
    }
    else {
        // Fallback: try X-Forwarded-For header only if req.ip is empty/localhost
        const xff = (req.headers['x-forwarded-for'] || '');
        if (xff && (!ip || ip === '::1' || ip === '127.0.0.1')) {
            // X-Forwarded-For: can be comma separated list. left-most is original client.
            const first = xff.split(',').map((s) => s.trim())[0];
            ip = first || ip;
        }
    }
    ip = normalizeIp(ip);
    req.clientIp = ip || ''; // '' if unknown
    if (!req.clientIps)
        req.clientIps = ip ? [ip] : [];
    // make available also in res.locals for templates / logging middlewares
    req.locals = req.locals || {};
    _res.locals = _res.locals || {};
    _res.locals.clientIp = req.clientIp;
    next();
}
