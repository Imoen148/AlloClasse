const catchAsync = require('./../utils/catachAsync');
const AppError = require('./../utils/appError');
const APIFeatures = require('./../utils/ApiFeatures');
const { modelName } = require('../models/userModel');

exports.deleteOne = Model => catchAsync(async (req, res, next) => {
    
    const doc = await Model.findByIdAndDelete(req.params.id)

    if (!doc) {
        return next(new AppError('No document found with that ID', 404));
    }

    res.status(204).json({
        status: 'success',
        data : null
    })
});


exports.updateOne = Model => catchAsync(async (req, res, next) => {

    const doc = await Model.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true
    })

    if (!doc) {
        return next(new AppError('No document found with that ID', 404));
    }

     
    res.status(200).json({
        status: 'success',
        data : {
            data: doc
        }
    });
});


exports.createOne = Model => catchAsync(async (req, res, next) => {

    const doc = await Model.create(req.body);

    res.status(201).json({
        status: 'success',
        data:{
            data: doc
        },
        message : 'Document créer!'
    });
});

exports.getOne = (Model, populateOptions) => catchAsync(async (req, res, next) => {
    let query = Model.findById(req.params.id);
    if (populateOptions) query = query.populate(populateOptions);
    const doc = await query;

    if (!doc) {
       return next(new AppError('No document found with that ID', 404));
    }

    res.status(200).json({
        status: 'success',
        data : {
            data: doc
        }
    })
});

exports.getAll = (Model, modelName) => catchAsync(async (req, res,  next) => {
    // Allow nested route
    let filter = {}
    if(req.params.immeubleId) filter = {Immeuble: req.params.immeubleId};

    // requete a la bdd
    const features = new APIFeatures(Model.find(filter), req.query)
        .filter()
        .sort()
        .limitFields()
        .paginate();
        
    console.log(modelName);
    let doc;
    if( modelName === "Immeuble") {
        console.log('je suis ici');
        doc = await features.query.populate('Fournisseurs').populate('BonDeReparations');
    }
    else {
        console.log('je suis là');
        doc = await features.query;
    }

    res.status(200).json({
        status: 'success',
        results: doc.length,
        data : {
            data: doc
        }
    })
});