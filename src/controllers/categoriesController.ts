import { Request, Response, response } from "express";
import Category from "../../models/categories";
import AcademicLevel from "../../models/academic_level";
import { Sequelize } from "sequelize";
import { CategoriesAttributes } from "../interfaces/CategoriesAttributes";

export const getAllCategories = async (req: Request, res: Response) => {

   try {
      const categories = await Category.findAll({
         include: [
            {
               model: AcademicLevel,
               attributes: [],
            },
         ],
         attributes: [
            ['id', 'ID'],
            ['title', 'Titulo'],
            [Sequelize.literal('AcademicLevel.level'), 'Tipo'],
            ['route', 'URL'],
         ],
         raw: true,
      });

      res.json(categories);

   } catch (error: any) {
      res.status(500).json({ status: 500, message: 'Error al intentar obtener las cagorias', devTool: error.message });
      console.log(error);
   }
}

export const saveCategory = async (req: Request, res: Response) => {
   try {
      const data: CategoriesAttributes = req.body
      await Category.create({
         title: data.title,
         route: data.route,
         id_level: data.id_level
      });

      res.json({
         status: 200,
         message: 'Categoría creada'
      });
     
   } catch (error: any) {
      res.status(500).json({ status: 500, message: 'Error al intentar agregar la cagoria', devTool: error.message });
      console.log(error)
   }
}

export const updateCategory = async (req: Request, res: Response) => {
   try {
      const {id} = req.params;
      const body = req.body

      const fieldsUpdate: Record<string, any> = {};
      const objectAttributes: Record<string, string> = { "Titulo": "title", "new_url": "route", };

      Object.entries(body).forEach(([key, value]) => {
         const mappedKey = objectAttributes[key];
         if (mappedKey) {
            fieldsUpdate[mappedKey] = value;
         }
      });

      const updated = await Category.update(fieldsUpdate, { where: {id} });

      if( updated[0] > 0 ) {
         res.json({
            status: 200,
            message: 'Categoría actualizada'
         });
      }

   } catch (error: any) {
      res.status(500).json({ status: 500, message: 'Error al intentar agregar la cagoria', devTool: error.message });
      console.log(error)
   }
}

export const removeCategory = async (req: Request, res: Response) => {
   try {
      const { id } = req.params

      const response = await Category.destroy({ where: { id } });

      if (response > 0) {

         res.json({
            status: 200,
            message: 'Categoría eliminada'
         });
      }

   } catch (error: any) {
      res.status(500).json({ status: 500, message: 'Error al intentar remover la cagoria', devTool: error.message });
      console.log(error)
   }
}