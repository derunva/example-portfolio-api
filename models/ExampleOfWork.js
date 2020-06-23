const mongoose = require('mongoose')

const exampleOfWorkSchema = mongoose.Schema({
  title: {
    type: String,
    required: "Заголовок обов'язковий"
  },
  link: {
    type: String,
    lowercase: true 
  },
  desc: {
    type: String,
    required: "Опис обов'язковий",
    minlength: 120
  },
  image: {
    type: String,
    required: "Зображення обов'язкове"
  },
  price: {
    type: String,
    required: "Витрати обов'язкові"
  },
  usedSkills: {
    type: String,
    required: "Використанні технології обов'язкові"
  },
})

const ExampleOfWork = mongoose.model('ExampleOfWork', exampleOfWorkSchema)

module.exports = ExampleOfWork
