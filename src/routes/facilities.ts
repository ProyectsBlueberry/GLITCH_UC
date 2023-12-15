
import { Router } from "express";
import { validateToken } from "../middleware/token/validateToken";
import { storage } from "../helpers/storage";
import multer from "multer";
import { getFacilities, getFacility, removeFacility, saveFacility, updateFacility } from "../controllers/facilitiesController";

const upload = multer({ storage: storage });

const router = Router();

router.get('/all-facilities', getFacilities);
router.get('/get-facility/:id', getFacility);

router.post('/save-facility', upload.fields([
    {name: 'card_background', maxCount: 1},
    {name: 'background', maxCount: 1}
]) , saveFacility);

router.patch('/update-facility/:id', upload.fields([
    {name: 'card_background', maxCount: 1},
    {name: 'background', maxCount: 1}
]), updateFacility);

router.delete('/remove-facility/:id', removeFacility);

module.exports = router;