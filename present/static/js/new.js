// function aziz() {
//     console.log('dajkajs');

//     var r = document.querySelector('.output');
//     // if ('SpeechRecognition' in window){
//     console.log("Inside");

//     var SpeechToText = window.SpeechRecognition || window.webkitSpeechRecognition;
//     var speechrecognizer = new SpeechToText();
//     speechrecognizer.continuous = true;
//     speechrecognizer.interimResults = true;
//     speechrecognizer.start();


//     var result = '';
//     // var transcript = "";
//     speechrecognizer.onresult = function (event) {
//         var resultIndex = event.resultIndex;
//         var transcript = event.results[resultIndex][0].transcript;

//         // console.log("transcripet",transcript);
//         result += transcript

//         console.log("result", result);

//         // this.document.querySelector('.output').textContent = transcript;
//         $('.output').text(result);
//     }

//     // }else{
//     //     console.log("Outside");

//     // }

// // }
// $('.btn-start').click(function(){
//     console.log('started');
//     speech.init();
// })
// $('.btn-stop').click(function(){
//     console.log('ended');
//     speech.stop();
// })

var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition
    var speechrecognizer = new SpeechRecognition();




function initialize(){
    console.log('started');
    // var r = document.querySelector('.output');
    // var SpeechToText = window.SpeechRecognition;
    // var speechrecognizer = new SpeechToText();
    
    speechrecognizer.continuous = true;
    speechrecognizer.interimResults = true;
    speechrecognizer.start();
    var finaltranscript = '';
    speechrecognizer.onresult = function(event){
        var interimResults = '';
        for (i=event.resultIndex; i<event.results.length;i++){
            var transcript = event.results[i][0].transcript;
            // console.log("transcript",transcript);
            
            if(event.results[i].isFinal){
                finaltranscript += transcript;
                var printarr = transcript;
                console.log('inside if',printarr);
                
            }else{
                interimResults += transcript;   
            }
        }

        if(printarr){
        var arr =  printarr.split(" ");
        console.log("arr",arr);
        }
        // r.innerHTML = finaltranscript + interimResults 
    }
    
}

function close1(){
    console.log('ended');
    // var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition
    // var speechrecognizer = new SpeechRecognition();
    speechrecognizer.stop();
}