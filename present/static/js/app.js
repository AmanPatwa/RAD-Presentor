var result = "";

class SpeechRecog{
        constructor(options){
            const SpeechToText  = window.SpeechRecognition || window.webkitSpeechRecognition;
            this.speechApi = new SpeechToText();
            this.output = options.output ? options.ouput : document.createElement("div");
            this.speechApi.continuous = true;
            this.speechApi.interimResults = false;
            // this.speechApi.addEventListener('audioend' , ()=>{
            //     console.log("Inside audioEnd");
                
            //     // var resultIndex = event.resultIndex;
            //     // var transcript =  event.results[resultIndex][0].transcript;
            //     // console.log("tr",transcript);
                
            // })
            // this.speechApi.addEventListener('audioend', function() { 
            //     console.log('Audio capturing ended');
            //   });
            // this.speechApi.onaudioend = true;
            this.speechApi.onresult = (event)=>{
                    var resultIndex = event.resultIndex;
                    var transcript =  event.results[resultIndex][0].transcript;
                    console.log('transcript',transcript);
                    // console.log("transcripet",transcript);
                    result += transcript

                    console.log("result",result);
                    
                    // this.document.querySelector('.output').textContent = transcript;
                    $('.output').text(result);
                    
            }
        }
        init() {
            console.log('started');
            this.speechApi.start();
        }
        stop() {
            console.log('ended');
            this.speechApi.stop();
        
        }

}


window.onload = function(){
    var speech = new SpeechRecog({
        output:  document.querySelector('.output') 

    })
    // speech.speechApi.addEventListener('audioend', function() { 
    //     console.log('Audio capturing ended');
    //   });
    $('.btn-start').click(function(){
        console.log('started');
        speech.init();
    })
    $('.btn-stop').click(function(){
        console.log('ended');
        speech.stop();
    })
    // this.document.querySelector('.btn-start').addEventListener('click',() => {
    //     console.log('started');
    //     speech.init();
    // })
    // this.document.querySelector('.btn-stop').addEventListener('click',()=>{
    //     console.log('ended');
    //     speech.stop();
    // })
}

// try {
//     var SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
//     var recognition = new SpeechRecognition();
// }
// catch (e) {
//     console.error(e);
//     $('.no-browser-support').show();
//     $('.app').hide();
// }

// recognition.onstart = function () {
//     instructions.text('Voice recognition activated. Try speaking into the microphone.');
// }

// recognition.onspeechend = function () {
//     instructions.text('You were quiet for a while so voice recognition turned itself off.');
// }

// recognition.onerror = function (event) {
//     if (event.error == 'no-speech') {
//         instructions.text('No speech was detected. Try again.');
//     };
// }

// recognition.onresult = function (event) {

//     // event is a SpeechRecognitionEvent object.
//     // It holds all the lines we have captured so far. 
//     // We only need the current one.
//     var current = event.resultIndex;

//     // Get a transcript of what was said.
//     var transcript = event.results[current][0].transcript;

//     // Add the current transcript to the contents of our Note.
//     noteContent += transcript;
//     noteTextarea.val(noteContent);
// }   