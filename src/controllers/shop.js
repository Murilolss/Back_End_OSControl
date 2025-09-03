import prisma from '../prisma'
export const ShopController = {
// create, pode ter varios nomes( no banco de dados é insert), post, set, "guarda objeto" store;

// asincrona nome_da_fubção( req(recebendo, eponder e proximo))

async store(req, res, next){
    try{ 

        const{ orderId, productId, amount, salePrice} = req.body;

        const shop = await prisma.shop.create({
            data:{ 
                orderId, 
                productId, 
                amount, 
                salePrice
            }
        });

        res.status(201).json(shop);
        } catch(error) {
            next(error);
        }
    }
}
