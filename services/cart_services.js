export default function CartDB(db) {
    return {
        getUsersCart: async (userId) => {
            try {
                // Get the active cart ID for the user
                const cartIdResult = await db.oneOrNone(`
                    SELECT id FROM cart WHERE user_id = $1 AND paidoff = false
                `, [userId]);

                // If an active cart exists, retrieve the items in the cart
                if (cartIdResult) {
                    const cartId = cartIdResult.id;
                    const userCartItems = await db.any(`
                        SELECT shoes.*, user_cart.id as user_cart_id
                        FROM shoes
                        JOIN user_cart ON shoes.id = user_cart.shoe_id
                        WHERE user_cart.cart_id = $1
                    `, [cartId]);

                    return  userCartItems;
                } else {
                    // If no active cart exists
                    return { userCartItems: [], message: 'No items in cart.' }
                }
            } catch (error) {
                return error;
            }
        },

        addToCart: async (shoe_id, userId) => {
            try {
                // Check if there is an active cart for the user
                const cartIdResult = await db.oneOrNone(`
                    SELECT id FROM cart WHERE user_id = $1 AND paidoff = false
                `, [userId]);

                // If no active cart exists, create a new one
                let cartId;
                if (!cartIdResult) {
                    const newCartResult = await db.one(`
                        INSERT INTO cart (user_id) VALUES ($1) RETURNING id
                    `, [userId]);
                    cartId = newCartResult.id;
                } else {
                    cartId = cartIdResult.id;
                }

                // Check if the shoe is already in the cart
                const existingCartItem = await db.oneOrNone(`
                    SELECT shoe_id FROM user_cart WHERE shoe_id = $1 AND cart_id = $2
                `, [shoe_id, cartId]);

                if (existingCartItem) {
                    return "This shoe is already in the cart.";
                } else {
                    // Add the shoe to the user's cart
                    await db.none('INSERT INTO user_cart (shoe_id, cart_id) VALUES ($1, $2)', [shoe_id, cartId]);
                    return "Shoe added to the cart successfully.";
                }
            } catch (error) {
                return error;
            }
        }
    };
}
