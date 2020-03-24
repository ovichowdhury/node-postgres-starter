const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');


// init express app
const app = express();

// enabling cors
const options = {
    allowedHeaders: "Origin, X-Requested-With, Content-Type, Accept, x-auth-token",
    exposedHeaders: "Origin, X-Requested-With, Content-Type, Accept, x-auth-token"
}
app.use(cors(options));




// public folder conf
app.use(express.static(path.join(__dirname, 'public')));

// body-parser config
app.use(bodyParser.json({ limit: '5mb' }));
app.use(express.urlencoded({ extended: false }));



// for handling uncaught exception from application
process.on('uncaughtException', (err) => {
    console.error("Uncaught Exception : ", err.message);
});

process.on('unhandledRejection', error => {
    console.error("From event: ", error.toString());
});

// importing routes




// Routes
app.use('/todo', todoRoute);



app.listen(3000, (e) => {
    console.log("Server Started.....");
})