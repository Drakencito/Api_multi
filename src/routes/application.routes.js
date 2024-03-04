import { Router } from "express";
import {authRequired} from '../middlewares/validateToken.js'
import { getApplication,getApplications,createApplications,updateApplications,deleteApplications } from "../controllers/application.controller.js";

const router = Router();

router.get('/applications', authRequired,getApplications);
router.get('/applications/:id', authRequired,getApplication);
router.post('/applications', authRequired,createApplications);
router.delete('/applications/:id', authRequired,deleteApplications);
router.put('/applications/:id', authRequired,updateApplications);

export default router;