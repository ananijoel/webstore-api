const { item } = require('../../dataBase/sequelize')

module.exports = (app) => {
    app.get('/api/get-item/:id/:side', async (req, res) => {
        const { id, side } = req.params;

        // Liste des champs autorisés pour éviter les injections SQL
        const allowedFields = ['front_pic', 'back_pic', 'left_pic', 'right_pic', 'up_pic', 'down_pic']; // Mettez ici les noms des champs que vous souhaitez autoriser

        // Vérifiez que le champ 'side' est valide
        if (!allowedFields.includes(side)) {
            return res.status(400).json({ message: 'Champ non valide.' });
        }

        try {
            // Trouver l'élément par son ID et sélectionner uniquement le champ souhaité
            const imageRecord = await item.findOne({
                where: {
                    id: id
                },
                attributes: [side]
            });

            if (!imageRecord) {
                return res.status(404).json({ message: 'Image non trouvée.' });
            }

            // Répondre avec le champ souhaité de l'image en tant que contenu
            const fieldContent = imageRecord[side];
            if (!fieldContent) {
                return res.status(404).json({ message: 'Contenu non trouvé.' });
            }

            res.setHeader('Content-Type', 'image/png'); // Assurez-vous de définir le bon type MIME
            res.send(fieldContent); // Envoyez le contenu du champ souhaité
        } catch (error) {
            res.status(500).json({ message: 'Erreur lors de la récupération de l\'image.', error });
        }
    });
}
