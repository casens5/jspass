'use strict'

function $(id) {
	return document.getElementById(id);
}

// js is a second-rate language and we all know it
function capitalize(word) {
	return word.substring(0, 1).toUpperCase() + word.substring(1);
}

// function dictAvg(dictionary, domElement) {
//	 const reducer = (a, b) => {
//		 return a + b.length;
//	 };
//	 let number = (dictionary.reduce(reducer, 0) / dictionary.length).toPrecision(
//		 3
//	 );
//	 domElement.textContent = number + ' characters';
// }

function newPhrase(dictionary, length = 4, separator = ' ', caps = 'false') {
	if (length < 1) {
		length = 4;
	}
	if (length > 99) {
		length = 99;
	}

	let camel = false;
	// don't judge me
	if (caps === 'camel') {
		caps = 'true';
		camel = true;
	}

	const phrase = [];
	let word;
	for (let i = 0; i < length; i += 1) {
		word = dictionary[Math.floor(Math.random() * dictionary.length)];
		if (caps === 'true') {
			word = capitalize(word);
		}
		phrase.push(word);
	}
	if (camel) {
		phrase[0] = phrase[0].toLowerCase();
	}
	$('phraseDisplay').textContent = phrase.join(separator);
}

const multilingualURL = 'dictionaries/multilingual.json';
const diceURL = 'dictionaries/diceware.json';
const effURL = 'dictionaries/eff.json';

//	const multilingualWebURL = 'https://raw.githubusercontent.com/ludant/jspass/master/dictionaries/multilingual.json';
//	const diceWebURL = 'https://raw.githubusercontent.com/ludant/jspass/master/dictionaries/diceware.json';
//	const effWebURL = 'https://raw.githubusercontent.com/ludant/jspass/master/dictionaries/eff.json';

const dictionaries = {};

$('instructionsLink').addEventListener('click', () => {
	$('info').classList.toggle('hidden');
});

$('generateButton').addEventListener('click', () => {
	newPhrase(
		dictionaries[$('dictionarySelect').value],
		$('phraseLength').value,
		$('wordSeparator').value,
		$('capitalsSelect').value,
	);
});

async function loadDict(url, dictName, generate = false) {
	const response = await fetch(url);
	if (response.ok) {
		dictionaries[dictName] = await response.json();
		console.log(generate)
		if (generate) {
			newPhrase(dictionaries[dictName], 4, ' ', 'false');
		};
	} else {
		console.log('fuck, ' + response.status);
	}
}

async function beeb(url, name, generate = false) {
  fetch(url)
	.then(response => response.json())
	.then(data => {
		dictionaries[name] = data;
		if (generate) {
			newPhrase(dictionaries[name], 4, ' ', 'false');
		};
	})
	.catch((error) => {
		console.error(error);
	});
}

loadDict(diceURL, 'diceware');
loadDict(effURL, 'eff');
loadDict(multilingualURL, 'multilingual', true);
