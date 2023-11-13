export default function CartRoute(cartDB) {
    return {
        addToCart: async (req, res) => {
            const shoeId = req.params.id;
            const userId = req.params.userId; // Assuming you have the userId in the request parameters

            try {
                const result = await cartDB.addToCart(shoeId, userId);
                res.json(result);
            } catch (error) {
                res.status(500).json({ error: error.message });
            }
        },
        getCart: async (req, res) => {
            const userId = req.params.userId;
            try {
                const results = await cartDB.getUsersCart(userId);
                res.json(results);
            } catch (error) {
                res.status(500).json({ error: error.message });
            }
        }
    };
}
