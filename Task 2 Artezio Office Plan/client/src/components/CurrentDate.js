export function GetCurrentDate(date){
  var year = date.slice(0,4)
  var day = date.slice(8,10)
  var monthNum = date.slice(5,7)
  var month = ''
  switch(monthNum){
    case '01':
      month = 'January'
      break;
    case '02':
      month = 'February'
      break;
    case '03':
      month = 'March'
      break;
    case '04':
      month = 'April '
      break;
    case '05':
      month = 'March'
      break;
    case '06':
      month = 'June'
      break;
    case '07':
      month = 'July'
      break;
    case '08':
      month = 'August'
      break;
    case '09':
      month = 'September'
      break;
    case '10':
      month = 'October'
      break;
    case '11':
      month = 'November'
      break;
    case '12':
      month = 'December'
      break;
  }
  const resultDate = [month, day, year, monthNum]
  return resultDate
}