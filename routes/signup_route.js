export default function SignUpRoute(users) {
    return {
        user_signup: async (req, res) => {
            let users_name = req.body.username;
            let user_password = req.body.password;

            let results = await users.signup(users_name, user_password);
            res.json(results)
        },

        user_login: async (req, res) => {
            let users_name = req.body.username;
            let user_password = req.body.password;
            let results = await users.login(users_name, user_password)
            res.json(results)
        }
    }
}