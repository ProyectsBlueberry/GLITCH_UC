import { Request, Response } from "express";
import * as fs from 'fs/promises';
import * as path from 'path';
import Facilities from "../../models/facilities";
import User from "../../models/user";

export const getFacilities = async (req: Request,  res:Response) => {
    try {
       const facilities = await Facilities.findAll({
        include: {
            model: User,
            attributes:[]
         },
         attributes: [
            ['id', 'ID'],
            // [Sequelize.literal('User.name'), 'Usuario'],
            ['name', 'Usuario'],
            ['card_background', 'Caratula'],
            ['title', 'Titulo Banner'],
            ['background', 'Banner'],
         ]
       })
 
       res.json(facilities);
    } catch (error: any) {
       res.status(500).json({ status: 500, message: 'Error  al intentar obtener las seccions', devTool: error.message });
       console.log(error);
    }
 }
 
 export const getFacility = async (req: Request,  res:Response) => {
    try {
        const {id} = req.params
        console.log(id);
        const facility = await Facilities.findByPk(id,{
        
        });
  
  
        res.json(facility);
    } catch (error: any) {
       res.status(500).json({ status: 500, message: '', devTool: error.message });
       console.log(error);
    }
 }
 
 export const saveFacility = async (req: Request,  res:Response) => {
    try {
       const { id_user, name, title, about_us} = req.body;

       const files = req.files as { [fieldname: string]: Express.Multer.File[] };

       const cardFile = files['card_background'] ? files['card_background'][0] : undefined;
       const bannerFile = files['background'] ? files['background'][0] : undefined;
       

       if( cardFile && bannerFile ){
        const serverUrl = `${req.protocol}://${req.get('host')}`;
        const card_background = `${serverUrl}/storage/${cardFile?.filename}`;
        const background = `${serverUrl}/storage/${bannerFile?.filename}`;

        const workshop = await Facilities.create({
           id_user,
           name,
           card_background,
           title,
           background,
           about_it: about_us
        });

        if( workshop ) {
           res.json({
              status: 200,
              message: 'Instalacion creada'
           })
        }
     }
    } catch (error: any) {
       res.status(500).json({ status: 500, message: 'Error al intentar crear la instalacion', devTool: error.message });
       console.log(error);
    }
 }
 
 export const updateFacility = async (req: Request,  res:Response) => {
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
              
                 const currentFile = await Facilities.findByPk(id, {
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
  
           await Facilities.update(body, {
              where: { id: id },
           });
  
           res.json({
              status: 200,
              message: 'Instlacion actualizada'
           });
        } else {
           res.json({
              status: 204,
              message: 'No se encontró información para actualizar',
           });
        }
 
    } catch (error: any) {
       res.status(500).json({ status: 500, message: 'Error al actualizar ', devTool: error.message });
       console.log(error);
    }
 }
 
 export const removeFacility = async (req: Request,  res:Response) => {
    try {
       const { id } = req.params
       console.log(id)
 
       const response = await Facilities.destroy({ where: { id } });
 
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