window.addEventListener("DOMContentLoaded", setupApp);

function setupApp() {
  const audioElement = document.querySelector("#expose audio");
  const confettiSystem = new JSConfetti();
  const soundButton = document.querySelector("button");
  const hornDropdown = document.getElementById("horn-select");
  const volumeControl = document.getElementById("volume");
  const imageElement = document.querySelector("#expose img");
  const volumeDisplay = document.querySelector("#volume-controls img");

  soundButton.addEventListener("click", () => {
    audioElement.play();
    if (hornDropdown.value == "party-horn") {
      confettiSystem.addConfetti();
    }
  });
  
  volumeControl.addEventListener("input", () => {
    const level = volumeControl.value;
    audioElement.volume = level / 100;

    if (level < 33 && level > 0) {
      volumeDisplay.src = "assets/icons/volume-level-1.svg";
      volumeDisplay.alt = "volume level 1";
    } else if (level >= 67) {
      volumeDisplay.src = "assets/icons/volume-level-3.svg";
      volumeDisplay.alt = "volume level 3";
    } else if (level == 0) {
      volumeDisplay.src = "assets/icons/volume-level-0.svg";
      volumeDisplay.alt = "volume level 0";
    } else {
      volumeDisplay.src = "assets/icons/volume-level-2.svg";
      volumeDisplay.alt = "volume level 2";
    }
  });

  hornDropdown.addEventListener("change", () => {
    const selectedHorn = hornDropdown.value;
    imageElement.src = `assets/images/${selectedHorn}.svg`;
    audioElement.src = `assets/audio/${selectedHorn}.mp3`;
  });
}