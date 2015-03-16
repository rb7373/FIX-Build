var mongoose = require('mongoose');
var topicModel = require('../../models/main/topicModel');
var quizModel = require('../../models/main/quizModel');
var userModel = require('../../models/main/userModel');
var languageModel = require('../../models/main/languageModel');
var imageModel = require('../../models/main/imageModel');

module.exports = function (config) {
    mongoose.connect(config.db);
    var db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error...'));
    db.once('open', function callback() {
        console.log('FiX db opened');
    });

    topicModel.createDefaultTopics();
    quizModel.createDefaultQuices();
    userModel.createDefaultUsers();
    languageModel.createDefaultLanguages();
    imageModel.createDefaultImages();

}