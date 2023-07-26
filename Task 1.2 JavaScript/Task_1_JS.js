
document.querySelector('#inputTextTask-1').addEventListener('input', () => {
  const inputText = document.querySelector('#inputTextTask-1');
  const outputText = document.querySelector('#outputTextTask-1');
  CalcLength(inputText, outputText);
})


function CalcLength(inputText, outputText){
  outputText.innerHTML = inputText.value.length;
}