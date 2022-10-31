// explore.js

window.addEventListener('DOMContentLoaded', init);

function init() {
  setInterval(image, 500);
  var select = document.querySelector("#voice-select");
  var voices = [];
  speechSynthesis.addEventListener('voiceschanged', () => {
    voices = speechSynthesis.getVoices();
    for(let i=0;i<voices.length;i++){
      const option = document.createElement("option");
      option.textContent = `${voices[i].name} (${voices[i].lang})`;
      option.setAttribute('data-lang', voices[i].lang);
      option.setAttribute('data-name', voices[i].name);
      select.appendChild(option);
    }
  });
  var currentVoice = "";
  select.addEventListener('change', (event) => {
    currentVoice = select.selectedOptions[0].getAttribute('data-name');
  });
  const button = document.querySelector("#explore").querySelector("button");
  button.addEventListener('click', (event) => {
    var textarea = document.querySelector("#explore").querySelector("#text-to-speak");
    let speak = new SpeechSynthesisUtterance(textarea.value);
    for(let i=0;i<voices.length;i++){
      if(voices[i].name==currentVoice)
        speak.voice = voices[i];
    }
    speechSynthesis.speak(speak);
  });
}

function image() {
  let face =  document.querySelector("#explore").querySelector("img");
  if(speechSynthesis.speaking)
    face.src = "assets/images/smiling-open.png";
  else
    face.src = "assets/images/smiling.png";
}