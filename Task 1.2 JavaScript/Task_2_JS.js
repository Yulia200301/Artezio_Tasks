
function CalcLength(inputText, outputText){
    outputText.innerHTML = inputText.value.length;
  }
  

  document.querySelector('#inputTextTask-2').addEventListener('input', () => {
    const inputText = document.querySelector('#inputTextTask-2');
    const symbols = document.querySelector('#outputSymTask-2');
    const words = document.querySelector('#outputWordsTask-2');
    const strings = document.querySelector('#outputStringsTask-2');
    CalcLength(inputText,symbols);
    CalcWords(inputText,words);
    CalcStrings(inputText,strings);
  })
  

  function CalcWords(inputText,outputText){
    var separators = /[ ;!?., '"\n]+/; // + - 1 или более
    const words = inputText.value.split(separators);
    outputText.innerHTML = words.length - 1;
  }
  

  function CalcStrings(inputText,outputText){
    var separators = /(?!\n$)\n/; // исключает пустую строку или пробелы за строку
    const str = inputText.value.split(separators);
    outputText.innerHTML = str.length;
  }
  