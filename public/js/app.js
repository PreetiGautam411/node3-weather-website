// console.log('Client side js is loaded');



const weatherForm=document.querySelector('form');
const search= document.querySelector('input');
const messageOne= document.querySelector('#msg-1');
const messageTwo= document.querySelector('#msg-2');
// messageOne.textContent='From js'


weatherForm.addEventListener('submit',(e)=>{
    e.preventDefault();

    const location = search.value;
    
    messageOne.textContent='loading...';
    messageTwo.textContent='';

    fetch('/weather?address='+location).then((response)=>{
        response.json().then((data)=>{
            if(data.error){
                messageOne.textContent=data.error;
            }else{
                messageOne.textContent=data.location;
                messageTwo.textContent =data.forecast;
    
            }
        })
    })
})