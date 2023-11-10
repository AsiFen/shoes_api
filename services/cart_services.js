export default function CartDB(db) {
    return {
        getFromCart: async () => {
            try {
                let result = await db.any(`SELECT * FROM shoes JOIN user_cart ON shoes.id = user_cart.shoe_id`);
                return result;
            } catch (error) {
                return error;
            }
        },

        addToCart: async (shoe_id) => {
            try {
                const existingCartItem = await db.oneOrNone('SELECT shoe_id FROM user_cart WHERE shoe_id = $1', [shoe_id]);

                if (existingCartItem) {
                    return "This shoe is already in the cart.";
                } else {
                    await db.none('INSERT INTO user_cart (shoe_id) VALUES ($1)', [shoe_id]);
                }
            } catch (error) {
                return error;
            }
        }

    }
}