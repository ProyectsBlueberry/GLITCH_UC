
import { Request, Response } from 'express';
import AcademicLevel from '../../models/academic_level';
import Category from '../../models/categories';
import Academic_offert from '../../models/academic_offer';
import multer from 'multer';
import { storage } from '../helpers/storage';
import General from '../../models/general';
import Content from '../../models/content';
import Seo from '../../models/seo';
import Advantage from '../../models/advantage';
import Curriculum from '../../models/curriculum';
import Works from '../../models/works';
import Know_where from '../../models/know_where';
import Our_graduates from '../../models/our_graduates';
import Testimonial from '../../models/testimonial';

const fs = require('fs');
const path = require('path');
const routeStorage= '../../public/storage'
const upload = multer({ storage: storage });

export const getLevels = async (req: Request, res: Response) => {
   try {

      const levels = await AcademicLevel.findAll();

      res.json(levels);
   } catch (error) {
      console.error('Error al consultar niveles académicos:', error);
      res.status(500).json({ error: 'Error al consultar niveles académicos' });
   }
};

export const getOffers = async (req: Request, res: Response) => {
   try {

      const Offer = await Academic_offert.findAll({
         include: [
            {
               model: Category,
               include: [
                  {
                     model: AcademicLevel,

                  },
               ],
            },
         ],
         order: [['createdAt', 'DESC']],
      });

      res.json(Offer);
   } catch (error) {
      console.error('Error al consultar niveles académicos:', error);
      res.status(500).json({ error: 'Error al consultar niveles académicos' });
   }
};
export const getOfferById = async (req: Request, res: Response) => {
   try {
      const { id } = req.params;
      const Offer = await Academic_offert.findByPk(id, {
         include: [
            {
               model: Category,
               include: [
                  {
                     model: AcademicLevel,

                  },
               ],
            },
         ],
      });
      res.json(Offer);
   } catch (error) {
      console.error('Error al consultar niveles académicos:', error);
      res.status(500).json({ error: 'Error al consultar niveles académicos' });
   }
};

export const getOffertByCategorie = async (req: Request, res: Response) => {
   try {
      const { category } = req.params;

      const resultados = await AcademicLevel.findAll({
         where: { "id": parseInt(category) },
         include: [
            { model: Category }
         ]
      });

      res.json(resultados)

   } catch (error: any) {
      throw new Error(error);
   }
}

