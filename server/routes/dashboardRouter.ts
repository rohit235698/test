import { pbkdf2, randomBytes } from "crypto";
import { NextFunction, Request, Response, Router } from "express";
import { digest, length, secret } from "../config";
import { sign } from "jsonwebtoken";
import { Match } from '../model/match.model';

const dashboardRouter: Router = Router();
/*
const user = {
    hashedPassword: "6fb3a68cb5fe34d0c2c9fc3807c8fa9bc0e7dd10023065ea4233d40a2d6bb4a" +
    "7e336a82f48bcb5a7cc95b8a590cf03a4a07615a226d09a89420a342584a" +
    "a28748336aa0feb7ac3a12200d13641c8f8e26398cfdaf268dd68746982bcf" +
    "59415670655edf4e9ac30f6310bd2248cb9bc185db8059fe979294dd3611fdf28c2b731",
    salt: "OxDZYpi9BBJUZTTaC/yuuF3Y634YZ90KjpNa+Km4qGgZXGI6vhSWW0T91" +
    "rharcQWIjG2uPZEPXiKGnSAQ73s352aom56AIYpYCfk7uNsd+7AzaQ6dxTnd9AzCCdIc/J" +
    "62JohpHPJ5eGHUJJy3PAgHYcfVzvBHnIQlTJCQdQAonQ=",
    username: "john",
};
*/

// login method
dashboardRouter.get("/getmatches", (request: Request, response: Response, next: NextFunction) => {
    console.log("request in dashboard router");
    Match.find({},(err,_matches)=>{
        console.log(_matches.length);
        if (err)
         response.json({
                message : "error"
                    });
    response.json(_matches);
 });

   
});
export { dashboardRouter };
