var mongoose = require('mongoose');

var topicSchema = mongoose.Schema({
	title: {type: String, required: '{PATH} is required!'},
	featured: {type: Boolean, required: '{PATH} is required!'},
	summary: {type: String, required: '{PATH} is required!'},
	content: {type: String, required: '{PATH} is required!'},
	published: {type: Date, required:'{PATH} is required!'},
	tags: [String],
	topic: String
});

var topic = mongoose.model('Topics', topicSchema);

function createDefaultTopics(){
	topic.find({}).exec(function(err, collection) {
    	if(collection.length === 0) {
			topic.create({
				title:"Movimiento de una partícula",
				featured: true,
				summary: "En construcción",
				content: "En construcción",
				published: new Date('12/1/2015'),
				tags: ["Movimiento","Velocidad", "Rapidez"],
				topic: 'Movimiento de una partícula'
			});
		}
	})
}

exports.createDefaultTopics = createDefaultTopics;