const mongoose = require('mongoose');
const mongoUrl = "mongodb://localhost:27017/iNotebook?readPreference=primary&appname=MongoDB%20Compass&directConnection=true&ssl=false";

const connectToMongo = async() => {
    mongoose.connect(mongoUrl, () => {
        console.log("Connected to Mongo Successfully");
    })
}

module.exports = connectToMongo;