
export default function UsersDB(db) {

    return {
        signup: async (username, password) => {
            try {
                //check if user is existing
                let existingUser = await db.any('select * from users where username = $1', [username])
                console.log(existingUser, 'exisiting user');

                if (!existingUser) {
                    throw new Error('User already exists');
                } else {
                    //have password encryption here
                    await db.any('insert into users (username, password) values ($1, $2)', [username, password])
                    let newUserId = await db.any('select id from users where username =$1', [username])
                    console.log(newUserId[0].id, 'userid for username');
                    //create cart for new user
                    let userCartId = await db.any('insert into cart (user_id) values ($1) RETURNING id', [newUserId[0].id])
                    console.log(userCartId, 'user cart id');
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
                let username = await db.one('select * from users where username = $1 and password = $2', [username, password])
                if (username) {
                    // if correct, send a message
                    return { message: 'Welcome back!' };
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
    get user from db using username, check the results,
    if not results it means username does not exist, if theres results, 
    verify db password with entered password, if its correct log user successfully.
    
    signUp: check if user already created account,
    if not, insert new user into db. Once new user is created, 
    get user id and create a cart for user 
        */
    }
}