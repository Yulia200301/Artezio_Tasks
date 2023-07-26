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