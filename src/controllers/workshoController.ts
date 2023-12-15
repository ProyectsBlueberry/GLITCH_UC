import { Request, Response, request } from "express";
import Workshop from "../../models/workshop";
import User from "../../models/user";
import { Sequelize } from "sequelize";
import Section from "../../models/sections";



const fs = require('fs');
const path = require('path');

const routeStorage = '../../public/storage'


export const getWorkshops = async (req: Request, res: Response) => {
   try {
      const workshops = await Workshop.findAll({
         include: {
            model: User,
            attributes: []
         },
         attributes: [
            ['id', 'ID'],
            // [Sequelize.literal('User.name'), 'Usuario'],
            ['name', 'Nombre'],
            ['card_background', 'Caratula'],
            ['title', 'Titulo'],
            ['background', 'Banner'],
         ]
      });



      res.json(workshops)
   } catch (error: any) {
      res.status(500).json({ status: 500, message: 'Error al obtener los talleres', devTool: error.message });
      console.log(error);
   }
}
export const getWorkshopbyTitle = async (req: Request, res: Response) => {
   try {
      const { title } = req.params

      console.log(title);
      let name;
      switch (title) {
         case 'arte':
            name = 'Arte y cultura';
            break;
            case 'deportes':
            name = 'Deportes';
            break;
            
            case 'vinculacion':
            name = 'Vinculación';
            break;
         default:
            break;
      }
      const workshop = await Workshop.findOne(
         {
            where: { name: name },
            include: [
               {
                  model: Section,
               },
            ],
         }
      );


      res.json(workshop);
   } catch (error: any) {
      res.status(500).json({ status: 500, message: 'Error al obtener los talleres', devTool: error.message });
      console.log(error);
   }
}
export const getWorkshop = async (req: Request, res: Response) => {
   try {
      const { id } = req.params
      const workshop = await Workshop.findByPk(id, {
         attributes: ['id', 'name', 'card_background', 'title', 'background']
      });


      res.json(workshop);
   } catch (error: any) {
      res.status(500).json({ status: 500, message: 'Error al obtener los talleres', devTool: error.message });
      console.log(error);
   }
}

export const saveWorkshop = async (req: Request, res: Response) => {
   try {
      const { id_user, name, title } = req.body;
      const files = req.files as { [fieldname: string]: Express.Multer.File[] };

      const cardFile = files['card_background'] ? files['card_background'][0] : undefined;
      const bannerFile = files['background'] ? files['background'][0] : undefined;

      if (cardFile && bannerFile) {
         const serverUrl = `${req.protocol}://${req.get('host')}`;
         const card_background = `${serverUrl}/storage/${cardFile?.filename}`;
         const background = `${serverUrl}/storage/${bannerFile?.filename}`;

         const workshop = await Workshop.create({
            id_user,
            name,
            card_background,
            title,
            background
         });

         if (workshop) {
            res.json({
               status: 200,
               message: 'Workshop creado'
            })
         }
      }

   } catch (error: any) {
      res.status(500).json({ status: 500, message: 'Error al intentar crear el taller', devTool: error.message });
      console.log(error);
   }
}

export const updateWorkshop = async (req: Request, res: Response) => {
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
            const fileFields = ['card_background', 'background'];
            const serverUrl = `${req.protocol}://${req.get('host')}`;

            const fileUrls: { [fieldname: string]: string | undefined } = {};

            for (const field of fileFields) {
               const file = files[field] ? files[field][0] : undefined;

               const currentFile = await Workshop.findByPk(id, {
                  attributes: [field],
               });

               const existingFileName: string | undefined = currentFile?.get(field) as string | undefined;
               console.log(existingFileName);
               if (existingFileName) {

                  const fileNameFromUrl: string | undefined = existingFileName?.replace(`${serverUrl}/storage`, '');
                  if (fileNameFromUrl) {
                     const existingFilePath = path.join(__dirname, routeStorage, fileNameFromUrl);

                     try {
                        await fs.unlink(existingFilePath);
                        console.log(`Archivo existente eliminado: ${existingFilePath}`);
                     } catch (unlinkError) {
                        console.error('Error al eliminar el archivo existente:', existingFilePath);
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

         await Workshop.update(body, {
            where: { id: id },
         });

         res.json({
            status: 200,
            message: 'Taller actualizado'
         });
      } else {
         res.json({
            status: 204,
            message: 'No se encontró información para actualizar',
         });
      }
   } catch (error: any) {
      res.status(500).json({ status: 500, message: 'Error al intentar actualizar el taller', devTool: error.message });
      console.log(error);
   }
};


export const removeWorkshop = async (req: Request, res: Response) => {
   try {
      const { id } = req.params;
      const serverUrl = `${req.protocol}://${req.get('host')}`;
      const WorkshopData = await Workshop.findOne({
         where: {
            id: id,
         },
      });
      const textoModificado = WorkshopData?.card_background.replace(`${serverUrl}/storage`, '');
      const textoModificado2 = WorkshopData?.background.replace(`${serverUrl}/storage`, '');
      const rutaCompleta = path.join(__dirname, routeStorage, textoModificado!);
      const rutaCompleta2 = path.join(__dirname, routeStorage, textoModificado2!);

      if (fs.existsSync(rutaCompleta)) {
         fs.unlinkSync(rutaCompleta);
         fs.unlinkSync(rutaCompleta2);
         console.log(`La imagen ${rutaCompleta} y ${rutaCompleta2} ha sido eliminada correctamente.`);
      } else {
         console.log(`La imagen ${rutaCompleta} y ${rutaCompleta2} no existe en la ruta especificada.`);
      }
      const response = await Workshop.destroy({ where: { id } });

      if (response > 0) {
         res.json({
            status: 200,
            message: 'Covenio eliminado'
         });
      }
   } catch (error: any) {
      res.status(500).json({ status: 500, message: 'Error al intentar elminar el taller', devTool: error.message });
      console.log(error);
   }
}