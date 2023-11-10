export default function CartRoute(shoesDB) {

    return {
        addCart: async (req, res) => {
            const shoeId = req.params.id;
            let results = await shoesDB.addToCart(shoeId)
            console.log(results, 'x');
            res.json(results)
        },
        getCart: async (req, res) => {
            const shoeId = req.params.id;
            let results = await shoesDB.getFromCart()
            console.log(results);
            res.json(results)
        }
    }
}