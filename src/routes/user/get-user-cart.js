const { user } = require('../../dataBase/sequelize');
const auth = require('../../authentification/auth')
module.exports = (app) => {
    app.get('/api/get-user-cart/:username',auth, async (req, res) => {
        const username = req.params.username;

        try {
            const foundUser = await user.findOne({
                where: {
                    username: username
                },
                attributes: ['cart']  // Assuming 'cart' is a column in your user model
            });

            if (!foundUser) {
                const message = `L'utilisateur demandé n'est pas disponible.`;
                return res.status(404).json({ message });
            }

            const message = `L'utilisateur a bien été trouvé.`;
            return res.json({ message, data: foundUser });
        } catch (error) {
            const message = `L'utilisateur n'a pas pu être récupéré. Réessayez dans quelques instants.`;
            return res.status(500).json({ message, data: error });
        }
    });
}
