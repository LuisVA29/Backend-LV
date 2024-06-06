const express = require("express");
const handlebars = require("express-handlebars");
const path = require("path");
const productsRoutes = require("./routes/products.routes");
const cartsRoutes = require("./routes/carts.routes");
const viewRoutes = require("./routes/views.routes");
const messagesRoutes = require("./routes/messages.routes");
const mongoose = require("mongoose");

PORT = 8081;
API_PREFIX = "api";

const app = express();
const server = app.listen(PORT, () => {
  console.log("SERVER FUNCIONANDO");
});
const io = require("socket.io")(server);
mongoose
  .connect(
    "mongodb+srv://coder_53160:coder2024@clustercoder.jf5ogqv.mongodb.net/?retryWrites=true&w=majority",
    {
      dbName: "ecommerce",
    }
  )
  .then((conn) => {
    console.log("CONNECTED TO MONGODB");
  })
  .catch((err) => {
    console.log("ERROR CONNECTING TO DB", err);
  });

app.use(express.urlencoded({ extends: true }));
app.use(express.json());
app.use(express.static(__dirname + "/public"));

app.engine("handlebars", handlebars.engine());
app.set("views", path.join(`${__dirname}/views`));
app.set("view engine", "handlebars");
app.set("io", io);

app.use(`/${API_PREFIX}/products`, productsRoutes);
app.use(`/${API_PREFIX}/carts`, cartsRoutes);
app.use(`/${API_PREFIX}/messages`, messagesRoutes);
app.use("/", viewRoutes);
