export default function CartRoute(shoesDB) {

    return {
        getCart: async (req, res) => {
            const shoeId = req.params.id;
            let results = await shoesDB.getFromCart()
            res.json(results)
        },

        addCart: async (req, res) => {
            const shoeId = req.params.id;
            let results = await shoesDB.addToCart(shoeId)
            console.log(results, 'x');
            res.json(results)
        }

    }
}