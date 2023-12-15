import { Router } from "express";
import { validateToken } from "../middleware/token/validateToken";

import { getAllCategories, removeCategory, saveCategory, updateCategory } from "../controllers/categoriesController";


const router = Router();

router.get('/all-categories', getAllCategories);
router.post('/save-category', saveCategory);
router.patch('/update-category/:id', updateCategory);
router.delete('/remove-category/:id', removeCategory);

module.exports = router;