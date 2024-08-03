const { Sequelize, DataTypes } = require("sequelize")
item_model = require('../models/item')
user_model = require('../models/user')
mock_items = require('./mock')

let sequelize
if(process.env.NODE_ENV === 'production'){
     sequelize = new Sequelize('afpqk027nzhceqmm', 'gw6fhtniqf49dc4s', 'jy4ja78q9bikzu1d', {
        host: 'nr84dudlpkazpylz.chr7pe7iynqr.eu-west-1.rds.amazonaws.com',
        dialect: 'mariadb',
        dialectOptions: {
          timezone: 'Etc/GMT',
        },
        logging: true
      })
} else {
     sequelize = new Sequelize('storebase', 'root', '', {
        host: 'localhost',
        dialect: 'mariadb',
        dialectOptions: {
          timezone: 'Etc/GMT',
        },
        logging: false
      })
}


const item = item_model(sequelize,DataTypes)
const user = user_model(sequelize,DataTypes)
const init_dataBase = () => {
    return sequelize.sync(
     {force:true}
    ).then(() => {
      mock_items.map(itemss =>{
        item.create({
            name: itemss.name,
            price: parseFloat(itemss.price),
            description: itemss.description,
            quantity: itemss.quantity,
            category: itemss.category,
            subcategory: itemss.subcategory,
            matricule: itemss.matricule
        })

      })
      console.log('La base de données a bien été initialisée !');
    });
}

module.exports = {
    init_dataBase,item,user
}