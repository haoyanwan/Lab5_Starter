window.addEventListener("DOMContentLoaded", setupSpeechSystem);

function setupSpeechSystem() {
 const textArea = document.querySelector("textarea");
 const avatarImage = document.querySelector("#explore img");
 const speechEngine = window.speechSynthesis;
 const speakButton = document.querySelector("button");
 const voiceDropdown = document.getElementById("voice-select");
 
 let availableVoices = [];
 
 function loadVoicesIntoDropdown() {
   availableVoices = speechEngine.getVoices();
   availableVoices.forEach((voiceOption) => {
     const listItem = document.createElement("option");
     listItem.textContent = `${voiceOption.name} (${voiceOption.lang})`;
     listItem.setAttribute("data-name", voiceOption.name);
     voiceDropdown.appendChild(listItem);
   });
 }
 
 if (speechEngine.onvoiceschanged !== undefined) {
   speechEngine.onvoiceschanged = loadVoicesIntoDropdown;
 }
 
 loadVoicesIntoDropdown();
 
 speakButton.addEventListener("click", () => {
   const inputContent = textArea.value;
   const chosenVoice = voiceDropdown.selectedOptions[0].getAttribute("data-name");
   
   if (!inputContent || voiceDropdown.selectedOptions[0].disabled) {
     return;
   }
   
   const speechRequest = new SpeechSynthesisUtterance(inputContent);
   
   availableVoices.forEach((voiceOption) => {
     if (voiceOption.name === chosenVoice) {
       speechRequest.voice = voiceOption;
     }
   });
   
   avatarImage.src = "assets/images/smiling-open.png";
   
   speechRequest.onend = () => {
     avatarImage.src = "assets/images/smiling.png";
   };
   
   speechEngine.speak(speechRequest);
 });
}