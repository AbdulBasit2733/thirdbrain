import { NextFunction, Request, Response } from "express";
import jwt from 'jsonwebtoken';

const USER_JWT_SECRET = process.env.USER_JWT_SECRET || "ndhcydhshiueh1298431dh7d73"
export const AuthMiddleware = (req:Request, res:Response, next:NextFunction) : void => {
    const token = req.cookies.token;
    if(!token){
        res.status(400).json({
            success:false,
            message:"Unauthorize"
        });
        return;
    }
    const decodedData = jwt.verify(token, USER_JWT_SECRET);
    if(decodedData){
        //@ts-ignore
        req.userId = decodedData.id;
        next()
    }else{
        res.status(403).json({
            message:"You Are Not LoggedIn"
        });
        return
        
    }
}