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
