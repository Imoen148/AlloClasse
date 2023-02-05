const fs = require('fs');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

const Fournisseur = require('../models/fournisseurModel')
const BonDeReparation = require('../models/bonDeReparationModel')
const Porte = require('../models/porteModel');

dotenv.config({ path: './config.env'});

const DB = process.env.DATABASE.replace("<PASSWORD>", process.env.DATABASE_PASSWORD);

mongoose.set('strictQuery',false);
mongoose
.connect(DB, {useNewUrlParser: true})
.then(() => {console.log("DB connection succesful!");})

// read json file
const fournisseurs = JSON.parse(fs.readFileSync(`${__dirname}/jsonFiles/fournisseurs.json`, 'utf-8'));
const bonDeReparations = JSON.parse(fs.readFileSync(`${__dirname}/jsonFiles/bonDeReparations.json`, 'utf-8'));
const portes = JSON.parse(fs.readFileSync(`${__dirname}/jsonFiles/portes.json`, 'utf-8'));

//import data into db
const importData = async () => {
    try{
        await Fournisseur.create(fournisseurs);
        await BonDeReparation.create(bonDeReparations);
        await Porte.create(portes);
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
        await Fournisseur.deleteMany();
        await BonDeReparation.deleteMany();
        await Porte.deleteMany();
        console.log('Data succesfully deleted')
    }catch(err) {
        console.log(err);
    }finally{
        process.exit();
    }
}

if (process.argv[2] === '--importFBP') {
    importData();
} else if (process.argv[2] === '--deleteFBP'){
    deleteData();
}

// run into terminal : 
//     node bdd/import-dev-data-FBP.js --deleteFBP
//     OR 
//     node bdd/import-dev-data-FBP.js --importFBP