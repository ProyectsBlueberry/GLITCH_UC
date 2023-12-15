import { Request, Response } from "express";
const bcrypt = require('bcrypt');

import User from "../../models/user";

export const getUsers = async (resq: Request, resp: Response) => {
   
   const users = await User.findAll();

   resp.json(users);
}

export const getUsersPortal = async (req: Request,  res:Response) => {
   try {
      const users = await User.findAll({
         attributes:[
            ['id', 'ID'],
            ['name', 'Nombre'],
            ['email', 'Correo']
         ]
      });

      res.json(users);

   } catch (error: any) {
      res.status(500).json({ status: 500, message: 'Error alintentar obtener los usuarios', devTool: error.message });
      console.log(error);
   }
}

export const saveUser = async (req: Request,  res:Response) => {
   try {
      const {name, email, password, confirm_password} = req.body

      if( password !== confirm_password) {
         res.status(500).json({ status: 500, message: 'Las contraseñas no coincides' });
      }

      const salt = await bcrypt.genSalt(10);
      const encryptedPassword = await bcrypt.hash(password, salt);
      
      const user = await User.create({
         name,
         email,
         password: encryptedPassword
      });

      if( user ) {
         res.status(201).json({ status: 200, message: 'Usuario creado' })
      }

   } catch (error: any) {
      res.status(500).json({ status: 500, message: '', devTool: error.message });
      console.log(error);
   }
}

export const updateUser = async (req: Request,  res:Response) => {
   try {
      const {id} = req.params;
      const body = req.body

      const fieldsUpdate: Record<string, any> = {};
      
      const objectAttributes: Record<string, string> = {
         "Nombre": "name",
         "Puesto": "Job", 
         "Ext": "extension", 
         "Correo": "email", 
         "Publico": "public", 
      };

      Object.entries(body).forEach(([key, value]) => {
         const mappedKey = objectAttributes[key];
         if (mappedKey) {
            fieldsUpdate[mappedKey] = value;
         }
      });

      const updated = await User.update(fieldsUpdate, { where: {id} });

      if( updated[0] > 0 ) {
         res.json({
            status: 200,
            message: 'Contacto actualizado'
         });
      }
   } catch (error: any) {
      res.status(500).json({ status: 500, message: '', devTool: error.message });
      console.log(error);
   }
}

export const removeUser = async (req: Request,  res:Response) => {
   try {
      const { id } = req.params

      const response = await User.destroy({ where: { id } });

      if (response > 0) {

         res.json({
            status: 200,
            message: 'Contacto eliminado'
         });
      }
   } catch (error: any) {
      res.status(500).json({ status: 500, message: '', devTool: error.message });
      console.log(error);
   }
}