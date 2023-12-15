import { Router } from "express";
import { validateToken } from "../middleware/token/validateToken";
import multer from "multer";
import { storage } from "../helpers/storage";
import { addIndex, addIndexGalery, deleteIndexGalery, getIndex, getIndexGalery } from "../controllers/indexGaleryController";

const upload = multer({ storage: storage });

const router = Router();




router.get('/index-galery', getIndex);
router.get('/index-galery/get/:id', getIndexGalery);
router.put('/index-galery/update/:id',
upload.fields([
    { name: 'video_loop', maxCount: 1 },
    
]), addIndex);


router.post('/index-galery/add/:id',
upload.fields([
    { name: 'image', maxCount: 1 },
    
]), addIndex);
router.post('/index-galery/section/add/:id',
upload.fields([
    { name: 'image', maxCount: 1 },
    
]), addIndexGalery);

router.delete('/delete_galery/:id', deleteIndexGalery);
module.exports = router;
