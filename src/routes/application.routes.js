import { Router } from "express";
import {authRequired} from '../middlewares/validateToken.js'
import { getApplication,getApplications,createApplications,updateApplications,deleteApplications } from "../controllers/application.controller.js";
import { rateLimit } from "express-rate-limit";


const createApplicationMessage = "Usted ya ha sobrepasado el limite de solicitudes.";



const createApplicationLimiter = rateLimit({
    windowMs: 24 * 24 * 60 * 60 * 1000, //1 día
    max: 5, //2 peticiones por mes, se usa 24 para no sobrepasar el valor maximo d 32 bits
    message: createApplicationMessage,
});


const router = Router();

router.get('/applications', authRequired,getApplications);
router.get('/applications/:id', authRequired,getApplication);
router.post('/applications',createApplicationLimiter, authRequired,createApplications);
router.delete('/applications/:id', authRequired,deleteApplications);
router.put('/applications/:id', authRequired,updateApplications);

export default router;