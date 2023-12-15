import { Request, Response } from "express";
import passport from "passport";
import jwt from 'jsonwebtoken';

import User from "../../models/user";

export const index = (req: Request, res: Response) => {
   res.render('login');
}

export const authenticate = () => {
   return (req: Request, res: Response, next: any) => {
      passport.authenticate('local', async (err: Error, user: User | null, info: any) => {

         if (err) {
            return res.status(500).json({ error: 'Error de autenticación' });
         }
         if (!user) {
            const errorMessage = info.message || 'No fue posible validar tus credenciales. Por favor, verifícalas e inténtalo de nuevo';

            return res.status(401).json({ error: errorMessage });
         }

         try {
            const userWithAdditionalInfo = await User.findOne({
               where: { email: user.email },
               attributes: { exclude: ['password'] }
            }) as User;

            req.logIn(userWithAdditionalInfo, (err) => {
               if (err) {
                  return res.status(500).json({ error: 'Error de autenticación' });
               }

               if (!process.env.SECRET_PASS_JWT) {
                  return res.status(500).json({ error:'SECRET_PASS_JWT no tiene un valor definido' });
               }
         
               const authToken = jwt.sign({ userId: user.id, email: user.email }, process.env.SECRET_PASS_JWT, {
                  expiresIn: '1h'
               })

               return res.json({ status: true, user: userWithAdditionalInfo, token: authToken });
            });
         } catch (error) {
            return res.status(500).json({ error: 'Error de autenticación' });
         }
      })
      (req, res, next);
   };
};