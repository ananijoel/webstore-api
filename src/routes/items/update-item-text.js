const { item } = require('../../dataBase/sequelize')
const { ValidationError, UniqueConstraintError } = require('sequelize')
const auth = require('../../authentification/auth')
module.exports = (app) =>{
    app.put('/api/update-item/:id',auth, (req,res)=>{
        const id = req.params.id
        item.update(req.body,{
            where:{id: id}
        })
        .then(_=>{
            return item.findByPk(id).then(item => {
                if(item === null) {
                  const message = `L'item demandé n'existe pas. Réessayez avec un autre identifiant.`
                  return res.status(404).json({ message })
                }
        
                const message = `L'item ${item.name} a bien été modifié.`
                //res.json({message, data: item })
                //const message = 'L\'item a bien été récupéré.';
                const filteredItem = {
                  ...item.dataValues,
                  front_pic: item.front_pic !== null,
                  back_pic: item.back_pic !== null,
                  left_pic: item.left_pic !== null,
                  right_pic: item.right_pic !== null,
                  up_pic: item.up_pic !== null,
                  down_pic: item.down_pic !== null,
                };
                res.json({ message, data: filteredItem });
                })
        })
        .catch(error => {
            if(error instanceof ValidationError) {
              return res.status(400).json({ message: error.message, data: error });
            }
            if(error instanceof UniqueConstraintError) {
              return res.status(400).json({ message: 'error.message', data: error });
            }
            const message = `L'item n'a pas pu être modifié. Réessayez dans quelques instants.`
            res.status(500).json({ message, data: error })
          })
    })
}