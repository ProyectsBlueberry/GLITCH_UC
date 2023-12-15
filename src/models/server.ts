import express, { Application } from "express"
import cors from 'cors';
import cookieParser from "cookie-parser";
import session from 'express-session';

import DB from "../database/config";
import path from "path";
import PassportConfig from '../middleware/Auth/authConfig'
import passport from "passport";


export class Server {

   private app: Application;
   private port: string;

   private paths: {
      login:               string;
      users:               string;
      levels:              string;
      categories:          string;
      directory:           string;
      agreement:           string;
      workshops:           string;
      index:               string;
      sections:            string;
      facilities:          string
      facilitie_galery:   string
   }
   
   constructor() {
      this.app = express();
      this.port = process.env.PORT || '8000';
      
      this.paths = {
         login:               '/api',
         users:               '/api/users',
         levels:              '/api/levels',
         categories:          '/api/categories',
         directory:           '/api/directory',
         agreement:           '/api/agreements',
         workshops:           '/api/workshops',
         index:               '/api/index',
         sections:            '/api/sections',
         facilities:          '/api/facilities',
         facilitie_galery:    '/api/facilities-galery'

      }

      this.dbConnection();
      this.middleware();
      this.routes();
   }

   async dbConnection() {
      try {
         await DB.authenticate();
         console.log('Data base connection success');

      } catch (error: any) {
         throw new Error(error);
      }
   }

   routes(){
      this.app.use( this.paths.login, require('../routes/login'));
      this.app.use( this.paths.users, require('../routes/user'));
      this.app.use( this.paths.levels, require('../routes/levels'));
      this.app.use( this.paths.categories, require('../routes/categories'));
      this.app.use( this.paths.directory, require('../routes/directory'));
      this.app.use( this.paths.agreement, require('../routes/agreements'));
      this.app.use( this.paths.workshops, require('../routes/workshops'));
      this.app.use( this.paths.index, require('../routes/index'));
      this.app.use( this.paths.sections, require('../routes/sections'));
      this.app.use( this.paths.facilities, require('../routes/facilities'));
      this.app.use( this.paths.facilitie_galery, require('../routes/facilityGalery'));
   }

   middleware() {
      this.app.use(cors());
      this.app.use(express.json());
      this.app.use(express.urlencoded({ extended: true }));
      this.app.use(express.static('public'));

      // Login config view
      this.app.set('views', path.join(__dirname, '../views'));
      this.app.set('view engine', 'ejs');

      // Authenticate confg
      this.app.use(cookieParser(process.env.SECRET_PASS_COOKIES_PARSER));
      this.app.use(session({
         secret: process.env.SECRET_PASS_SESSION!,
         resave: true,
         saveUninitialized: true,
         cookie: {
            secure: process.env.NODE_ENV === 'production',
            httpOnly: true,
            maxAge: 3600000
         }
      }));

      this.app.use(passport.initialize());
      this.app.use(passport.session());
      
      PassportConfig.initializePassport();
   }

   listen() {
      this.app.listen( this.port,  () => {
         console.log(`Server up on ${this.port}`);
      })
   }
}