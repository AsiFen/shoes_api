
export default function UsersDB(db) {

    return {
        signup: async (username, password) => {
            try {
                //check if user is existing
                let existingUser = await db.any('select * from users where username = $1', [username])

                if (!existingUser) {
                    throw new Error('User already exists');
                } else {
                    //have password encryption here
                    await db.any('insert into users (username, password) values ($1, $2)', [username, password])
                    let newUserId = await db.any('select id from users where username =$1', [username])
                    //create cart for new user
                    let userCartId = await db.any('insert into cart (user_id) values ($1) RETURNING id', [newUserId[0].id])
                    //return message for new user
                    return { message: 'User created successfully', userId: newUserId[0].id, cartid: userCartId[0].id };
                }
            } catch (error) {
                return { error: error.message };
            }
        },

        //handle password encryption 

        login: async (username, password) => {
            try {
                // Verify values are correct from the db.
                let results = await db.any('select * from users where username = $1', [username])
               // console.log(results);

                if (results) {
                    //verify password
                    if (results[0].password === password) {
                        // if correct, retrive cart
                        console.log(results[0].username);
                        let getCart = await db.one('select * from cart where user_id = $1', [results[0].id])
                        return { message: 'Welcome back!', user_cart: getCart };
                    }
                    else {
                        return { message: 'Password incorrect.' }
                    }
                }
                else {
                    return { message: 'Username not found.' };

                }
            } catch (error) {
                return { error: error.message };
            }
        }

        /*
    login:
    get userid from db using username, check the results,
    if not results it means username does not exist, if theres results, 
    verify db password with entered password, if its correct log user successfully.
    
    signUp: check if user already created account,
    if not, insert new user into db. Once new user is created, 
    get user id and create a cart for user 
        */
    }
}