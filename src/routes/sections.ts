
import { Router } from "express";
import { validateToken } from "../middleware/token/validateToken";
import { storage } from "../helpers/storage";
import multer from "multer";
import { getSection, getSections, removeSections, saveSections, updateSections } from "../controllers/sectinosController";

const upload = multer({ storage: storage });

const router = Router();

router.get('/all-sections', getSections);
router.get('/get-section/:id', getSection);

router.post('/save-section', upload.fields([
   {name: 'image', maxCount: 1},
]) , saveSections);

router.patch('/update-section/:id', upload.fields([
   {name: 'image', maxCount: 1},
]), updateSections);

router.delete('/remove-section/:id', removeSections);

module.exports = router;