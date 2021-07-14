const { checkRepeatedTerms, separateElementsByIntention, createDirectories, createFile , arrayLength } = require('./functions');

const dataset = require('./archive/weather_intent_entities.json');

const examples = dataset.rasa_nlu_data.common_examples.map(item => item.text);

// check repeated terms

checkRepeatedTerms(examples);

// separate elements by intention

const [getWeatherExamples, getForecastWeatherExamples] = separateElementsByIntention(examples);

// get test array size

const getWeatherTrainLength = Math.floor(getWeatherExamples.length * 0.7);
const getForecastWeatherTrainLength = Math.floor(getForecastWeatherExamples.length * 0.7);

// create texts objects

let trainExamples = {
  getWeather: [],
  getForecastWeather: []
}

let testExamples = {
  getWeather: [],
  getForecastWeather: []
}

// mapping texts for training or testing

for(let i = 0; i < getWeatherExamples.length; i++) {
  if (i <= getWeatherTrainLength) trainExamples.getWeather.push(getWeatherExamples[i]);
  else testExamples.getWeather.push(getWeatherExamples[i]);
}

for(let i = 0; i < getForecastWeatherExamples.length; i++) {
  if (i <= getForecastWeatherTrainLength) trainExamples.getForecastWeather.push(getForecastWeatherExamples[i]);
  else testExamples.getForecastWeather.push(getForecastWeatherExamples[i]);
}

// creating directories to save texts

createDirectories();


// creating training and testing files

trainExamples.getWeather.forEach((example, index) => {
  createFile('./train/getWeather', index, example);
})

trainExamples.getForecastWeather.forEach((example, index) => {
  createFile('./train/getForecastWeather', index, example);
})

testExamples.getWeather.forEach((example, index) => {
  createFile('./test/getWeather', index, example);
})

testExamples.getForecastWeather.forEach((example, index) => {
  createFile('./test/getForecastWeather', index, example);
})


// compare size of mapped files with original array

if (examples.length === (arrayLength(trainExamples.getWeather) + arrayLength(trainExamples.getForecastWeather) + arrayLength(testExamples.getWeather) + arrayLength(testExamples.getForecastWeather))) {
  console.log ('- Nenhum arquivo foi perdido!')
} else console.log( '- Algum arquivo foi perdido!')