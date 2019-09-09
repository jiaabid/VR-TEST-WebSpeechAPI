window.onload = ()=>{

document.getElementById("restart").addEventListener('click',()=>{
    location.reload()
})
//example questions
const questions = [
    {
        question: 'Which planet did superman came from?',
        option: ['Jupiter','Krypton','Mars','Neptune'],
        answer: 'Krypton'
    },
    {
        question: 'How did Dr Strange defeat Dormammu?',
        option: ['Built An Energy Prison','Created a timeloop','Froze time','none'],
        answer: 'Created a timeloop'
    },
    {
        question: 'How is Thanos combining the infinity stones?',
        option: ['Glove of power','Infinity glove','Gauntlet of power','Infinity Gauntlet'],
        answer: 'Infinity Gauntlet'
    },
    {
        question: 'Which marvel hero is capable of holding a stone?',
        option: ['Peter Quill','Black Panther','Gamora','Dr strange'],
        answer: 'Peter Quill'
    }
]



//when to recognize the speech
document.addEventListener('keypress',()=>{
    recognition.start()
})

    const grammer = 'JSGF V1.0';
    //webkit one for chrome and other for firefox (others dont support this api)
    const speechRecognition = webkitSpeechRecognition || SpeechRecognition   
    const grammerList = webkitSpeechGrammarList || SpeechGrammarList  
    const recognition = new speechRecognition()
    const speechList = new grammerList()
    //addFromString method will take the domstring and weight defines the accuracy
    speechList.addFromString(grammer,1) 
    recognition.grammars = speechList
    var val = []
    var correct = []
    //on recognizing the voice check the correct answer

    recognition.onresult = (e)=>{
      const answer = e.results[0][0].transcript
      //console.log(answer) 
      if(answer.toLowerCase() === 'option one')
      {
          document.querySelector('#option1').checked = true
      }
      else if(answer.toLowerCase() === 'option two' || answer.toLowerCase() === 'option 2')
      {
          document.querySelector('#option2').checked = true
      }
      else if(answer.toLowerCase() === 'option three' || answer.toLowerCase() === 'option 3')
      {
          document.querySelector('#option3').checked = true
      }
      else if(answer.toLowerCase() === 'option four' || answer.toLowerCase() === 'option 4')
      {
          document.querySelector('#option4').checked = true
      }
      else if(answer.toLowerCase() === 'submit')
      {
          
         form()
        
      }
      
      else if(answer.toLowerCase() === 'next')
      {
          
         set()
        
      }
      else if(answer.toLowerCase() === 'result')
      {
          
        const results = result()
        displayResult(results.length)
        
      }
      else if(answer.toLowerCase() === ""){
          alert('say again ,aint recognized')
      }
      else{
          alert(`you said ${answer}, not an option! \nsay again`)
      } 
      
    }
  
function form()
{   
        let values = ""
        const checks = document.querySelectorAll('input[type="checkbox"]')
        //console.log(checks)
        checks.forEach(el => {
            if(el.checked === true)
            {
                console.log(el)
                values += el.value
                
            }
        })
        val.push(values)
        alert('submitted')
        
}
function set(){
 if(questions.length > 0)
 {
     const question = questions.shift()
     const form =  document.querySelector('#form')
     form.innerHTML = ` <p id="question">Q: ${question.question}</p>
     1: <input type="checkbox" value="${question.option[0]}" id="option1">${question.option[0]}<br>
     2: <input type="checkbox" value="${question.option[1]}" id="option2">${question.option[1]}<br>
     3: <input type="checkbox" value="${question.option[2]}" id="option3">${question.option[2]}<br>
     4: <input type="checkbox" value="${question.option[3]}" id="option4">${question.option[3]}<br>
     <input type="submit" class="btn btn-outline-dark mt-3" value="submit">
     <input type="button" class="btn btn-outline-dark mt-3" value="next">`  
     correct.push(question.answer)
     if(questions.length == 0)
     {
       form.innerHTML +=`<input type="button" class="btn btn-outline-dark mt-3" value="Result">`
    //    document.querySelector('input[value=result]').addEventListener('click',()=>{
    //        result()
    //    })
       document.querySelector('input[value=next]').style.display = 'none'
     }
 }
 
}
set()
function result()
{
    var res = []
    for(var i=0 ;i<val.length ;i++)
    {
     if(val[i] == correct[i])
     {
          res.push(val[i])
     }
    }
   // console.log(res)
     return res;
}
function displayResult(length)
{
     const finalResult = (length*100)/val.length
     const div = document.getElementById('result')
     div.innerHTML = `<h2>RESULTS</h2>`
     div.setAttribute('class','container p-3 mt-2 border border-top-0 border-bottom-0 border-dark')
     if(finalResult < 30 )
     {
         div.innerHTML += `<p><b>Need more practise !!</b></p><div class="progress"><div class="progress-bar"  role="progressbar" style="width: ${finalResult}%;" aria-valuenow="${finalResult}" aria-valuemin="0" aria-valuemax="100">${finalResult} %</div></div>`
     }
     else if(finalResult > 30 && finalResult < 50 )
     {
         div.innerHTML += `<p><b>Satisfactory!!</b></p><div class="progress"><div class="progress-bar"  role="progressbar" style="width: ${finalResult}%;" aria-valuenow="${finalResult}" aria-valuemin="0" aria-valuemax="100">${finalResult} %</div></div>`
     }
     else if(finalResult >= 50 && finalResult <75)
     {
         div.innerHTML += `<p><b>Good ,Keep it up!!</b></p><div class="progress"><div class="progress-bar"  role="progressbar" style="width: ${finalResult}%;" aria-valuenow="${finalResult}" aria-valuemin="0" aria-valuemax="100">${finalResult} %</div></div>`
     }
     else if(finalResult >= 75 )
     {
         div.innerHTML += `<p></b>Brilliant,You fuckin genius!!</b></p><div class="progress"><div class="progress-bar"  role="progressbar" style="width: ${finalResult}%;" aria-valuenow="${finalResult}" aria-valuemin="0" aria-valuemax="100">${finalResult} %</div></div>`
     }
}
document.querySelector('#form').addEventListener('submit',form)
document.querySelector('input[value=next]').addEventListener('click',set)

}