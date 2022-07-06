const express = require('express');
const app = express();
const dotenv = require('dotenv')
dotenv.config({ path: './config.env' });
const db = require("../src/db/conn");
const port = process.env.PORT || 5000;

const rout = app.use(require('./routers/routs'));
// heroku
if(process.env.NODE_ENV == "production"){
    app.use(express.static("admin_dashboard/build"));
}

app.listen(port, () => {
    console.log(`connection succesful at port ${port}`);
});


