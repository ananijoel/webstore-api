const { user } = require('../../dataBase/sequelize');
const { ValidationError, UniqueConstraintError } = require('sequelize');
const multer = require('multer');
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
const auth = require('../../authentification/auth')
module.exports = (app) => {
    app.put('/api/update-user-picture/:username',auth, upload.single('picture'), async (req, res) => {
        const username = req.params.username;
        const { file, body } = req;
        const { ...otherDetails } = body;

        try {
            if (!file) {
                return res.status(400).json({ message: 'Aucun fichier téléchargé.' });
            }

            const buf = file.buffer;

            const [updated] = await user.update({ ...otherDetails, picture: buf }, { where: { username: username } });

            if (updated) {
                const message = `L'image a bien été mise à jour.`;
                return res.status(200).json({ message });
            } else {
                return res.status(404).json({ message: 'Utilisateur non trouvé.' });
            }
        } catch (error) {
            if (error instanceof ValidationError) {
                return res.status(400).json({ message: error.message, data: error.errors });
            }
            if (error instanceof UniqueConstraintError) {
                return res.status(400).json({ message: 'Cette image existe déjà.', data: error.errors });
            }
            res.status(500).json({ message: 'Une erreur est survenue lors de la mise à jour de l\'image.', data: error });
        }
    });
};
