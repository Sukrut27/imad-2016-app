console.log('Loaded!');

// for new Value printing
var element = document.getElementById('main.text');

element.innerHTML = 'Sukrut\'s Webapp';

//for moving picture
var img = document.getElementById('madi');
var marginLeft = 0;
function moveRight() {
    marginLeft = marginLeft + 1;
    img.style.marginLeft = marginLeft + 'px';
}
img.onclick = function(){
    var interval = setInterval(moveRight, 50);
};
