const { item } = require('../../dataBase/sequelize');
const { ValidationError, UniqueConstraintError } = require('sequelize');
const multer = require('multer');
const auth = require('../../authentification/auth')
// Configuration de multer pour stocker les fichiers en mémoire
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

module.exports = (app) => {
    app.put('/api/update-item/:id/:side',auth, upload.single('picture'), async (req, res) => {
        const id = req.params.id;
        const side = req.params.side;
        const { file, body } = req;
        const { ...otherDetails } = body;

        try {
            if (!file) {
                return res.status(400).json({ message: 'Aucun fichier téléchargé.' });
            }
            // Le fichier est accessible via req.file.buffer
            const buf = file.buffer;

            // Vérifiez si l'image existe déjà
            const existingImage = await item.findByPk(id);
            if (!existingImage) {
                return res.status(404).json({ message: 'Image non trouvée pour ce matricule.' });
            }

            // Mise à jour de l'image
            existingImage[side] = buf;
            for (const key in otherDetails) {
                existingImage[key] = otherDetails[key];
            }
            await existingImage.save();
            
            const message = 'L\'image a bien été mise à jour';
            res.json({ message/*, data: existingImage*/});
        } catch (error) {
            if (error instanceof ValidationError) {
                return res.status(400).json({ message: error.message, data: error.errors });
            }
            if (error instanceof UniqueConstraintError) {
                return res.status(400).json({ message: 'Une contrainte unique a été violée.', data: error.errors });
            }
            res.status(500).json({ message: 'Une erreur est survenue lors de la mise à jour de l\'image.', data: error });
        }
    });
};
