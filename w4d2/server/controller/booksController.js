const Book = require('../model/books');
const {ObjectId} = require('mongodb');
const Response = require('../model/responseObj');

exports.getAll = async (req, res, next)=>{
    const book = await Book.find();
    res.status(200).json(new Response(false, null, book));
};

exports.getById = async (req, res, next)=>{
    const book = await Book.findById(req.params.id);

   res.status(200).json(new Response(false, null, book));
};

exports.save = async (req, res, next)=>{
        const result = await new Book(req.body).save(); 
        res.status(200).json(new Response(false, null, result));

};

exports.update = async (req, res, next)=>{
    const result = await Book.updateOne({_id: new ObjectId(req.params.id)} , req.body);
    res.status(200).json(new Response(false, null, result));
};

exports.deleteById = async(req, res, next)=>{
    await Book.findByIdAndDelete(req.params.id);
    res.json({_id: req.params.id});
};
 
 