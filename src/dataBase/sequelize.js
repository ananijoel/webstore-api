const { Sequelize, DataTypes } = require("sequelize")
item_model = require('../models/item')
user_model = require('../models/user')

let sequelize
if(process.env.NODE_ENV === 'production'){
     sequelize = new Sequelize('u63v5gahi9wsuren', 'rc6ejreecou21zyy', 'yrt38ps6ix90j1by', {
        host: 'uyu7j8yohcwo35j3.cbetxkdyhwsb.us-east-1.rds.amazonaws.com',
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
    )
}

module.exports = {
    init_dataBase,item,user
}