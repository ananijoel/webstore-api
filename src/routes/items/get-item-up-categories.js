const { item } = require('../../dataBase/sequelize');
const Sequelize = require('sequelize');

module.exports = (app) => {
  app.get('/api/get-categories/:subcategory', async (req, res) => {
    const subcategory = req.params.subcategory; // Récupère la sous-catégorie à partir des paramètres d'URL

    try {
      const categories = await item.findAll({
        attributes: [
          [Sequelize.fn('DISTINCT', Sequelize.col('category')), 'category']
        ],
        where: {
          subcategory: subcategory
        }
      });

      // Extraire les catégories du résultat
      const distinctCategories = categories.map(cat => cat.get('category'));
      const message = `La liste des catégories pour la sous-catégorie '${subcategory}' a bien été récupérée.`;
      res.json({ message, data: distinctCategories });
    } catch (error) {
      const message = `La liste des catégories pour la sous-catégorie '${subcategory}' n'a pas pu être récupérée. Réessayez dans quelques instants.`;
      res.status(500).json({ message, data: error });
    }
  });
};
