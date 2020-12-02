const express = require('express');
const bodyParser = require('body-parser');
const connectDB = require("./config/connection");
const authRoutes = require("./routes/routes.js");
const homeRoutes = require("./routes/home.js");
const dashboardRoutes = require("./routes/dashboard.js");
const verifyToken = require("./routes/validate-token");
const dotenv = require("dotenv");
var exphbs = require('express-handlebars');
const path = require('path');


// create express app
const app = express();
dotenv.config();
connectDB();

app.engine("handlebars", exphbs());
app.set('view engine', 'handlebars');

app.use(bodyParser.urlencoded({ extended: true })) // parse requests of content-type - application/x-www-form-urlencoded

app.use(bodyParser.json()) // parse requests of content-type - application/json

// define a simple route
// app.get('/', (req, res) => {
//     // res.json({ "message": "Welcome to Ms06 wlc ---- hello world!!!" });
//     res.sendFile(path.join(__dirname, './public/index.html'));

// });

// app.get('/', function(req, res) {
//     res.render('newsAdd');
// });

app.use(express.json()); // for body parser


// route middlewares
app.use("/api/user", authRoutes);

app.use("/", homeRoutes);

// this route is protected with token
app.use("/api/dashboard", verifyToken, dashboardRoutes);



// listen for requests
app.listen(process.env.PORT || 5000, () => {
    console.log("Server is listening on port 5000");
});