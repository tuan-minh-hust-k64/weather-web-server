

const message_1 = document.querySelector('#message-1');
const message_2 = document.querySelector('#message-2');
const form = document.querySelector('form');
const input = document.querySelector('input');
form.addEventListener('submit', function(event) {
    event.preventDefault();
    message_2.textContent='';
    message_1.textContent='Loading...';
    fetch('/weather?address='+input.value)
    .then(function (response) {
        return response.json();
    })
    .then(function (data){
        if(data.error){
            message_2.textContent=data.error;
        }else{
            message_1.textContent='today\'s average temperature is '+data.temperature + ', wind speed:'+data.wind_speed;
        }
    })
})