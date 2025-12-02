const TetoFront = "../assets/tetoFront.png";
const TetoLeft = "../assets/tetoLeft.png";
const TetoRight = "../assets/tetoRight.png";
const TetoEmote1 = "../assets/tetoEmote1.png";
const TetoImpact = "../assets/tetoImpact.jpeg";
const explosion = new Audio("../assets/explosion.mp3");
const tacoBell = new Audio("../assets/tacoBell.mp3");
const Teto = document.getElementById('Teto')


Teto.addEventListener("click", () => emote("bong"))

function emote(emote) {
    switch (emote) {
        case "bong":
            Teto.src = TetoEmote1;
            tacoBell.play();
            setTimeout(() => {
                Teto.src = TetoFront;
            }, 200);
            break;
        case "fall":
            let interval;
            window.electron.onWindowPosition((data) => {
                if (data.hitBottom && interval) {
                    clearInterval(interval);
                    Teto.src = TetoImpact;
                    explosion.play();
                    setTimeout(() => {
                        Teto.src = TetoFront;
                    }, 2000);
                }
            })
            interval = setInterval(() => {
                window.electron.moveWindow(0, 5)
                window.electron.resetSize()
            }, 10);
            break;
    }
}