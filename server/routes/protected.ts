import { NextFunction, Request, Response, Router } from "express";
import { verify } from "jsonwebtoken";
import { secret } from "../config";

const protectedRouter: Router = Router();

type AuthorizedRequest = Request & { body : {
                                             jwt : string 
                                         }
                                     } ;

protectedRouter.use((request: AuthorizedRequest, response: Response, next: NextFunction) => {
    const token = request.headers.authorization;

console.log("request recieved in authorize");
    verify(token, secret, (tokenError) => {
        if (tokenError) {
            return response.status(403).json({
                message: "Invalid token, please Log in first",
            });
        }

        next();
    });
});

export { protectedRouter };
