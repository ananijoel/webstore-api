const { item } = require('../../dataBase/sequelize');

module.exports = (app) => {
    app.get('/api/get-item/:id', (req, res) => {
        item.findByPk(req.params.id)
        .then(foundItem => {
            if (foundItem === null) {
                const message = `L'item demandé n'est pas disponible.`;
                return res.status(404).json({ message });
            }
            const message = 'L\'item a bien été récupéré.';
            const filteredItem = {
                ...foundItem.dataValues,
                front_pic: foundItem.front_pic !== null,
                back_pic: foundItem.back_pic !== null,
                left_pic: foundItem.left_pic !== null,
                right_pic: foundItem.right_pic !== null,
                up_pic: foundItem.up_pic !== null,
                down_pic: foundItem.down_pic !== null,
            };
            res.json({ message, data: filteredItem });
        })
        .catch(error => {
            const message = `L'item n'a pas pu être récupéré. Réessayez dans quelques instants.`;
            res.status(500).json({ message, data: error });
        });
    });
};
