const fs = require('fs');

function checkRepeatedTerms(array) {
  var filtrado = array.filter(function(elem, pos, arr) {
    if(arr.indexOf(elem) == pos) return true;
    else {
      console.log(elem);
      return false;
    }
  });

  if (filtrado.length === array.length) console.log('- O array não tem termos repetidos');
  else console.log('- O array tem termos repetidos!');
}

function checkForForecastWord(text) {
  return text.toLowerCase().includes('forecast');
}

function separateElementsByIntention(array) {
  let getWeatherExamples = [];
  let getForecastWeatherExamples = [];

  array.map(item => {
    checkForForecastWord(item) ? getForecastWeatherExamples.push(item) : getWeatherExamples.push(item);
  });

  console.log ('- Elementos separados por intenção com sucesso!')

  return [getWeatherExamples, getForecastWeatherExamples]
}

function createDirectories() {
  fs.mkdirSync('./test/getWeather');
  fs.mkdirSync('./test/getForecastWeather');
  fs.mkdirSync('./train/getWeather');
  fs.mkdirSync('./train/getForecastWeather');

  console.log ('- Diretórios criados com sucesso!')
}

function createFile(path, name, text) {
  fs.appendFile(`./${path}/${name}.txt`, text, function (err) {
    if (err) throw err;
  });
}

function arrayLength(array) {
  return array.length;
}

module.exports = {checkRepeatedTerms, separateElementsByIntention, createDirectories, createFile, arrayLength }