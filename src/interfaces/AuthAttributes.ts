import { IVerifyOptions } from "passport-local";

export interface AuthAttributes {
   username:   string;
   password:   string;
   done: (error: any, user?: Express.User | false, options?: IVerifyOptions) =>  void;
}

