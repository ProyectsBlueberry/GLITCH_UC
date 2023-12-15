import { Request, Response } from 'express';
import Index from '../../models';
import { indexGaleryProps } from '../interfaces/IndexGalery';
import Indices_Galery from '../../models/index_galery';


const fs = require('fs');
const path = require('path');
const routeStorage = '../../public/storage';


export const getIndex = async (req: Request, res: Response) => {



    const IndexGalery = await Index.findOne({});

    res.json(IndexGalery);
}
export const getIndexGalery = async (req: Request, res: Response) => {



    const IndexGalery = await Indices_Galery.findAll({});

    res.json(IndexGalery);
}


export const addIndex = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { video_loop, title_regular, title_bold, about_us, scholarships } = req.body;


        const files = req.files as { [fieldname: string]: Express.Multer.File[] };

        const video_loopData = files['video_loop'] ? files['video_loop'][0] : undefined;

        const serverUrl = `${req.protocol}://${req.get('host')}`;


        if (video_loopData) {
            const serverUrl = `${req.protocol}://${req.get('host')}`;
            const indexData = await Index.findOne({
                where: {
                    id: id,
                },
            });
            const textoModificado = indexData?.video_loop.replace(`${serverUrl}/storage`, '');
            const rutaCompleta = path.join(__dirname, routeStorage, textoModificado);

            if (fs.existsSync(rutaCompleta)) {
                fs.unlinkSync(rutaCompleta);
                console.log(`La imagen ${rutaCompleta} ha sido eliminada correctamente.`);
            } else {
                console.log(`La imagen ${rutaCompleta} no existe en la ruta especificada.`);
            }
        }
        const body = {
            video_loop: video_loopData ? `${serverUrl}/storage/${video_loopData.filename}` : video_loop,
            title_regular: title_regular,
            title_bold: title_bold,
            about_us: about_us,
            scholarships: scholarships,
        };

        const IndexGalery = await Index.update(body, {
            where: {
                id: id,
            },
        });

        res.json({ status: 200 });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};


export const addIndexGalery = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { alt_image, key_video } = req.body;

        const files = req.files as { [fieldname: string]: Express.Multer.File[] };
        const imageData = files['image'] ? files['image'][0] : undefined;

        if (!imageData) {
            // Respondemos con un estado 400 (Bad Request) indicando que faltan datos de imagen
            return res.status(400).json({ error: 'Missing image data' });
        }

        const serverUrl = `${req.protocol}://${req.get('host')}`;

        const body: indexGaleryProps = {
            image: `${serverUrl}/storage/${imageData!.filename}`,
            id_index: parseInt(id),
            alt_image: alt_image,
            key_video: key_video,
        };

        const IndexGalery = await Indices_Galery.create(body);

        res.json({ status: 200 });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};
export const deleteIndexGalery = async (req: Request, res: Response) => {
    try {


        const id = req.params.id;


        const serverUrl = `${req.protocol}://${req.get('host')}`;
        const indexData = await Indices_Galery.findOne({
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

        const result = await Indices_Galery.destroy({
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
        console.error('Error al eliminar el nivel académico', error);
        res.status(500).json({ status: 500, message: 'Error interno del servidor' });
    }
};
