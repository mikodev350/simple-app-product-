
  const mongoose = require('mongoose');
var QuestionSchemat = new mongoose.Schema({
  idAdmin: {
    type: String,
  },
    question: {
        type: String
      },
      reponse:{
        type: String
      },
    })

const Question = mongoose.model('questionData', QuestionSchemat);

module.exports = Question;