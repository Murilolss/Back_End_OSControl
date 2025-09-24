import prisma from '../prisma.js';

export const ProductController ={
    async store(req, res, next ){
        try{
        const { name, category, description,  salesUnit, purchasePrice , salePrice, observations, isActive,userId  } = req.body;

        let user = await prisma.user.findFirst({
            where: {id: Number(userId)}
        });

        if(!user){
            res.status(301).json({
                'error': " O Usuario não encontrado"
            });
            return
        }                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       
    
        const product =  await prisma.product.create({
                data: { 
                    name, 
                    category, 
                    description, 
                    salesUnit, 
                    purchasePrice : Number(purchasePrice), 
                    salePrice : Number(salePrice), 
                    observations, 
                    isActive : Boolean(isActive),
                    userId : Number(userId)
                }
        });

        res.status(201).json(product);
        }catch(error){
            next(error);
        }
    },

    async index(req, res, next){

        try{

            let query = {}
    
            if (req.query.name){
                query.name = {contains: req.query.name}
            }
    
            if(req.query.category){
                query.category = req.query.category
            }
    
            if(req.query.purchasePriceMax && req.query.purchasePriceMin){
                query.purchasePriceMax = {gte: Number(req.query.purchasePriceMin), lte: Number(req.query.purchasePriceMax)}
            }
            else if (req.query.purchasePriceMin) {
                query.purchasePrice = {gte: Number(req.query.purchasePriceMin)}
            }
            else if (req.query.purchasePriceMax) {
                query.purchasePrice = {lte: Number(req.query.purchasePriceMax)}
            }


            if(req.query.salePriceMax && req.query.salePriceMin){
                query.salePriceMax = {gte: Number(req.query.salePriceMin), lte: Number(req.query.purchasePriceMax)}
            }
            else if (req.query.salePriceMin) {
                query.salePrice = {gte: Number(req.query.salePriceMin)}
            }
            else if (req.query.salePriceMax) {
                query.salePrice = {lte: Number(req.query.salePriceMax)}
            }

            if(req.query.isActive){
                query.isActive =  req.query.isActive === "true" || req.query.isActive === true
            }
    
            const product = await prisma.product.findMany({
                where: query
        });

        if(product.length == 0){
            res.status(404).json("Não encontrado")
        }
        else{
            res.status(200).json(product)
        }

        }
        catch(error){
            next(error)
        }
    },

    async show(req, res, next){
        try{
        const id = Number(req.params.id);
    
        let product = await prisma.product.findFirstOrThrow({where: {id}})
            
            res.status(200).json(product)
        }
        catch(err){
            res.status(404).json({error: "Não encontrado"})
        }
    
    },

    async del(req, res, _next){
        try {
            const id = Number(req.params.id);

            const product = await prisma.product.delete({
                where: { id }
            });

            res.status(200).json(product);
        } catch (err) {
            res.status(404).json({error: "Não encontrado"});
        }
    },

    async update(req, res, _next){
        try{

            let body = {}

            if (req.body.name) {
                body.name = req.body.name
            }

            if (req.body.category) {
                body.category = req.body.category
            }

            if (req.body.descripition) {
                body.descripition = req.body.descripition
            }

            if (req.body.salesUnit) {
                body.salesUnit = req.body.salesUnit
            }

            if (req.body.purchasePrice) {
                body.purchasePrice = req.body.purchasePrice
            }

            if (req.body.salePrice) {
                body.salePrice = req.body.salePrice
            }

            if (req.body.observations) {
                body.observations = req.body.observations
            }

            if (req.body.isActive) {
                body.isActive = Boolean(req.body.isActive)
            }

            const id = Number(req.params.id);

            const productUpdate = await prisma.product.update({ 
                where:  {id} ,
                data: body })

            res.status(200).json(productUpdate);
        } catch (err) {
            res.status(404).json({error: "Não encontrado"});
        }
    }

}