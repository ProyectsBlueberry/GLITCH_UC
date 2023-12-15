import { Router } from "express";
import { AddGraduates, AddKnow_where, AddTestimonial, AddWork, Addadvantage, ContentOfferAcademic, CurriculumCreate, CurriculumUpdate, GetAdvantage, GetContentOfferAcademic, GetCurriculum, GetKnow_where, GetOurGraduates, GetSeo, GetTestimonials, GetWorks, GetgeneralInfo, SeoCreate, TestimonialUpdate, delete_academic, delete_advantage, delete_graduates, delete_testimonials, delete_works, generalInfo, getCategories, getLevelByIdActive, getLevels, getOfferById, getOfferByIdActive, getOffers, getOffertByCategorie, offertAcademic } from "../controllers/academicOfferController";
import { validateToken } from "../middleware/token/validateToken";
import { storage } from "../helpers/storage";
import multer from "multer";

const upload = multer({ storage: storage });

const router = Router();

router.get('/all-levels', getLevels);
router.get('/get-offers', getOffers);
router.get('/get-offer/:id', getOfferById);


//endPoints Landing
router.get('/get-level-offer/:id', getLevelByIdActive);
router.get('/get-offer-active/:id', getOfferByIdActive);
//
router.get('/categorie/:id', getCategories);
router.get('/academic-offer-by-category/:category', getOffertByCategorie)
router.get('/offer/general/:id', GetgeneralInfo)
router.get('/offer/content/:id', GetContentOfferAcademic)
router.get('/offer/SEO/:id', GetSeo)
router.get('/offer/advantage/:id', GetAdvantage)
router.get('/offer/curriculum/:id', GetCurriculum)
router.get('/offer/work/:id', GetWorks)
router.get('/offer/know_where/:id', GetKnow_where)
router.get('/offer/our_graduates/:id', GetOurGraduates)
router.get('/offer/testimonials/:id', GetTestimonials)

router.post('/offer-academic', offertAcademic);
router.post('/offer-academic/general/:id', 
upload.fields([
    { name: 'banner', maxCount: 1 },
    { name: 'pdf', maxCount: 1 },
]), generalInfo);
router.post('/offer-academic/content/:id', ContentOfferAcademic);
router.post('/offer-academic/SEO/:id', SeoCreate);
router.post('/offer-academic/know_where/:id', AddKnow_where);
router.post('/offer-academic/advantage/:id',upload.fields([
    { name: 'icon', maxCount: 1 },
]), Addadvantage);
router.post('/offer-academic/graduates/:id',upload.fields([
    { name: 'image', maxCount: 1 },
]), AddGraduates);
router.post('/offer-academic/work/:id',upload.fields([
    { name: 'icon', maxCount: 1 },
]), AddWork);
router.post('/offer-academic/testimonials/:id',upload.fields([
    { name: 'image', maxCount: 1 },
]), AddTestimonial);

router.post('/offer-academic/curriculum', CurriculumCreate);

router.patch('/offer-academic/curriculum_edit/:id', CurriculumUpdate);
router.put('/offer-academic/edit/testimonials/:id',upload.fields([
    { name: 'image', maxCount: 1 },
]), TestimonialUpdate);

router.delete('/delete_academic/:id', delete_academic);
router.delete('/delete_advantage/:id', delete_advantage);
router.delete('/delete_work/:id', delete_works);
router.delete('/delete_graduates/:id', delete_graduates);
router.delete('/delete_testimonials/:id', delete_testimonials);


module.exports = router;

