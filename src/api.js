import 'dotenv/config';
import express from 'express';
import cors from 'cors';

import clientRoutes from './routers/client'
import orderRoutes from './routers/order'
import productRoutes from './routers/product'
import serviceRoutes from './routers/service'
import shopRoutes from './routers/shop'
import signatureRoutes from './routers/signature'
import userRoutes from './routers/user'

const app = express();
app.use(cors());
app.use(express.json());

app.use('/clients', clientRoutes)
app.use('/orders', orderRoutes)
app.use('/products', productRoutes)
app.use('/services', serviceRoutes)
app.use('/shops', shopRoutes)
app.use('/signatures', signatureRoutes)
app.use('/users', userRoutes)

app.use((err, _req, res, _next) => {
    console.error(err);
    if (err.code === 'P2002'){
        return res.status(409).json({
            error: 'Registro duplicado (unique)'
        });
    }
    if (err.code === 'P2025'){
        return res.status(404).json({
            error: 'Registro não encontrado'
        });
    }
    res.status(500).json({error: 'Erro interno'});
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`HTTP => http://localhost:${PORT}`));