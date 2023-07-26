document.querySelector('#inputTextTask-4').addEventListener('input', () => {
    const inputText = document.querySelector('#inputTextTask-4');
    const outputText = document.querySelector('#outputTextTask-4');
    const prompt = document.querySelector('#limitSym-4');
    const check = document.querySelector('#check-4');
    if(check.checked == true){
      inputText.setAttribute('maxlength', '20');
    }
    else{
      inputText.removeAttribute('maxlength');
    }
    CheckInput(inputText, outputText, prompt, 20);
  })
  