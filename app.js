const express = require('express')
const favicon = require('serve-favicon')
const bodyParser = require('body-parser')
const sequelize = require('./src/dataBase/sequelize')
//const cors = require('cors')

const staticport = 3000
const app = express()
const port = process.env.PORT || staticport

//sequelize.init_dataBase()

app
    .use(favicon(__dirname + '/favicon.ico'))
    .use(bodyParser.json())
    //.use(cors())


app.get('/', (req, res) => res.json('hello note-store-api'))

// item routes
require('./src/routes/items/add-item')(app)
require('./src/routes/items/get-items')(app)
require('./src/routes/items/get-item-by-id')(app)
require('./src/routes/items/get-items-by-params')(app)
require('./src/routes/items/get-items-by-2-params')(app)
require('./src/routes/items/update-item-text')(app)
require('./src/routes/items/remove-item')(app)
require('./src/routes/items/update-item-picture')(app)
require('./src/routes/items/get-item-picture')(app)
require('./src/routes/items/get-existings-items-categories')(app)
require('./src/routes/items/get-existings-items-subcategories')(app)
require('./src/routes/items/get-item-up-categories')(app)
// user routes
require('./src/routes/user/add-user')(app)
require('./src/routes/user/get-users')(app)
require('./src/routes/user/get-user-by-param')(app)
require('./src/routes/user/update-user')(app)
require('./src/routes/user/get-user-cart')(app)
require('./src/routes/user/update-user-picture')(app)
require('./src/routes/user/get-user-picture')(app)
require('./src/routes/user/remove-user')(app)
require('./src/routes/user/remove-user-picture')(app)
require('./src/routes/user/user-login')(app)

app.use(({res})=>{
    const message = 'impossible de trouver la ressource demandée! Vous pouvez essayer une autre URL'
    res.status(404).json({message})
})

if(process.env.PORT){
    app.listen(port,() => console.log('le projet note-store-api est demarée'))
} else{
    app.listen(port,() => console.log('le projet note-store-api est demarée sur : http://localhost:'+staticport))
}

