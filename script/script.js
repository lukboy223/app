const TetoFront = "../assets/tetoFront.png";
const TetoLeft = "../assets/tetoLeft.png";
const TetoRight = "../assets/tetoRight.png";
const TetoEmote1 = "../assets/tetoEmote1.png";

const Teto = document.getElementById('Teto')
const Hook = document.getElementById('Hook')
const body = document.getElementById('body')
const dragElement = document.querySelector('.dragElement')  // Added

Teto.addEventListener("click", () => emote("1"))

// Changed to mouseenter/mouseleave for better compatibility
Hook.addEventListener("mouseenter", () => {Hook.classList.add('HookActive')})
Hook.addEventListener("mouseleave", () => {Hook.classList.remove('HookActive')})
body.addEventListener("mouseenter", () => {Hook.classList.remove('hidden')})
body.addEventListener("mouseleave", () => {Hook.classList.add('hidden')})

// Add events for dragElement to keep Hook visible
dragElement.addEventListener("mouseenter", () => {Hook.classList.remove('hidden')})
dragElement.addEventListener("mouseleave", () => {Hook.classList.add('hidden')})

function emote(emote){
    switch(emote) {
        case "1":
            Teto.src = TetoEmote1;
            setTimeout(() => {
                Teto.src = TetoFront;
            }, 500);
            console.log("emote")
            break;
    }
}