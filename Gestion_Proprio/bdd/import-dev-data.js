const fs = require('fs');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

const Immeuble = require('./../models/immeubleModel')

dotenv.config({ path: './config.env'});

const DB = process.env.DATABASE.replace("<PASSWORD>", process.env.DATABASE_PASSWORD);

mongoose.set('strictQuery',false);
mongoose
.connect(DB, {useNewUrlParser: true})
.then(() => {console.log("DB connection succesful!");})

// read json file
const immeubles = JSON.parse(fs.readFileSync(`${__dirname}/jsonFiles/immeubles.json`, 'utf-8'));

//import data into db
const importData = async () => {
    try{
        await Immeuble.create(immeubles);
        console.log('Data succesfully loaded')
    }catch(err) {
        console.log(err);
    } finally{
        process.exit();
    }
}

//delete all data from collection
const deleteData = async () => {
    try{
        await Immeuble.deleteMany();
        console.log('Data succesfully deleted')
    }catch(err) {
        console.log(err);
    }finally{
        process.exit();
    }
}

if (process.argv[2] === '--importImmeuble') {
    importData();
} else if (process.argv[2] === '--deleteImmeuble'){
    deleteData();
}

// run into terminal : 
//     node bdd/import-dev-data.js --deleteImmeuble
//     OR 
//     node bdd/import-dev-data.js --importImmeuble