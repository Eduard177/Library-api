const express = require("express");
const cors = require("cors")
const swaggerUi = require("swagger-ui-express");

const {Configuration}= require("./src/modules/config/config.key");
const {ConfigService} = require("./src/modules/config/index");

const app = express();
const db = require("./src/modules/database/index");
const swaggerDocument = require("./swagger.json");

const config = new ConfigService;

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

require('./src/routes/book.routes')(app);
app.get("/", (req, res) => {
  res.json({ message: "Welcome to library application." });
});
app.use(cors());

app.listen(process.env.PORT || 3000, ()=>{
    console.log(`Escuchando puerto `,process.env.PORT || 3000)
})

swaggerDocument.host = process.env.SWAGGER_HOST || "localhost:3000"

app.use(
  '/api-docs',
  swaggerUi.serve, 
  swaggerUi.setup(swaggerDocument)
);

db.mongoose
  .connect(config.get(Configuration.MONGO_URI), {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("Connected to the database!");
  })
  .catch(err => {
    console.log("Cannot connect to the database!", err);
    process.exit();
  });

