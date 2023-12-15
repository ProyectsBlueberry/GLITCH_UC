
import { Router } from "express";
import { validateToken } from "../middleware/token/validateToken";
import { storage } from "../helpers/storage";
import multer from "multer";
import { getFacilities, getFacility, removeFacility, saveFacility, updateFacility } from "../controllers/facilitiesController";
import { getGalery, getImage, removeImage, saveImage, updateImage } from "../controllers/facilityGaleryController";

const upload = multer({ storage: storage });

const router = Router();

router.get('/get-galery/:id', getGalery);
router.get('/get-image/:id', getImage);

router.post('/save-image', upload.fields([
    {name: 'image', maxCount: 1},
]) , saveImage);

router.patch('/update-image/:id', upload.fields([
    {name: 'image', maxCount: 1},
]), updateImage);

router.delete('/remove-image/:id', removeImage);

module.exports = router;