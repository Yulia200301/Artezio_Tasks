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
