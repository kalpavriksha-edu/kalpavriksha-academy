import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const generateToken:any=function generate(user:any){
    const tokenSecret:string='Pooja@@9004';
    return jwt.sign({data:user},tokenSecret,{expiresIn: process.env.EXPIRESIN})
};

export default generateToken;