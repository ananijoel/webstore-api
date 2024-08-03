const { item } = require('../../dataBase/sequelize');
const Sequelize = require('sequelize');

module.exports = (app) => {
  app.get('/api/get-items/:field', (req, res) => {
    const field = req.params.field; // Récupère le champ à partir des paramètres d'URL

    item.findAll({
      attributes: [
        [Sequelize.fn('DISTINCT', Sequelize.col(field)), field]
      ]
    })
    .then(items => {
      // Extraire les valeurs distinctes du résultat
      const distinctValues = items.map(item => item.get(field));
      const message = `La liste des valeurs distinctes pour le champ '${field}' a bien été récupérée.`;
      res.json({ message, data: distinctValues });
    })
    .catch(error => {
      const message = `La liste des valeurs distinctes pour le champ '${field}' n'a pas pu être récupérée. Réessayez dans quelques instants.`;
      res.status(500).json({ message, data: error });
    });
  });
};
