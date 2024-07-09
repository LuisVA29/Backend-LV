const express = require("express")
const handlebars = require("express-handlebars")
const path = require("path")
const productsRoutes = require("./routes/products.routes")
const cartsRoutes = require("./routes/carts.routes")
const viewRoutes = require("./routes/views.routes")
const messagesRoutes = require("./routes/messages.routes")
const sessionRoutes = require("./routes/sessions.routes")
const mongoose = require('mongoose')
const cookieParser = require("cookie-parser")
const initializePassport = require("./config/passport.config")
const passport = require("passport")
const config = require("./config/config")

const PORT = config.PORT
const API_PREFIX = config.API_PREFIX
const MONGO_URL = config.MONGO_URL
const DB_NAME = config.DB_NAME
const cookieSecret = config.COOKIE_SECRET 

const app = express()

app.use(express.urlencoded({ extends: true }));
app.use(express.json()); 
app.use(express.static(__dirname + '/public'))
app.use(cookieParser(cookieSecret));

mongoose.connect(MONGO_URL, {
    dbName: DB_NAME,
  })
    .then((conn) => {
        console.log("CONNECTED TO MONGODB")
    })
    .catch((err) => {
        console.log("ERROR CONNECTING TO DB", err)
    })

const server = app.listen(PORT, () => {
    console.log("SERVER FUNCIONANDO")
})
const io = require('socket.io')(server);

initializePassport();
app.use(passport.initialize());

app.engine("handlebars", handlebars.engine())
app.set("views", path.join(`${__dirname}/views`))
app.set("view engine", "handlebars")
app.set("io",  io)

app.use(`/${API_PREFIX}/products`, productsRoutes)
app.use(`/${API_PREFIX}/carts`, cartsRoutes)
app.use(`/${API_PREFIX}/messages`, messagesRoutes)
app.use(`/${API_PREFIX}/sessions`, sessionRoutes)
app.use('/', viewRoutes)