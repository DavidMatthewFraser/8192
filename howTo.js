/***********************************************
Animate an example of game play
************************************************/

document.addEventListener('DOMContentLoaded', () => {
    setInterval(change_image, 2000);
})

function change_image() {
       
   var url = document.getElementById('change_image').src;

   if (url.match('images/board0.jpg') !== null) {
       document.getElementById('change_image').src = 'images/board1.jpg';
       document.getElementById('animation_explanation').innerHTML="Slide Up";
   } else if (url.match('images/board1.jpg') !== null){
       document.getElementById('change_image').src = 'images/board2.jpg';
       document.getElementById('animation_explanation').innerHTML="Slide Left";
   } else if (url.match('images/board2.jpg') !== null){
       document.getElementById('change_image').src = 'images/board3.jpg';
       document.getElementById('animation_explanation').innerHTML="Slide Down";
   } else if (url.match('images/board3.jpg') !== null){
       document.getElementById('change_image').src = 'images/board4.jpg';
       document.getElementById('animation_explanation').innerHTML="Slide Up";
   } else if (url.match('images/board4.jpg') !== null){
        document.getElementById('change_image').src = 'images/board5.jpg';
        document.getElementById('animation_explanation').innerHTML="Slide Right";
   } else {
       document.getElementById('change_image').src = 'images/board0.jpg';
       document.getElementById('animation_explanation').innerHTML="Start";
   } 
}
