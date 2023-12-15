import { Request, Response } from "express";
import Agreement from "../../models/agreement";
import User from "../../models/user";
import { Sequelize } from "sequelize";
// import * as fs from 'fs/promises';
// import * as path from 'path';
const fs = require('fs');
const path = require('path');
const routeStorage = '../../public/storage';


export const getAgreements = async (req: Request,  res:Response) => {
   try {
      const agreements = await Agreement.findAll({
         include:{
            model: User,
            attributes:[]
         },
         attributes:[
            ['id', 'ID'],
            [Sequelize.literal('User.name'), 'Usuario'],
            ['image', 'Convenio']
         ]
      });

      res.json(agreements);
   } catch (error: any) {
      res.status(500).json({ status: 500, message: 'Error al intentar obtener los convenios', devTool: error.message });
      console.log(error);
   }
}

export const saveAgreement = async (req: Request,  res:Response) => {
   try {

      const file = req.files as { [fieldname: string]: Express.Multer.File[] };
      const { id_user } = req.body;
      
      if( file ) {
         const uploadFile = file['image'] ? file['image'][0] : undefined;
         if( uploadFile ) {
            const serverUrl = `${req.protocol}://${req.get('host')}`;
            const url = `${serverUrl}/storage/${uploadFile?.filename}`;

            const agreement = await Agreement.create({
               id_user: id_user,
               image: url
            });

            if( agreement ) {
               res.json({
                  status: 200,
                  message: 'Convenio agregado'
               });
            }

         }
      }
   } catch (error: any) {
      res.status(500).json({ status: 500, message: 'Erro al intentar subir el convenio', devTool: error.message });
      console.log(error);
   }
}

export const updateAgreement = async (req: Request,  res:Response) => {
   try {
      const { id } = req.params;
      const data = req.body;
      const files = req.files as { [fieldname: string]: Express.Multer.File[] };
console.log(files)
      if (Object.keys(data).length > 0 || Object.keys(files).length > 0) {
         let body = {};

         if (Object.keys(data).length > 0) {
            body = {
               ...body,
               ...data,
            };
         }

         if (Object.keys(files).length > 0) {
            const fileFields = ['image'];
            const serverUrl = `${req.protocol}://${req.get('host')}`;

            const fileUrls: { [fieldname: string]: string | undefined } = {};

            for (const field of fileFields) {
               const file = files[field] ? files[field][0] : undefined;
            
               const currentFile = await Agreement.findByPk(id, {
                  attributes: [field],
               });
            
               const existingFileName: string | undefined = currentFile?.get(field) as string | undefined;
            
               if (existingFileName) {
                  const fileNameFromUrl: string | undefined = existingFileName?.split('/').pop();
                  if (fileNameFromUrl) {
                     const existingFilePath = path.join(serverUrl, 'storage', fileNameFromUrl);
                     
                     try {
                        await fs.unlink(existingFilePath);
                        console.log(`Archivo existente eliminado: ${existingFilePath}`);
                     } catch (unlinkError) {
                        console.error('Error al eliminar el archivo existente:', unlinkError);
                     }
                  } else {
                     console.warn('La imagen no existe');
                  }
               }
            
               fileUrls[field] = file ? `${serverUrl}/storage/${file.filename}` : undefined;
            }

            body = {
               ...body,
               ...fileUrls,
            };
         }

         await Agreement.update(body, {
            where: { id: id },
         });

         res.json({
            status: 200,
            message: 'Convenio actualizado'
         });
      }

   } catch (error: any) {
      res.status(500).json({ status: 500, message: 'Error al intentar actulizar el convenio', devTool: error.message });
      console.log(error);
   }
}

export const removeAgreement = async (req: Request,  res:Response) => {
   try {
      const { id } = req.params


      const serverUrl = `${req.protocol}://${req.get('host')}`;
            const indexData = await Agreement.findOne({
                where: {
                    id: id,
                },
            });
            const textoModificado = indexData?.image.replace(`${serverUrl}/storage`, '');
            const rutaCompleta = path.join(__dirname, routeStorage, textoModificado);

            if (fs.existsSync(rutaCompleta)) {
                fs.unlinkSync(rutaCompleta);
                console.log(`La imagen ${rutaCompleta} ha sido eliminada correctamente.`);
            } else {
                console.log(`La imagen ${rutaCompleta} no existe en la ruta especificada.`);
            }

      const response = await Agreement.destroy({ where: { id } });

      if (response > 0) {

         res.json({
            status: 200,
            message: 'Covenio eliminado'
         });
      }
   } catch (error: any) {
      res.status(500).json({ status: 500, message: 'Error al intentar eliminar el convenio', devTool: error.message });
      console.log(error);
   }
}