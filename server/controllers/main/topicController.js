var topicMongoose = require('mongoose').model('Topics');

exports.getTopics = function(req, res) {
  topicMongoose.find({},{title:1, featured: 1}).exec(function(err, collection) {
    res.send(collection);
  })
};

exports.getTopicsById = function(req, res) {
  console.log("Buscando TopicsById");
  console.log(req.params.id);
  topicMongoose.findOne({_id:req.params.id}).exec(function(err, topic) {
    res.send(topic);
  })
}