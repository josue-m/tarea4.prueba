const mongoose = require('mongoose');

const dotenv = require('dotenv');
dotenv.config();
const mongoconnect = process.env.mongoconnect || "";
const port = process.env.port || 3000;

var BDConnect = async () => {
    try {
        await mongoose.connect(mongoconnect, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        console.log("BD Connection Success");
    } catch (err) {
        console.log(err);
        throw new Error("BD Connection Error");
    }
}

module.exports = {BDConnect, port}