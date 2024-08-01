const { item } = require('../../dataBase/sequelize')

module.exports = (app) => {
  app.get('/api/get-items', (req, res) => {
      item.findAll({order: ['name']})
      .then(items => {
        const message = 'La liste des Produits a bien été récupérée.';
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
      .catch(error =>{
        const message = `La liste des items n'a pas pu etre recuperé. Réessayez dans quelques instants.`
        res.status(500).json({message, data: error})
      })
    
  })
}