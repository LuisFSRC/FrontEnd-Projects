document.body.addEventListener('keyup', (event) => {
    playSound(event.code.toLowerCase());
});

document.body.addEventListener('touchstart', (event) => {
    playSound(event.code.toLowerCase());
});

document.querySelector('button').addEventListener('click', () => {
    let song = document.querySelector('#input').value;
    if (song !== '') {
        let songArray = song.split('')
        songComposition(songArray);
    }
    console.log(song);
});

function playSound(sound) {
    let audioElement = document.querySelector(`#s_${sound}`);
    let keyAudio = document.querySelector(`div[data-key="${sound}"]`);
    if (audioElement) {
        audioElement.currentTime = 0;
        audioElement.play();
    }

    if (keyAudio) {
        keyAudio.classList.add ('active');
        setTimeout(() => {
            keyAudio.classList.remove ('active')
        }, 250);
    }
}

function songComposition(songArray) {
    let wait = 0;
    for (let song of songArray) {
        setTimeout(() => {
            playSound(`key${song.toLowerCase()}`)
        }, wait)
        wait += 250
    }
}