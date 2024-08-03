const { item } = require('../../dataBase/sequelize');
const { Op } = require('sequelize');

module.exports = (app) => {
    app.get('/api/get-items/:field/:value/:secondfield/:secondvalue/:limit', (req, res) => {
        const field = req.params.field;
        const value = isNaN(req.params.value)? req.params.value : parseFloat(req.params.value);
        const secondfield = req.params.secondfield;
        const secondvalue = isNaN(req.params.secondvalue)? req.params.secondvalue : parseFloat(req.params.secondvalue);
        const limit = parseInt(req.params.limit);
        /* Validation des entrées utilisateur
        const allowedFields = ['name', 'category', 'description','quantity']; // Exemple de champs autorisés
        if (!allowedFields.includes(field)) {
            return res.status(400).json({ message: `Le champ '${field}' n'est pas autorisé.` });
        }
        */
        item.findAll({
            where: {
                [field]: {
                    [Op.like]: `%${value}%`
                },
                [secondfield]: {
                    [Op.like]: `%${secondvalue}%`
                }
            },
            order: [['id', 'ASC']], 
            limit: limit
        })
        .then(items => {
            if (items.length === 0) {
                const message = `Aucun item trouvé pour ${field}: ${value}.`;
                return res.status(404).json({ message });
            }
            const message = `Des items ont bien été trouvés pour la catégorie '${value}'.`;
            //res.json({ message, data: items });
            const filteredItems = items.map(item => ({
                ...item.dataValues, // Use dataValues to get the actual data
                front_pic: item.front_pic !== null,
                back_pic: item.back_pic !== null,
                left_pic: item.left_pic !== null,
                right_pic: item.right_pic !== null,
                up_pic: item.up_pic !== null,
                down_pic: item.down_pic !== null,
                //down_pic: item.down_pic.
                
              }));
              res.json({ message, data: filteredItems });
        })
        .catch(error => {
            const message = `Les items n'ont pas pu être récupérés pour la catégorie '${value}'. Réessayez dans quelques instants.`;
            res.status(500).json({ message, error });
        });
    });
};
