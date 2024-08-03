const { item } = require('../../dataBase/sequelize');
const Sequelize = require('sequelize');

module.exports = (app) => {
  app.get('/api/get-subcategories/:category', async (req, res) => {
    const category = req.params.category; // Récupère la catégorie à partir des paramètres d'URL

    try {
      const subcategories = await item.findAll({
        attributes: [
          [Sequelize.fn('DISTINCT', Sequelize.col('subcategory')), 'subcategory']
        ],
        where: {
          category: category
        }
      });

      // Extraire les sous-catégories du résultat
      const distinctSubcategories = subcategories.map(sub => sub.get('subcategory'));
      const message = `La liste des sous-catégories pour la catégorie '${category}' a bien été récupérée.`;
      res.json({ message, data: distinctSubcategories });
    } catch (error) {
      const message = `La liste des sous-catégories pour la catégorie '${category}' n'a pas pu être récupérée. Réessayez dans quelques instants.`;
      res.status(500).json({ message, data: error });
    }
  });
};
