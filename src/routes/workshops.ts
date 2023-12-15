
import { Router } from "express";
import { validateToken } from "../middleware/token/validateToken";

import { storage } from "../helpers/storage";
import multer from "multer";
import { getWorkshop, getWorkshopbyTitle, getWorkshops, removeWorkshop, saveWorkshop, updateWorkshop } from "../controllers/workshoController";

const upload = multer({ storage: storage });

const router = Router();

router.get('/all-workshops', getWorkshops);
router.get('/get-workshop/:id', getWorkshop);
router.get('/workshopsbytitle/:title', getWorkshopbyTitle);

router.post('/save-workshop', upload.fields([
   {name: 'card_background', maxCount: 1},
   {name: 'background', maxCount: 1}
]) ,saveWorkshop);

router.patch('/update-workshop/:id', upload.fields([
   {name: 'card_background', maxCount: 1},
   {name: 'background', maxCount: 1}
]) ,updateWorkshop);

router.delete('/remove-workshop/:id', removeWorkshop);

module.exports = router;