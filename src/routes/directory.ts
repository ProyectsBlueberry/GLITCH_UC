import { Router } from "express";
import { validateToken } from "../middleware/token/validateToken";
import { getContacts, getContactsActive, removeContact, saveContact, updateContact } from "../controllers/directoryController";


const router = Router();

router.get('/all-contacts', getContacts);
router.get('/all-contacts-active', getContactsActive);
router.post('/save-contact', saveContact);
router.patch('/update-contact/:id', updateContact);
router.delete('/remove-contact/:id', removeContact);

module.exports = router;