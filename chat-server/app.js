const express = require("express"); // web framework for node.js that is express.js

const routes = require("./routes/index");

const morgan = require("morgan"); //HTTP request logger middleware for node.js it gives us the data on server side when the user send request to the server and it collects the informations like what end point was hit and what was the response and response time etc

const rateLimit = require("express-rate-limit"); // this won't allow any ip to send more than 1000 request in an hour and secure the server from brute force any other attacks using bots etc

const helmet = require("helmet"); // this is used for securing propose and this adds the different types  headers  to the response

const mongosanitize = require("express-mongo-sanitize"); // this won't allow end users to inject any script to the input form any like this field

const bodyParser = require("body-parser"); // this will parse the request body

const xss = require("xss");

const cors = require("cors");

const app = express(); // now our app is just created



app.use(cors({
    origin: "*",
    methods: ["GET", "PATCH", "POST", "DELETE", "PUT"],
    credentials: true,
}))
app.use(express.json({ limit: "10kb" }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(helmet());

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

const limiter = rateLimit({
  max: 3000,
  windowMs: 60 * 60 * 1000, // in one hour
  messagge: "Too many requests from this IP, Please try again in an hour",
});

app.use("/kurakani", limiter);

// app.use(
//   express.urlencoded({
//     extended: true,
//   })
// );

// app.use(mongosanitize());
// app.use(xss());

app.use(routes);

module.exports = app;

// http://localhost:3000/v1/auth/login
