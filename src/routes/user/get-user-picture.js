const { user } = require('../../dataBase/sequelize');
const auth = require('../../authentification/auth')
module.exports = (app)=>{
    app.get('/api/get-user-picture/:username',auth, async (req, res) => {
        const { username } = req.params;
    
        try {
            const imageRecord = await user.findOne({
                where:{
                    username: username
                }
            });
    
            if (!imageRecord) {
                return res.status(404).json({ message: 'Image non trouvée.' });
            }
    
            // Répondre avec le buffer de l'image en tant que contenu
            res.setHeader('Content-Type', 'image/jpeg'); // Assurez-vous de définir le bon type MIME
            res.send(imageRecord.picture); // `picture` est le buffer de l'image
        } catch (error) {
            res.status(500).json({ message: 'Erreur lors de la récupération de l\'image.', error });
        }
    });
}