const { item } = require('../../dataBase/sequelize')
const { ValidationError, UniqueConstraintError } = require('sequelize')
const auth = require('../../authentification/auth')
module.exports = (app) => {
    app.delete('/api/remove-item/:id',auth,(req,res)=>{
        item.findByPk(req.params.id)
        .then(item => {        
            if(item === null) {
              const message = `L'item demandé n'existe pas. Réessayez avec un autre identifiant.`
              return res.status(404).json({ message })
            }
    
            return item.destroy({ where: { id: item.id } })
            .then(_ => {
              const message = `L'item avec l'identifiant n°${item.id} a bien été supprimé.`
              //res.json({message, data: item })
              res.json({message})
            })
          })
          .catch(error => {
            const message = `L'item n'a pas pu être supprimé. Réessayez dans quelques instants.`
            res.status(500).json({ message, data: error })
          })
    })
}