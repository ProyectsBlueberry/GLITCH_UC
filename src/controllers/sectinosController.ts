import { Request, Response } from "express";
import Section from "../../models/sections";
import * as fs from 'fs/promises';
import * as path from 'path';

export const getSections = async (req: Request,  res:Response) => {
   try {
      const sections = await Section.findAll({
         attributes: [
            ['id', 'ID'],
            ['name', 'Nombre'],
            ['title', 'Titulo'],
            ['image', 'Imagen'],
            ['content', 'Contenido'],
         ],
      })

      res.json(sections);
   } catch (error: any) {
      res.status(500).json({ status: 500, message: 'Error  al intentar obtener las seccions', devTool: error.message });
      console.log(error);
   }
}

export const getSection = async (req: Request,  res:Response) => {
   try {

   } catch (error: any) {
      res.status(500).json({ status: 500, message: '', devTool: error.message });
      console.log(error);
   }
}

export const saveSections = async (req: Request,  res:Response) => {
   try {
      const { id_workshop, name, title, content} = req.body;
      const file = req.files as { [fieldname: string]: Express.Multer.File[] };

      const _image = file['image'] ? file['image'][0] : undefined;

      if( _image ){
         const serverUrl = `${req.protocol}://${req.get('host')}`;
         const image = `${serverUrl}/storage/${_image?.filename}`;

         const section = await Section.create({
            id_workshop,
            name,
            title,
            image,
            content
         });

         if( section ) {
            res.json({
               status: 200,
               message: 'Sección creada'
            })
         }
      }

   } catch (error: any) {
      res.status(500).json({ status: 500, message: '', devTool: error.message });
      console.log(error);
   }
}

export const updateSections = async (req: Request,  res:Response) => {
   try {

      const { id } = req.params;
      const data = req.body;
      const files = req.files as { [fieldname: string]: Express.Multer.File[] };

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
            
               const currentFile = await Section.findByPk(id, {
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

         await Section.update(body, {
            where: { id: id },
         });

         res.json({
            status: 200,
            message: 'Seccion actualizada'
         });
      }

   } catch (error: any) {
      res.status(500).json({ status: 500, message: 'Error al actualizar ', devTool: error.message });
      console.log(error);
   }
}

export const removeSections = async (req: Request,  res:Response) => {
   try {
      const { id } = req.params
      console.log(id)

      const response = await Section.destroy({ where: { id } });

      if (response > 0) {

         res.json({
            status: 200,
            message: 'Sección eliminada'
         });
      }

   } catch (error: any) {
      res.status(500).json({ status: 500, message: '', devTool: error.message });
      console.log(error);
   }
}