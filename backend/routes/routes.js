import express from "express";
import { Login, updateRequest, getRequests, submitSelfAppraisel, submitAparForm , submitEvalutaionForm,sendMail} from '../controllers/Controllers.js';

const router = express.Router();


router.post('/Login', Login)
router.post('/updateRequest', updateRequest);
router.post('/submitSelfAppraisel', submitSelfAppraisel);
router.post('/submitEvalutaionForm', submitEvalutaionForm);
router.get('/getRequests', getRequests);
router.post('/submitAparForm', submitAparForm);
router.post('/send-email', sendMail);

export default router;