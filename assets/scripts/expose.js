// expose.js

window.addEventListener('DOMContentLoaded', init);

function init() {
  var exposeElement = document.getElementById("expose");
  var img = exposeElement.children[1];
  //console.log(exposeElement.children);
  const selectElement = document.querySelector('#horn-select');
  var aud = exposeElement.children[5];
  var currentHorn = "select";
  const jsConfetti = new JSConfetti({ exposeElement });

  selectElement.addEventListener('change', (event) => {
    currentHorn = event.target.value;
    if(event.target.value == "select")
      img.src="/assets/images/no-image.png";
    else if(event.target.value == "air-horn")
      img.src="/assets/images/air-horn.svg";
    else if(event.target.value == "car-horn")
      img.src="/assets/images/car-horn.svg";
    else if(event.target.value == "party-horn")
      img.src="/assets/images/party-horn.svg";
  });

  const volume = exposeElement.children[3].children[0];
  const volumeImage = exposeElement.children[3].children[1];

  var vol = volume.value/100;

  volume.addEventListener('input',(event)=>{
    vol = volume.value;
    if(vol==0)
      volumeImage.src = "/assets/icons/volume-level-0.svg";
    else if(vol<33)
      volumeImage.src = "/assets/icons/volume-level-1.svg";
    else if(vol<67)
      volumeImage.src = "/assets/icons/volume-level-2.svg";
    else 
      volumeImage.src = "/assets/icons/volume-level-3.svg";
      vol = volume.value/100;
  });

  const button = exposeElement.children[4];

  button.addEventListener('click', (event) => {
    if(currentHorn == "air-horn")
      airHorn(aud,vol);
    else if(currentHorn == "car-horn")
      carHorn(aud,vol);
    else if(currentHorn == "party-horn")
      partyHorn(aud,vol, jsConfetti);
  });

}

function airHorn(aud,vol) {
  aud.src="/assets/audio/air-horn.mp3";
  aud.load();
  aud.volume = vol;

  aud.play();
}

function carHorn(aud,vol) {
  aud.src="/assets/audio/car-horn.mp3";
  aud.load();
  aud.volume = vol;
  aud.play();
}

function partyHorn(aud,vol,jsConfetti) {
  aud.src="/assets/audio/party-horn.mp3";
  aud.load();
  aud.volume = vol;
  aud.play();
  jsConfetti.addConfetti({
    emojis: ['🌈', '⚡️', '💥', '✨', '💫', '🌸'],
 });
}