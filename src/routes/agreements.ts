
import { Router } from "express";
import { validateToken } from "../middleware/token/validateToken";
import { getAgreements, removeAgreement, saveAgreement, updateAgreement } from "../controllers/agreementsControllo";
import { storage } from "../helpers/storage";
import multer from "multer";

const upload = multer({ storage: storage });

const router = Router();

router.get('/all-agreements', getAgreements);

router.post('/save-agreement', upload.fields([
   { name: 'image', maxCount: 1 },
]),saveAgreement);

router.patch('/update-agreement/:id', upload.fields([
   { name: 'image', maxCount: 1 },
]), updateAgreement);

router.delete('/remove-agreement/:id', removeAgreement);

module.exports = router;