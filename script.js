'use strict'

const multilingualURL = 'https://raw.githubusercontent.com/ludant/jspass/master/multilingual.json';
const diceURL = "https://raw.githubusercontent.com/ludant/jspass/master/diceware.json";
const effURL = "https://raw.githubusercontent.com/ludant/jspass/master/eff.json";
let dictionaries = {}

const phraseDisplay = document.querySelector('#phraseDisplay');
const capitalsSelect = document.querySelector('#capitalsSelect');
const phraseLength = document.querySelector('#phraseLength');
const wordSeparator = document.querySelector('#wordSeparator');
const dictionarySelect = document.querySelector('#dictionarySelect');
const multiAvg = document.querySelector('#multiAvg');
const diceAvg = document.querySelector('#diceAvg');
const effAvg = document.querySelector('#effAvg');
const multiEntropy = document.querySelector('#multiEntropy');
const diceEntropy = document.querySelector('#diceEntropy');
const effEntropy = document.querySelector('#effEntropy');

const instructionsDiv = document.querySelector('#instructions');
// const dataDiv = document.querySelector('#data');
// const whyDiv = document.querySelector('#why');
const instructionsLink = document.querySelector('#instructionsLink');
// const dataLink = document.querySelector('#dataLink');
// const whyLink = document.querySelector('#whyLink');
instructionsLink.addEventListener('click', () => {instructionsDiv.classList.toggle('hidden')
});
// dataDiv.classList.add('hidden');
// whyDiv.classList.add('hidden')})
// dataLink.addEventListener('click', () => {dataDiv.classList.toggle('hidden')})
// whyLink.addEventListener('click', () => {whyDiv.classList.toggle('hidden')})

const newPhraseBtn = document.querySelector('#generateButton');
newPhraseBtn.addEventListener('click', () => {
  newPhrase(dictionaries[dictionarySelect.value], phraseLength.value, wordSeparator.value, capitalsSelect.value)
});

String.prototype.capitalize = function() {
  // js is a second-rate language and we all know it
  return (this.substring(0, 1).toUpperCase()) + this.substring(1)
}

function dictAvg(dictionary, domElement) {
  const reducer = (a, b) => {return a + b.length};
  let number = (dictionary.reduce(reducer, 0)/dictionary.length).toPrecision(3);
  domElement.textContent = number + " characters"
}

// function averageDictionaries() {
//   dictAvg(dictionaries.multilingual, multiAvg);
//   dictAvg(dictionaries.eff, effAvg);
//   dictAvg(dictionaries.diceware, diceAvg);
// }

function newPhrase(dictionary, length = 4, separator = " ", caps = "false" ) {
  let camel = false
  if (caps == "camel") {caps = "true"; camel = true} // going to js hell for this one boys
  let phrase = []
  let word
  if (length < 1) { length = 4; separator = " " };
	if (length > 99) { length = 99};
  for (let i = 0; i < length; i++) {
    word = dictionary[Math.floor(Math.random() * dictionary.length)];
    if (caps == "true") {word = word.capitalize()}
    phrase.push(word);
  }
  if (camel) {phrase[0] = phrase[0].toLowerCase()}
	phraseDisplay.textContent = phrase.join(separator);
}

function loadDict(url, dictionaryName, generate = false) {
  let xobj = new XMLHttpRequest();
  xobj.overrideMimeType("application/json");
  xobj.open('GET', url, true);
  xobj.responseType = 'json';
  xobj.onreadystatechange = function () {
    if (xobj.readyState == 4 && xobj.status == "200") {
      dictionaries[dictionaryName] = xobj.response;
      // going to programmer hell for this one
      if (generate) {
        newPhrase(dictionaries[dictionaryName], 4, " ", "false")
        //averageDictionaries();
      };
    }
  };
  xobj.send(null);
 }

loadDict(diceURL, "diceware");
loadDict(effURL, "eff");
loadDict(multilingualURL, "multilingual", true);
