fetch('http://puzzle.mead.io/puzzle').then((response)=>{

    response.json().then((data)=>{
        console.log(data)
    })  // the function inside '.then' runs when the json data has arrived and been parsed.

}) // fetch function(API- client side js) is used to fetch data from the given url and .then is used when a response is received from the given URL.


const weatherForm= document.querySelector('form')
const search = document.querySelector('input')
const messageOne= document.querySelector('#message-1')
const messageTwo= document.querySelector('#message-2')


weatherForm.addEventListener('submit',(e)=>{
    e.preventDefault()

    const location= search.value

    messageOne.textContent='Loading...'   // .textContent is used to set text for the message.
    messageTwo.textContent=''

    fetch('http://localhost:3000/weather?address='+ location).then((response)=>{

    response.json().then(({error,forecast,location})=>{

        if(error)
        {
           return messageOne.textContent="No data found!"

        }

        messageOne.textContent=location
        messageTwo.textContent=forecast

    })

})

})  // an event listener is used to capture information when an even is triggered.



