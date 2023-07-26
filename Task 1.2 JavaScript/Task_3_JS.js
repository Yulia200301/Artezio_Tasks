document.querySelector('#inputTextTask-3').addEventListener('input', () => {
    const inputText = document.querySelector('#inputTextTask-3');
    const outputText = document.querySelector('#outputTextTask-3');
    const prompt = document.querySelector('#limitSym-3');
    CheckInput(inputText, outputText, prompt, 10);
  })
  

  function CheckInput(inputText,outputText, prompt, limit){
    if(inputText.value.length <= limit){
      outputText.innerHTML = limit - inputText.value.length;
      prompt.innerHTML = 'Осталось символов:';
      outputText.style.color = 'black';
      prompt.style.color = 'black';
    }
    else{
      prompt.innerHTML = '&#10006' + ' Превышено символов:';
      outputText.innerHTML = inputText.value.length - limit;
      outputText.style.color = 'red';
      prompt.style.color = 'red';
    }
  }