var mongoose = require('mongoose');

var languageSchema = mongoose.Schema({
    language: {type: String, required: '{PATH} is required!'},
    title: {type: String, required: '{PATH} is required!'}
});

var language = mongoose.model('Languages', languageSchema);

function createDefaultLanguages(){
    language.find({}).exec(function(err, collection) {
        if(collection.length === 0) {
            language.create({
                language:"en-us",
                title:"Welcome to FiX, the best app to learn Physics"
            });
            language.create({
                language:"es-cr",
                title:"Bienvenido a FiX, la mejor aplicación para aprender Física"
            });
        }
    })
}

exports.createDefaultLanguages = createDefaultLanguages;