import { Request, Response, NextFunction } from "express";
import { validateToken } from "../token/validateToken";

export const isAuthenticated = (req: Request, res: Response, next: NextFunction) => {

   if (req.isAuthenticated()) {
      // validateToke(req, res, next);
      return next();
   }

   // res.redirect('/login');
   res.render('login');
};