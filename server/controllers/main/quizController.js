var quizMongoose = require('mongoose').model('Quices');

exports.getQuices = function(req, res) {
	console.log("Buscando Quices");
  quizMongoose.find({},{title:1}).exec(function(err, collection) {
    res.send(collection);
  })
};

exports.getQuizByTopic = function(req, res) {
  console.log("Buscando QuizByTopic");
  console.log(req.params.topic);
  quizMongoose.findOne({topics:req.params.topic}).exec(function(err, quiz) {
    res.send(quiz);
    //res.sendStatus(404);
  })
}