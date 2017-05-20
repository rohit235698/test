import { pbkdf2, randomBytes } from "crypto";
import { NextFunction, Request, Response, Router } from "express";
import { digest, length, secret } from "../config";
import { User } from '../model/user.model';

const signupRouter: Router = Router();
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
signupRouter.post("/", (request: Request, response: Response, next: NextFunction) => {
    if (!request.body.hasOwnProperty("password")) {
        const err = new Error("No password");
        return next(err);
    }

    const salt = randomBytes(128).toString("base64");

    pbkdf2(request.body.password, salt, 10000, length, digest, (err: Error, hash: Buffer) => {
        if(!err){
            const user  = new User({
                name : request.body.name,
                username : request.body.username,
                email : request.body.email,
                password : hash.toString("hex"),
                salt : salt
            });
            user.save((err,user)=>{
                if(user)
                    response.json(user);
                if(err)
                    response.json({
                                message : "error"
                                });
            });
        }
        else
            response.json({
                message : "error"
            })
        
    });
});

signupRouter.get("/validname",(request : Request ,response : Response ,next : NextFunction) => {
    console.log(request.query.name);
    User.count({ "username" : request.query.name }, (err, count) => {
        let valid = true;
        if(err)
            throw err;
       if(count > 0)
           valid =false;
       console.log('valid user'+valid);
       response.json({
           "isValid" : valid
       });

            
});
});
/*
// login method
signupRouter.post("/", (request: Request, response: Response, next: NextFunction) => {

    pbkdf2(request.body.password, user.salt, 10000, length, digest, (err: Error, hash: Buffer) => {
        if (err) {
            console.error(err);
        }

        // check if password is active
        if (hash.toString("hex") === user.hashedPassword) {

            const token = sign({user: user.username, permissions: []}, secret, { expiresIn: "7d" });
            response.json({jwt: token});

        } else {
            response.json({message: "Wrong password"});
        }

    });
});
*/
export { signupRouter };
