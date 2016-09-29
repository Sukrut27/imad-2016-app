/*console.log('Loaded!');

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
};*/

// Counter code
var button = document.getElementById('counter');
button.onclick = function(){
    // Create a req object
    var request = new XMLHttpRequest();
    
    // Capture the response & storeit in variable
    request.onreadystatechange = function () {
        if(request.readyState === XMLHttpRequest.Done){
            if(request.status === 200){
                var counter = request.responseText;
                var span = document.getElementById('count');
                span.innerHTML = counter.toString();
            }
        }
    };
    request.open('GET','http://sukrut27.imad.hasura-app.io/counter', true);
    request.send(null);
};

// Submit name
var nameInput = document.getElementById('name');
var name = nameInput.value;
var submit = document.getElementById('submit_btn');
submit.onclick = function() {
    var names = ['name1','name2','name3','name4'];
    var list ='';
    fot(var i=0; i< names.length; i++) {
        list =='<li>' + name[i] + '</li>';
}
var ul = document.getElementById('namelist');
ul.innerHTML = list;
}