export const getCategories = async (req: Request, res: Response) => {
   try {
      const { id } = req.params;


      const categories = await Category.findAll({
         where: {
            id_level: id
         }
      });

      res.json(categories);
   } catch (error) {
      console.error('Error al consultar niveles académicos:', error);
      res.status(500).json({ error: 'Error al consultar niveles académicos' });
   }
};
export const offertAcademic = async (req: Request, res: Response) => {
   try {
      const { titulo, crm, category } = req.body

      const offerAcademic = await Academic_offert.create({
         title: titulo,
         crm: crm,
         id_category: category,
         status: false
      });

      res.json(offerAcademic);
   } catch (error) {
      console.error('Error al consultar niveles académicos:', error);
      res.status(500).json({ error: 'Error al consultar niveles académicos' });
   }
};
export const generalInfo = async (req: Request, res: Response) => {
   try {
      const { title, type, level, category, duration, modality, start, RVOE, crm, status } = req.body;
      const { id } = req.params;
console.log(status);
      const result = await General.findOne({
         where: {
            id_offer: id,
         },

      });
      const offer = await Academic_offert.findByPk(id, {
         include: [Category],
      });


      const files = req.files as { [fieldname: string]: Express.Multer.File[] };

      const bannerFile = files['banner'] ? files['banner'][0] : undefined;
      const pdfFile = files['pdf'] ? files['pdf'][0] : undefined;

      const serverUrl = `${req.protocol}://${req.get('host')}`;

      const updateDataOfer: any = {
         title: title,
         id_category: category,
         updatedAt: new Date(),
      };
      const updateDataCategory: any = {
         id_level: level,
         updatedAt: new Date(),
      };


      if (result) {
         const updateData: any = {
            type: type,
            start: start,
            mode: modality,
            duration: duration,
            RVOE: RVOE,
            updatedAt: new Date(),
         };




         if (bannerFile) {
            const textoModificado = result.banner.replace(`${serverUrl}/storage`, '');
            const rutaCompleta = path.join(__dirname, routeStorage, textoModificado);
   
            if (fs.existsSync(rutaCompleta)) {
               fs.unlinkSync(rutaCompleta);
               console.log(`La imagen ${rutaCompleta} ha sido eliminada correctamente.`);
             } else {
               console.log(`La imagen ${rutaCompleta} no existe en la ruta especificada.`);
             }
           
            updateData.banner = `${serverUrl}/storage/${bannerFile.filename}`;
            
         }

         if (pdfFile) {
            const textoModificado = result.pdf.replace(`${serverUrl}/storage`, '');
            const rutaCompleta = path.join(__dirname, routeStorage, textoModificado);
   
            if (fs.existsSync(rutaCompleta)) {
               fs.unlinkSync(rutaCompleta);
               console.log(`La imagen ${rutaCompleta} ha sido eliminada correctamente.`);
             } else {
               console.log(`La imagen ${rutaCompleta} no existe en la ruta especificada.`);
             }
            updateData.pdf = `${serverUrl}/storage/${pdfFile.filename}`;
            
         }

         await General.update(updateData, {
            where: {
               id_offer: id,
            },
         });
         if (offer) {
            offer.title = title;
            offer.crm = crm
            offer.id_category = category;
            offer.status = status  ;
            await offer.save();
         }



      } else {
         const createData: any = {
            id_offer: parseInt(id),
            type: type,
            start: start,
            mode: modality,
            RVOE: RVOE,
            duration: duration,
            createdAt: new Date(),
            updatedAt: new Date(),
         };

         if (bannerFile) {
            createData.banner = `${serverUrl}/storage/${bannerFile.filename}`;
         }

         if (pdfFile) {
            createData.pdf = `${serverUrl}/storage/${pdfFile.filename}`;
         }

         await General.create(createData);
      }

      res.json({ message: 'Operación completada con éxito.' });
   } catch (error) {
      console.error('Error al consultar:', error);
      res.status(500).json({ error: 'Error' });
   }
};
export const GetgeneralInfo = async (req: Request, res: Response) => {
   try {
      const levelId = req.params.id;
      const result = await General.findOne({
         where: {
            id_offer: levelId,
         },
         include: [{
            model: Academic_offert,
            include: [
               {
                  model: Category,
                  include: [
                     {
                        model: AcademicLevel,

                     },
                  ],
               },
            ],
         }]
      });



      res.json(result);

   } catch (error) {
      console.error('Error al eliminar el nivel académico', error);
      res.status(500).json({ success: false, message: 'Error interno del servidor' });
   }
};
export const ContentOfferAcademic = async (req: Request, res: Response) => {
   const { id } = req.params;

   console.log(req.body)
   const result = await Content.findOne({
      where: {
         id_offer: id,
      },

   });

   if (result) {

      const ContentData = await Content.update(req.body, {
         where: {
            id_offer: id,
         },
      });
      res.json(ContentData);
   } else {
      const ContentData = await Content.create(req.body);
      res.json(ContentData);
   }

}
export const GetContentOfferAcademic = async (req: Request, res: Response) => {
   const { id } = req.params;

   const result = await Content.findOne({
      where: {
         id_offer: id,
      },
   });
   res.json(result);
}
export const GetSeo = async (req: Request, res: Response) => {
   const { id } = req.params;

   const result = await Seo.findOne({
      where: {
         id_offer: id,
      },
   });
   res.json(result);
}
export const SeoCreate = async (req: Request, res: Response) => {
   const { id } = req.params;

   const result = await Seo.findOne({
      where: {
         id_offer: id,
      },

   });


   if (result) {

      const SeoData = await Seo.update(req.body, {
         where: {
            id_offer: id,
         },
      });
      res.json(SeoData);
   } else {
      const data = {
         id_offer: id,
         ...req.body,
      }

      const SeoData = await Seo.create(data);


      res.json(SeoData);
   }

}
export const Addadvantage = async (req: Request, res: Response) => {
   const { id } = req.params;
   const { advantage } = req.body
   const files = req.files as { [fieldname: string]: Express.Multer.File[] };

   const IconFile = files['icon'] ? files['icon'][0] : undefined;
   const serverUrl = `${req.protocol}://${req.get('host')}`;


   const data = {
      id_offer: parseInt(id),
      advantage: advantage,
      icon: `${serverUrl}/storage/${IconFile!.filename}`,
      createdAt: new Date(),
      updatedAt: new Date()
   }
   const advantagesData = await Advantage.create(data);

   const advantages = await Advantage.findAll({
      where: {
         id_offer: id,
      },
   })

   res.json(advantages);

}
export const GetAdvantage = async (req: Request, res: Response) => {
   const { id } = req.params;

   const result = await Advantage.findAll({
      where: {
         id_offer: id,
      },
   });
   res.json(result);
}
export const CurriculumCreate = async (req: Request, res: Response) => {




   const CurriculumData = await Curriculum.create(req.body);


   res.json(CurriculumData);

}
export const CurriculumUpdate = async (req: Request, res: Response) => {
   try {
      const { id } = req.params;

      const { section, title, content } = req.body;


      if (!id) {
         return res.status(400).json({ error: 'ID no proporcionado' });
      }
      const updateCurriculum = {
         title: title,
         section: section,
         content: content,
         updatedAt: new Date(),
      };

      const updatedRowsCount = await Curriculum.update(updateCurriculum, {
         where: { id: id },
      });



      res.json(updatedRowsCount);
   } catch (error) {
      console.error('Error al actualizar el curriculum:', error);
      res.status(500).json({ error: 'Error interno del servidor' });
   }

}
export const TestimonialUpdate = async (req: Request, res: Response) => {
   try {
      const { id } = req.params;

      const { name, collage_career, content, image } = req.body;
      const files = req.files as { [fieldname: string]: Express.Multer.File[] };


      const IconFile = files['image'] ? files['image'][0] : undefined;
      const serverUrl = `${req.protocol}://${req.get('host')}`;

      if (!id) {
         return res.status(400).json({ error: 'ID no proporcionado' });
      }
      const updateCurriculum = {
         name: name,
         collage_career: collage_career,
         image: IconFile ? `${serverUrl}/storage/${IconFile!.filename}` : image,
         content: content,
         updatedAt: new Date(),
      };

      const updatedRowsCount = await Testimonial.update(updateCurriculum, {
         where: { id: id },
      });



      res.json(updatedRowsCount);
   } catch (error) {
      console.error('Error al actualizar el curriculum:', error);
      res.status(500).json({ error: 'Error interno del servidor' });
   }

}
export const GetCurriculum = async (req: Request, res: Response) => {
   const { id } = req.params;

   const result = await Curriculum.findAll({
      where: {
         id_offer: id,
      },
   });
   res.json(result);
}
export const AddWork = async (req: Request, res: Response) => {
   const { id } = req.params;
   const { content } = req.body

   const files = req.files as { [fieldname: string]: Express.Multer.File[] };

   const IconFile = files['icon'] ? files['icon'][0] : undefined;
   const serverUrl = `${req.protocol}://${req.get('host')}`;


   const data = {
      id_offer: parseInt(id),
      content: content,
      icon: `${serverUrl}/storage/${IconFile!.filename}`,
      createdAt: new Date(),
      updatedAt: new Date()
   }
   const advantagesData = await Works.create(data);

   const advantages = await Works.findAll({
      where: {
         id_offer: id,
      },
   })

   res.json(advantages);

}
export const GetWorks = async (req: Request, res: Response) => {
   const { id } = req.params;

   const result = await Works.findAll({
      where: {
         id_offer: id,
      },
   });
   res.json(result);
}
export const AddKnow_where = async (req: Request, res: Response) => {
   const { id } = req.params;
   const { content } = req.body

   const result = await Know_where.findOne({
      where: {
         id_offer: id,
      },

   });


   if (!result) {
      const data = {
         id_offer: parseInt(id),
         content: content,
         createdAt: new Date(),
         updatedAt: new Date()
      }

      const Know_whereData = await Know_where.create(data);
   } else {
      const data = {
         id_offer: parseInt(id),
         content: content,
         updatedAt: new Date()
      }

      const Know_whereData = await Know_where.update(data, {
         where: {
            id_offer: id,
         },
      });

   }

   const Know_wheres = await Know_where.findOne({
      where: {
         id_offer: id,
      },
   })

   res.json(Know_wheres);

}
export const GetKnow_where = async (req: Request, res: Response) => {
   const { id } = req.params;

   const result = await Know_where.findOne({
      where: {
         id_offer: id,
      },
   });

   res.json(result);
}
export const GetOurGraduates = async (req: Request, res: Response) => {
   const { id } = req.params;

   const result = await Our_graduates.findAll({
      where: {
         id_offer: id,
      },
   });

   res.json(result);
}
export const AddGraduates = async (req: Request, res: Response) => {
   const { id } = req.params;
   const { alt_image, video } = req.body

   const files = req.files as { [fieldname: string]: Express.Multer.File[] };

   const IconFile = files['image'] ? files['image'][0] : undefined;
   const serverUrl = `${req.protocol}://${req.get('host')}`;


   const data = {
      id_offer: parseInt(id),
      alt_image: alt_image,
      video: video,
      image: `${serverUrl}/storage/${IconFile!.filename}`,
      createdAt: new Date(),
      updatedAt: new Date()
   }
   const advantagesData = await Our_graduates.create(data);

   const advantages = await Our_graduates.findAll({
      where: {
         id_offer: id,
      },
   })

   res.json(advantages);

}
export const GetTestimonials = async (req: Request, res: Response) => {
   const { id } = req.params;

   const result = await Testimonial.findAll({
      where: {
         id_offer: id,
      },
   });

   res.json(result);
}
export const AddTestimonial = async (req: Request, res: Response) => {
   const { id } = req.params;
   const { name, collage_career, content } = req.body

   const files = req.files as { [fieldname: string]: Express.Multer.File[] };

   const IconFile = files['image'] ? files['image'][0] : undefined;
   const serverUrl = `${req.protocol}://${req.get('host')}`;


   const data = {
      id_offer: parseInt(id),
      name: name,
      collage_career: collage_career,
      image: `${serverUrl}/storage/${IconFile!.filename}`,
      content: content,
      createdAt: new Date(),
      updatedAt: new Date()
   }

   const advantagesData = await Testimonial.create(data);

   const advantages = await Testimonial.findAll({
      where: {
         id_offer: id,
      },
   })

   res.json(advantages);

}
export const delete_academic = async (req: Request, res: Response) => {
   try {
      const levelId = req.params.id;


      const result = await Academic_offert.destroy({
         where: {
            id: levelId,
         },
      });

      if (result === 1) {
         res.json({ success: true, message: `Oferta académica con ID ${levelId} eliminado correctamente` });
      } else {
         res.json({ success: false, message: `No se encontró un oferta académica con ID ${levelId}` });
      }
   } catch (error) {
      console.error('Error al eliminar el nivel académico', error);
      res.status(500).json({ success: false, message: 'Error interno del servidor' });
   }
};
export const delete_advantage = async (req: Request, res: Response) => {
   try {
      const id = req.params.id;

      const serverUrl = `${req.protocol}://${req.get('host')}`;
      const advantange = await Advantage.findOne({
         where: {
           id: id,
         },
       });
       const textoModificado = advantange?.icon.replace(`${serverUrl}/storage`, '');
       const rutaCompleta = path.join(__dirname, routeStorage, textoModificado);

       if (fs.existsSync(rutaCompleta)) {
          fs.unlinkSync(rutaCompleta);
          console.log(`La imagen ${rutaCompleta} ha sido eliminada correctamente.`);
        } else {
          console.log(`La imagen ${rutaCompleta} no existe en la ruta especificada.`);
        }


      const result = await Advantage.destroy({
         where: {
            id: id,
         },
      });

      if (result === 1) {
         res.json({ status: 200, message: `Ventaja con ID ${id} eliminado correctamente` });
      } else {
         res.json({ status: 500, message: `No se encontró una ventaja con ID ${id}` });
      }
   } catch (error) {
      console.error('Error al eliminar el nivel académico', error);
      res.status(500).json({ status: 500, message: 'Error interno del servidor' });
   }
};
export const delete_works = async (req: Request, res: Response) => {
   try {
      const id = req.params.id;
      const serverUrl = `${req.protocol}://${req.get('host')}`;
      const work = await Works.findOne({
         where: {
           id: id,
         },
       });
       const textoModificado = work?.icon.replace(`${serverUrl}/storage`, '');
       const rutaCompleta = path.join(__dirname, routeStorage, textoModificado);

       if (fs.existsSync(rutaCompleta)) {
          fs.unlinkSync(rutaCompleta);
          console.log(`La imagen ${rutaCompleta} ha sido eliminada correctamente.`);
        } else {
          console.log(`La imagen ${rutaCompleta} no existe en la ruta especificada.`);
        }


      const result = await Works.destroy({
         where: {
            id: id,
         },
      });

      if (result === 1) {
         res.json({ status: 200, message: `Ventaja con ID ${id} eliminado correctamente` });
      } else {
         res.json({ status: 500, message: `No se encontró una ventaja con ID ${id}` });
      }
   } catch (error) {
      console.error('Error al eliminar el nivel académico', error);
      res.status(500).json({ status: 500, message: 'Error interno del servidor' });
   }
};
export const delete_graduates = async (req: Request, res: Response) => {
   try {
      const id = req.params.id;
      const serverUrl = `${req.protocol}://${req.get('host')}`;
      const work = await Our_graduates.findOne({
         where: {
           id: id,
         },
       });
       const textoModificado = work?.image.replace(`${serverUrl}/storage`, '');
       const rutaCompleta = path.join(__dirname, routeStorage, textoModificado);

       if (fs.existsSync(rutaCompleta)) {
          fs.unlinkSync(rutaCompleta);
          console.log(`La imagen ${rutaCompleta} ha sido eliminada correctamente.`);
        } else {
          console.log(`La imagen ${rutaCompleta} no existe en la ruta especificada.`);
        }

      
      const result = await Our_graduates.destroy({
         where: {
            id: id,
         },
      });

      if (result === 1) {
         res.json({ status: 200, message: `Ventaja con ID ${id} eliminado correctamente` });
      } else {
         res.json({ status: 500, message: `No se encontró una ventaja con ID ${id}` });
      }
   } catch (error) {
      console.error('Error al eliminar el nivel académico', error);
      res.status(500).json({ status: 500, message: 'Error interno del servidor' });
   }
};
export const delete_testimonials = async (req: Request, res: Response) => {
   try {
      const id = req.params.id;
      const serverUrl = `${req.protocol}://${req.get('host')}`;
      const testimonials = await Testimonial.findOne({
         where: {
           id: id,
         },
       });
       const textoModificado = testimonials?.image.replace(`${serverUrl}/storage`, '');
       const rutaCompleta = path.join(__dirname, routeStorage, textoModificado);

       if (fs.existsSync(rutaCompleta)) {
          fs.unlinkSync(rutaCompleta);
          console.log(`La imagen ${rutaCompleta} ha sido eliminada correctamente.`);
        } else {
          console.log(`La imagen ${rutaCompleta} no existe en la ruta especificada.`);
        }

      const result = await Testimonial.destroy({
         where: {
            id: id,
         },
      });

      if (result === 1) {
         res.json({ status: 200, message: `Testimonio con ID ${id} eliminado correctamente` });
      } else {
         res.json({ status: 500, message: `No se encontró una ventaja con ID ${id}` });
      }
   } catch (error) {
      console.error('Error al eliminar el testimonio', error);
      res.status(500).json({ status: 500, message: 'Error interno del servidor' });
   }
};



// get endPoint
export const getLevelByIdActive = async (req: Request, res: Response) => {
   try {
      const { id } = req.params;
      const Offer = await AcademicLevel.findOne({
         where: {
            id: id,
         },
         include: [
            {
               model: Category,
               include: [
                  {
                     model: Academic_offert,
                     where: {
                        status: 1, 
                     },
                  },
               ],
            },
         ],
      });
      res.json(Offer);
   } catch (error) {
      console.error('Error al consultar niveles académicos:', error);
      res.status(500).json({ error: 'Error al consultar niveles académicos' });
   }
};
export const getOfferByIdActive = async (req: Request, res: Response) => {
   try {
      const { id } = req.params;
      const Offer = await Academic_offert.findOne({
         where: {
            id: id,
            status : 1
         },
         include: [
            {
               model: Category,
               include: [
                  {
                     model: AcademicLevel,
                  },
               ],
            },
         ],
      });
      res.json(Offer);
   } catch (error) {
      console.error('Error al consultar niveles académicos:', error);
      res.status(500).json({ error: 'Error al consultar niveles académicos' });
   }
};


