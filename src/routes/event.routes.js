import { Router } from "express";
import {authRequired} from '../middlewares/validateToken.js'
import {createEvent,getEvents,deleteEvents,updateEvents } from "../controllers/event.controller.js";

const router = Router();

router.get('/events', authRequired,getEvents);
router.post('/events', authRequired,createEvent);
router.delete('/events/:id', authRequired,deleteEvents);
router.put('/events/:id', authRequired,updateEvents);

export default router;