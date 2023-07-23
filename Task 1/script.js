// Task 1
document.querySelector('#inputTextTask-1').addEventListener('input', () => {
  const inputText = document.querySelector('#inputTextTask-1');
  const outputText = document.querySelector('#outputTextTask-1');
  CalcLength(inputText, outputText);
})

// function for Task 1, 2
function CalcLength(inputText, outputText){
  outputText.innerHTML = inputText.value.length;
}

// Task 2
document.querySelector('#inputTextTask-2').addEventListener('input', () => {
  const inputText = document.querySelector('#inputTextTask-2');
  const symbols = document.querySelector('#outputSymTask-2');
  const words = document.querySelector('#outputWordsTask-2');
  const strings = document.querySelector('#outputStringsTask-2');
  CalcLength(inputText,symbols);
  CalcWords(inputText,words);
  CalcStrings(inputText,strings);
})

// function for Task 2
function CalcWords(inputText,outputText){
  var separators = /[ ;!?., '"\n]+/; // + - 1 или более
  const words = inputText.value.split(separators);
  outputText.innerHTML = words.length - 1;
}

// function for Task 2
function CalcStrings(inputText,outputText){
  var separators = /(?!\n$)\n/; // исключает пустую строку или пробелы за строку
  const str = inputText.value.split(separators);
  outputText.innerHTML = str.length;
}

// Task 3

document.querySelector('#inputTextTask-3').addEventListener('input', () => {
  const inputText = document.querySelector('#inputTextTask-3');
  const outputText = document.querySelector('#outputTextTask-3');
  const prompt = document.querySelector('#limitSym-3');
  CheckInput(inputText, outputText, prompt, 10);
})

// function for Task 3, 4
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

// Task 4

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

// Task 5

var offset = 0;
const sliderLine = document.querySelector('.slider-line');
const sliderNext = document.querySelector('.slider-next');
const sliderPrev = document.querySelector('.slider-prev');

sliderNext.addEventListener('click', () =>{
  offset = offset + 150;
  sliderLine.style.left = -offset + 'px';
  sliderPrev.disabled = false;
  if(offset == 450)
  {
    sliderNext.disabled = true;
  }
})

sliderPrev.addEventListener('click', () =>{
  offset = offset - 150;
  sliderLine.style.left = -offset + 'px';
  sliderNext.disabled = false;
  if(offset == 0)
  {
    sliderPrev.disabled = true;
  }
})

// Task 6

// НАЧАЛЬНАЯ ИНИЦИАЛИЗАЦИЯ

var date = new Date();

// поля текущей даты
const dayOutput = document.querySelector('#outputDayTask-6');
const monthOutput = document.querySelector('#outputMonthTask-6');
const yearOutput = document.querySelector('#outputYearTask-6');

// установление текущей даты (день, месяц, год)
dayOutput.innerHTML = date.getDate();
monthOutput.innerHTML = GetNameMonth();
yearOutput.innerHTML = date.getFullYear();

// изменение переменной date, чтобы убрать время
date = new Date(yearOutput.innerHTML, date.getMonth(),dayOutput.innerHTML);

// инициализация select
const selectDays = document.querySelector('#inputDayTask-6');
const selectMonths = document.querySelector('#inputMonthTask-6');
const selectYears = document.querySelector('#inputYearTask-6');

// заполнение selectYears
let i = yearOutput.innerHTML;
while( i >= 1900){
  selectYears.append( new Option(i));
  i--;
}
 
// установка текущего месяца в selectMonths
for(item of selectMonths){
  if(item.value == date.getMonth()){
    item.setAttribute('selected', 'selected');
  }
}

// получение количества дней в месяце
let days = GetLenghtMonth(Number(selectMonths.value));

// заполнение selectDays
SetDays(days);

// установка текущего дня в selectDays
selectDays.value = date.getDate();


// ВЫЧИСЛЕНИЕ РАЗНОСТИ ДАТ ПРИ ИЗМЕНЕНИЯХ В SELECT

// изменение дня
document.querySelector('#inputDayTask-6').addEventListener('change', () =>{
  let flag = CheckDate();
  if(flag == 1){
    document.querySelector('#outputTextTask-6').innerHTML = 'Событие еще не произошло';
    ClearCalc();
  }
  else if(flag == 0){
    document.querySelector('#outputTextTask-6').innerHTML = 'Событие произошло сегодня';
    ClearCalc();
  }
  else{
    result = Difference();

    document.querySelector('#outputTextTask-6').innerHTML = 'Событие произошло';
    document.querySelector('#textAgo').innerHTML = ' назад';

    OutputResult(result);
  }
})

// изменение месяца
document.querySelector('#inputMonthTask-6').addEventListener('change', () =>{
  // получение кол-ва дней в новом месяце
  days = GetLenghtMonth(Number(selectMonths.value));
  // очистка старых значений
  while (selectDays.length > 0){
    selectDays.remove(selectDays.length-1)
  }
  // установка новых
  SetDays(days);
  
  let flag = CheckDate();
  if(flag == 1){
    document.querySelector('#outputTextTask-6').innerHTML = 'Событие еще не произошло';
    ClearCalc();
  }
  else if(flag == 0){
    document.querySelector('#outputTextTask-6').innerHTML = 'Событие произошло сегодня';
    ClearCalc();
  }
  else{
    result = Difference();

    document.querySelector('#outputTextTask-6').innerHTML = 'Событие произошло';
    document.querySelector('#textAgo').innerHTML = ' назад';

    OutputResult(result);
  }
})

// изменение года
document.querySelector('#inputYearTask-6').addEventListener('change', () =>{
  let flag = CheckDate();
  if(flag == 1){
    document.querySelector('#outputTextTask-6').innerHTML = 'Событие еще не произошло';
    ClearCalc();
  }
  else if(flag == 0){
    document.querySelector('#outputTextTask-6').innerHTML = 'Событие произошло сегодня';
    ClearCalc();
  }
  else{
    result = Difference();

    document.querySelector('#outputTextTask-6').innerHTML = 'Событие произошло';
    document.querySelector('#textAgo').innerHTML = ' назад';

    OutputResult(result);
  }
})

// вывод результата разницы
function OutputResult(result){
  if(result[0] != 0){
    let yearText = ValidatorYear(result[0]);
    document.querySelector('#outputCalcYears').innerHTML = result[0] + yearText;
  }
  else{
    document.querySelector('#outputCalcYears').innerHTML = '';
  }
  if(result[1] != 0){
    let monthText = ValidatorMonth(result[1]);
    let andText = '';
    if(result[0] != 0){
      andText = ', ';
    }
    document.querySelector('#outputCalcMonths').innerHTML = andText + result[1] + monthText;
  }
  else{
    document.querySelector('#outputCalcMonths').innerHTML = '';
  }
  if(result[2] != 0){
    let dayText = ValidatorDay(result[2]);
    let andText = '';
    if(result[1] != 0 || result[0] != 0){
      andText = 'и ';
    }
    document.querySelector('#outputCalcDays').innerHTML = andText + result[2] + dayText;
  }
  else{
    document.querySelector('#outputCalcDays').innerHTML = '';
  }
}

// валидация названия 'года'
function ValidatorYear(year){
  if(year == 1 || year == 21 || year == 31){
    return ' год';
  }
  else if((year > 1 && year < 5) || (year > 21 && year < 25)){
    return ' года';
  }
  else{
    return ' лет';
  }
}

// валидация названия 'дня'
function ValidatorDay(day){
  if(day == 1 || day == 21 || day == 31){
    return ' день';
  }
  else if((day > 1 && day < 5) || (day > 21 && day < 25)){
    return ' дня';
  }
  else if((day > 4 && day < 21) || (day > 24 && day < 31)){
    return ' дней';
  }
}

// валидация названия 'месяца'
function ValidatorMonth(month){
  if(month == 1){
    return ' месяц';
  }
  else if(month > 1 && month < 5){
    return ' месяца';
  }
  else{
    return ' месяцев';
  }
}

// расчет разницы
function Difference(){
  let res = [];
  let dateSel = GetSelectedDate();
  let difftime = Math.abs(date.getTime() - dateSel.getTime());
  days = GetLenghtMonth(Number(selectMonths.value));

  let diffYears = Math.floor(difftime / (86400000 * 365));
  res.push(diffYears);

  difftime = Math.abs(difftime - (diffYears * 86400000 * 365));
  
  let diffMonth = Math.floor(difftime / (86400000 * (365/12)));
  res.push(diffMonth);

  difftime = Math.abs(difftime - (diffMonth * 86400000 * (365/12)));
  
  let diffDays = Math.ceil(difftime / 86400000);
  res.push(diffDays);

  return res;
}

// очистка вывода
function ClearCalc(){
  document.querySelector('#outputCalcYears').innerHTML = '';
  document.querySelector('#outputCalcMonths').innerHTML = '';
  document.querySelector('#outputCalcDays').innerHTML = '';
  document.querySelector('#textAgo').innerHTML = '';
}

// проверка даты на изменения()
function CheckDate(){
  let dateSelected = GetSelectedDate();

  if(dateSelected.getTime() > date.getTime()){
    return 1;
  }
  else if(dateSelected.getTime() < date.getTime()){
    return -1;
  }
  else if(dateSelected.getTime() == date.getTime()){
    return 0;
  }
}

// получение даны в select
function GetSelectedDate(){
  let year = selectYears.value;
  let monthNum = selectMonths.value;
  let day = selectDays.value;
  let dateSelected = new Date(year,monthNum,day);
  return dateSelected;
}

// определение названия месяца по текущей дате
function GetNameMonth(){
  switch(date.getMonth()){
    case 0:
      return 'января';
    case 1:
      return 'февраля';
    case 2:
      return 'марта';
    case 3:
      return 'апреля';
    case 4:
      return 'мая';
    case 5:
      return 'июня';
    case 6:
      return 'июля';
    case 7:
      return 'августа';
    case 8:
      return 'сентября';
    case 9:
      return 'октября';
    case 10:
      return 'ноября';
    case 11:
      return 'декабря';
  }
}

// получение количества дней в месяце
function GetLenghtMonth(month){
  switch(month){
    case 0:
      return 31;
    case 1:
      return 28;
    case 2:
      return 31;  
    case 3:
      return 30;
    case 4:
      return 31;
    case 5:
      return 30;
    case 6:
      return 31;
    case 7:
      return 31;
    case 8:
      return 30;
    case 9:
      return 31;
    case 10:
      return 30;
    case 11:
      return 31;
  }
}

// установка кол-ва дней в select
function SetDays(days){
  let i = days;
  while (i > 0){
  selectDays.append( new Option(i));
  i--;
  }
}


// Task 7

var canvas = document.getElementById('canvasTask-7');
canvas.width = 500;
canvas.height = 250;

var ctx = canvas.getContext('2d');

var widthRect = 100;
var heightRect = 100;
var fillColor = 'white';
var flagActive = false;

DrawRectangle(1, false, fillColor);

function DrawRectangle( borderWidth, borderRadius, fillColor) {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  ctx.lineWidth = borderWidth;
  ctx.strokeStyle = '#000';

  if (borderRadius) {
    ctx.lineJoin = 'round';
  }

  if (fillColor) {
    ctx.fillStyle = fillColor;
  }

  ctx.beginPath();
  ctx.rect(GetCenterX(widthRect), GetCenterY(heightRect), widthRect, heightRect);

  if (fillColor) {
    ctx.fill();
  }

  ctx.stroke();
  ctx.closePath();
}

function GetCenterX(width){
  let x = canvas.width/2 - width/2;
  return x;
}

function GetCenterY(height){
  let y = canvas.height/2 - height/2;
  return y;
}

document.querySelector('#canvasTask-7').addEventListener('click', () =>{
  flagActive = true;
  DrawRectangle(3,true, fillColor);
});

document.onkeydown = function(e){
  if(flagActive){
    if(e.key == 'ArrowUp' && heightRect < 180){
      heightRect +=10;
    }
    else if(e.key == 'ArrowDown' && heightRect > 50){
      heightRect -=10;
    }
    else if(e.key == 'ArrowLeft' && widthRect > 50){
      widthRect -=10;
    }
    else if(e.key == 'ArrowRight' && widthRect < 320){
      widthRect +=10;
    }
    switch(e.key){
      case '0':
        fillColor = '#ffffff';
        break;
      case '1':
        fillColor = '#e74949';
        break;
      case '2':
        fillColor = '#50cb45';
        break;
      case '3':
        fillColor = '#e19743';
        break;
      case '4':
        fillColor = '#eb82f7';
        break;
      case '5':
        fillColor = '#f2f044';
        break;
      case '6':
        fillColor = '#6c6af2';
        break;
      case '7':
        fillColor = '#ffb5e5';
        break;
      case '8':
        fillColor = '#cbffb5';
        break;
      case '9':
        fillColor = '#83f4c9';
        break;
      default:
        break;  
    }
    DrawRectangle(3,true, fillColor);
  }
};

// сброс фокуса canvas
document.addEventListener('click', function(event) {
  // был ли клик выполнен вне canvas
  if (!canvas.contains(event.target)) {
    DrawRectangle(1,false, fillColor);
    flagActive = false;
  }
});