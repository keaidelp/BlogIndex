// var path = document.querySelector(".path2");
// var l = path.getTotalLength();
// console.log( l );

$('.wrapper1 svg').clone().appendTo('.wrapper2');
$('.wrapper2 svg').clone().appendTo('.wrapper3');

var jingle = $('body').find('h1').html();

function cracklamps(str){
  var arr = str.split("");
  for(var i=0; i<arr.length; i++) {
    arr[i] = "<span>" + arr[i] + "</span>"; 
  }
  return arr.join('');
}

var old = $('#happy').html();
$('#happy').html( cracklamps( old ) );



