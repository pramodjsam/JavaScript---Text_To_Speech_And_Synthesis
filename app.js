const synth= window.speechSynthesis;

const textForm=document.querySelector("form");
const textInput=document.querySelector("#text-input");
const voiceSelect=document.querySelector("#voice-select");
const rate=document.querySelector("#rate");
const rateValue=document.querySelector("#rate-value");
const pitch=document.querySelector("#pitch");
const pitchValue=document.querySelector("#pitch-value");
const body=document.querySelector("body")

let voices=[];

function getVoices(){
	voices=synth.getVoices();
	voices.forEach(function(voice){
		const option= document.createElement("option");
		option.innerHTML=`${voice.name} + (${voice.lang})`;
		option.setAttribute("data-lang",voice.lang);
		option.setAttribute("data-name",voice.name)
		voiceSelect.appendChild(option);
	})
}

getVoices();

if(synth.onvoiceschanged !==undefined){
	synth.onvoiceschanged=getVoices;
}

var isFirefox = typeof InstallTrigger !== 'undefined';
var isChrome = !!window.chrome && !!window.chrome.webstore;
if (isFirefox) {
    getVoices();
}
if (isChrome) {
    if (synth.onvoiceschanged !== undefined) {
        synth.onvoiceschanged = getVoices;
    }
}

const speak= ()=>{

	if(synth.speaking){
		console.log("ALready speakding");
		return;
	}
	console.log(textInput.value)
	if(textInput.value!==""){
		body.style.background='#141414 url(./wave.gif)';
		body.style.backgroundRepeat='repeat-x';
		body.style.backgroundSize='100% 100%'
		const speakText=new SpeechSynthesisUtterance(textInput.value);
		speakText.onend= function(e){
			body.style.background='#141414';
			console.log("Done speaking")
		}
		speakText.onerror=function(e){
			console.log("error")
		}
		const selectedVoice= voiceSelect.selectedOptions[0].getAttribute("data-name");
		voices.forEach(function(voice){
			if(voice.name === selectedVoice){
				speakText.voice=voice;
			}
		})
		speakText.rate=rate.value;
		speakText.pitch=pitch.value;
		synth.speak(speakText)
	}

}

textForm.addEventListener('submit',function(e){
	e.preventDefault();
	speak();
	textInput.blur()
})

rate.addEventListener("change",function(){
	rateValue.innerHTML= rate.value
})

pitch.addEventListener("change",function(){
	pitchValue.innerHTML=pitch.value
})

voiceSelect.addEventListener("change",function(){
	speak();
})