import { Request, Response, response } from "express";
import { DiirectoryAttributes } from "../interfaces/DirectoryAttributes";
import Directory from "../../models/directory";
import { Sequelize } from "sequelize";

export const getContacts = async (req: Request,  res:Response) => {
   try {
      
      const contacts = await Directory.findAll({
         attributes: [
            ['id', 'ID'],
            ['prefix', 'Grado'],
            ['name', 'Nombre'],
            ['job','Puesto'],
            ['extension', 'Ext'],
            ['email', 'Correo'],
            [Sequelize.literal('CASE WHEN public = 1 THEN "true" ELSE "false" END'), 'Publico'],
         ]
      });

      res.json(contacts);

   } catch (error: any) {
      res.status(500).json({ status: 500, message: '', devTool: error.message });
      console.log(error);
   }
}
export const getContactsActive = async (req: Request,  res:Response) => {
   try {
      
      const contacts = await Directory.findAll({
         where:{
            public: true
         }

      });

      console.log(contacts);
      res.json(contacts);

   } catch (error: any) {
      res.status(500).json({ status: 500, message: '', devTool: error.message });
      console.log(error);
   }
}

export const saveContact = async (req: Request,  res:Response) => {
   try {
      const data: DiirectoryAttributes = req.body;
      const contact = await Directory.create({
         id_user: data.id_user,
         prefix:data.prefix,
         name: data.name,
         job: data.job,
         email: data.email,
         extension: data.extension,
         public: data.public
      })
      
      if( contact ) {
         res.json({
            status: 200,
            message: 'Contacto creado'
         })
      }

   } catch (error: any) {
      res.status(500).json({ status: 500, message: '', devTool: error.message });
      console.log(error);
   }
}

export const updateContact = async (req: Request,  res:Response) => {
   try {
      const {id} = req.params;
      const body = req.body

      const fieldsUpdate: Record<string, any> = {};
      
      const objectAttributes: Record<string, string> = {
         "Grado":  "prefix",
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

      const updated = await Directory.update(fieldsUpdate, { where: {id} });

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

export const removeContact = async(req: Request,  res:Response) => {
   try {
      const { id } = req.params

      const response = await Directory.destroy({ where: { id } });

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