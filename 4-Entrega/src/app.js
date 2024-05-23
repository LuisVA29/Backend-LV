const express = require("express");
const handlebars = require("express-handlebars");
const path = require("path");
const productsRoutes = require("./routes/products.routes.js");
const cartsRoutes = require("./routes/carts.routes.js");
const viewRoutes = require("./routes/views.routes.js");

PORT = 8081;
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(__dirname + "/public"));

app.use("/api/products", productsRoutes);
app.use("/api/carts", cartsRoutes);
app.use("/", viewRoutes);

const server = app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

const io = require("socket.io")(server);

app.engine("handlebars", handlebars.engine());
app.set("views", path.join(`${__dirname}/views`));
app.set("view engine", "handlebars");
app.set("io", io);
