var mongoose = require('mongoose');

var questionSchema = mongoose.Schema({
    _id: {
        type: Number
    },
    question: {
        type: String
    },
    type: {
        type: String
    },
    choices: [String],
    dataURL: [String],
    answers: [Number]
});

var quizSchema = mongoose.Schema({
    title: {
        type: String
    },
    topics: [String],
    questions: [questionSchema],
    tags: [String]
});

var quizModel = mongoose.model('Quices', quizSchema);

function createDefaultQuices() {
    quizModel.find({}).exec(function(err, collection) {
        if (collection.length === 0) {
            console.log("No hay quices");
            quizModel.create({
                title: "Movimiento de una partícula",
                topics: ["Movimiento de una partícula"],
                questions: [{
                    _id: 1,
                    question: "Un auto recorre 5 km hacia el norte y luego 10 km hacia el este, en 10 minutos.  La rapidez media del auto para el recorrido total es:",
                    type: "Multichoice",
                    choices: ["15 km/min", "0,5 km/min", "1,5 km/min", "0,67 km/min"],
                    answers: [2]
                }, {
                    _id: 2,
                    question: "Una lancha recorre 500 m hacia el este en 20 s; la velocidad de la lancha es:",
                    type: "Multichoice",
                    choices: ["25 m/s", "0,04 m/s", "25 m/s este", "0,04 este"],
                    answers: [2]
                },
                {
                    _id: 3,
                    question: "Dos motociclistas se desplazan uno al lado del otro en la misma dirección, con rapidez de 20 m/s ambos; la rapidez de uno de ellos con respecto al otro es:",
                    type: "Multichoice",
                    choices: ["0 m/s", "10 m/s", "20 m/s", "40 m/s"],
                    answers: [0]
                }, {
                    _id: 4,
                    question: "Un tren parte del reposo y acelera uniformemente; al cabo de 0,02 h la magnitud de su velocidad es 50 km/h.  En ese tiempo el tren recorrió una distancia de:",
                    type: "Multichoice",
                    choices: ["50 km", "0,5 km", "1,0 km", "2500 km"],
                    answers: [1]
                }],
                tags: ["Movimiento"]
            });
        }
    })
}

exports.createDefaultQuices = createDefaultQuices;