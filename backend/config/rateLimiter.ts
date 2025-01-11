import { Express, Request, Response, NextFunction } from "express";
import rateLimit from 'express-rate-limit';

//authenticated limiter will help to prevent DDoS attacks.
const authenticatedLimiter = rateLimit({
    windowMs: 10 * 60 * 1000, // 10 minutes
    max: 200, // limit each IP to 100 requests per windowMs
    standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers
    message: 'Too many requests, please try again later.'
});

//unauthenticated limiter will help to prevent DDoS attacks.
//This limiter is more important becuase it is more likely that
//DDoS attack will most likely not be done through a logged in user.
const unauthenticatedLimiter = rateLimit({
    windowMs: 10 * 60 * 1000, // 10 minutes
    max: 20, // limit each IP to 100 requests per windowMs
    standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers
    message: 'Too many requests, please try again later.'
});


export default function rateLimiter(app: Express) {
    app.use((req: Request, res: Response, next:NextFunction) => {
        if (req.isAuthenticated()) {
            return authenticatedLimiter(req, res, next);
        } else {
            return unauthenticatedLimiter(req, res, next);
        }
    });
}

//Optional: if you think that a specific request needs a limiter
//you can add the function to be used bellow