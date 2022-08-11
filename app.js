require("dotenv").config();
const express = require("express");
const mongoose = require('mongoose');
const app = express();
const PORT = process.env.PORT || 8080;
app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));

const router = require("./api/router");

app.use("/api/", router);

mongoose.connect(process.env.MONGO_DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});
mongoose.connection.once('open', () => {
    console.log('connect to db');
})

app.listen(PORT, () =>
    console.log(`Example app listening on port ${PORT}!`)
);