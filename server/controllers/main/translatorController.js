var languageMongoose = require('mongoose').model('Languages');

exports.getLanguage = function(req, res) {
  console.log("Buscando Language");
  console.log(req.params.languaje);
  languageMongoose.findOne({language:req.params.language}).exec(function(err, language) {
    res.send(language);
  })
}