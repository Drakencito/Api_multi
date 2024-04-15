import express from 'express';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import  cors  from "cors";
import authRoutes from './routes/auth.routes.js'
import applicationRoutes from './routes/application.routes.js'
import eventRoutes from './routes/event.routes.js'

const app = express();

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}))



app.use(morgan('dev'));
app.use(express.json());
app.use(cookieParser());

app.use("/api/v1",authRoutes,applicationRoutes,eventRoutes);

export default app;