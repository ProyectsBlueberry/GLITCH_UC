import { Request, Response, NextFunction } from "express";
import jwt from 'jsonwebtoken';

export const validateToken = async (req: Request, res: Response, next: NextFunction) => {
   const token = req.header('auth-token');
   
   if (!token) {
      return res.status(401).json({ status: 401, message: 'No hay un token firmado en la sesión' });
   }
   
   try {

      if (!process.env.SECRET_PASS_JWT) {
         return res.status(500).json({ status: 500,  error:'La variable SECRET_PASS_JWT no está definida' });
      }
      
      const res_token = jwt.verify( token, process.env.SECRET_PASS_JWT, {
         ignoreExpiration: false 
      });


      if( res_token ) {
         next();
      }
      else {
         res.json({ status: 401, message: 'Invalid Token.' });   
      }
   } catch (error: any) {
      res.json({ status: 401, message: 'Invalid Token.', error: `DevInfo: ${error.message}` });
   }
}