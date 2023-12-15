import { Request, Response } from "express";
import * as fs from 'fs/promises';
import * as path from 'path';
import Facility_Galery from "../../models/facilities_galery";

export const getGalery = async (req: Request, res: Response) => {
   try {
      const { id } = req.params;

      const galery = await Facility_Galery.findAll(
         {
            where: {
               id_facility: id
            },
            attributes: [
               ['id', 'ID'],
               ['image', 'Imagen'],
            ]
         });
      console.log(galery);

      res.json(galery);
   } catch (error: any) {
      res.status(500).json({ status: 500, message: 'Error al intentar obtener la galería', devTool: error.message });
      console.log(error);
   }
}

export const getImage = async (req: Request, res: Response) => {
   try {
      const { id } = req.params;

      const image = await Facility_Galery.findAll(
         {
            where: {
               id_facility: id
            },
            attributes: ['id', 'image']

            
            
         });

      res.json(image);

   } catch (error: any) {
      res.status(500).json({ status: 500, message: 'Error al intentar obtener la imagen', devTool: error.message });
      console.log(error);
   }
}

export const saveImage = async (req: Request, res: Response) => {
   try {

      try {
         const { id_facility, name, title } = req.body;
         const file = req.files as { [fieldname: string]: Express.Multer.File[] };

         const _image = file['image'] ? file['image'][0] : undefined;

         if (_image) {
            const serverUrl = `${req.protocol}://${req.get('host')}`;
            const image = `${serverUrl}/storage/${_image?.filename}`;

            const workshop = await Facility_Galery.create({
               id_facility,
               image,
            });

            if (workshop) {
               res.json({
                  status: 200,
                  message: 'Workshop creado'
               })
            }
         }

      } catch (error: any) {
         res.status(500).json({ status: 500, message: '', devTool: error.message });
         console.log(error);
      }
   } catch (error: any) {
      res.status(500).json({ status: 500, message: '', devTool: error.message });
      console.log(error);
   }
}

export const updateImage = async (req: Request, res: Response) => {
   try {
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

                  const currentFile = await Facility_Galery.findByPk(id, {
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

            await Facility_Galery.update(body, {
               where: { id: id },
            });

            res.json({
               status: 200,
               message: 'Seccion actualizada'
            });
         }

      } catch (error: any) {
         res.status(500).json({ status: 500, message: 'Error al imagend de la galería', devTool: error.message });
         console.log(error);
      }
   } catch (error: any) {
      res.status(500).json({ status: 500, message: '', devTool: error.message });
      console.log(error);
   }
}

export const removeImage = async (req: Request, res: Response) => {
   try {
      const { id } = req.params
      console.log(id)

      const response = await Facility_Galery.destroy({ where: { id } });

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