import express, { Request, Response } from 'express';
import cors from 'cors';
import productRoutes from '../src/app/modules/Products/product.routes';
import orderRoutes from '../src/app/modules/Orders/order.routes';

const app = express();

// Middlewares
app.use(express.json());
app.use(cors());

// Routes
app.use('/api', productRoutes);
app.use('/api', orderRoutes);

app.get('/',(req:Request,res:Response)=>{
    res.send('Welcome to my book shop api')
})

export default app;
