const { item } = require('../../dataBase/sequelize')
const { ValidationError, UniqueConstraintError } = require('sequelize')
const auth = require('../../authentification/auth')
module.exports = (app) =>{
    app.post('/api/add-item',auth, (req,res)=>{
        item.create(req.body)
        .then(item =>{
            const message = `L'item ${req.body.name} a bien ete cree`
            res.json({message, data:item})
        })
        .catch(error => {
            if(error instanceof ValidationError) {
              return res.status(400).json({ message: error.message, data: error });
            }
            if(error instanceof UniqueConstraintError) {
              return res.status(400).json({ message: 'error.message', data: error });
            }
            const message = `Le l'item n'a pas pu être ajouté. Réessayez dans quelques instants.`
            res.status(500).json({ message, data: error })
          })
    })
}