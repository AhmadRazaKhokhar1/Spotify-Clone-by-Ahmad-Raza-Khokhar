try{ 
    let playList = Array.from(document.getElementsByClassName('songItem')); 
    let gif = document.getElementById('alignGif');
    let speakerBass = document.getElementById('speakerBass');
    let redBass = document.getElementById('redBass');
    let masterPlayBar = Array.from(document.getElementById('masterPlayBar'));
    let progressBar = document.getElementById('progressBar');

    let currentSongIndex = -1;
    // Audio ID's for selecting specific music for distinguishing b/w them
    let audio1 = document.getElementById('1');
    let audio2 = document.getElementById('2');
    let audio3 = document.getElementById('3');
    let audio4 = document.getElementById('4');
    let audio5 = document.getElementById('5');
    let audio6 = document.getElementById('6');
    let audio7 = document.getElementById('7');
    let audio8 = document.getElementById('8');
    let audio9 = document.getElementById('9');
    // setting song info by array method  
     
    let songList =[ 
        {songCover:'./covers/acha sila.jpeg', songName:'Acha Sila | B-Praak', songPath:'./Music/acha sila.mp3', scaleIncrease:1.05}, 
     
        {songCover:'./covers/agar tum sath ho.jpeg', songName:'Agar Tum Sath Ho | Arijit Singh', songPath:'./Music/agar tum sath ho.mp3', scaleIncrease:1.05}, 
     
        {songCover:'./covers/i am a rider.jpeg', songName:'Satisfayia | Imram khan', songPath:"./Music/I'm a rider.mp3", scaleIncrease:1.05}, 
     
        {songCover:'./covers/ijazat.jpeg', songName:'Ijazat | Falak Shabbir', songPath:'./Music/ijazat falak.mp3', scaleIncrease:1.05}, 
     
        {songCover:'./covers/jab bna uska hi bna.jpeg', songName:'Jab Bna Uska Hi Bna', songPath:'./Music/jab bna uska hi bna.mp3', scaleIncrease:1.05}, 
     
        {songCover:'./covers/kahani suno.jpeg', songName:'Kahani 2.0 | Kafi Khalil', songPath:'./Music/kahani suno.mp3', scaleIncrease:1.05}, 
     
        {songCover:'./covers/pasoori.jpeg', songName:'Pasoori | Ali Sethi x Shae Gill', songPath:'./Music/pasoori.mp3', scaleIncrease:1.05}, 
     
        {songCover:'./covers/teri gand me danda de.jpeg', songName:'Teri Gand Me Danda | Super Hit', songPath:'./Music/teri gand me danda.mp3', scaleIncrease:1.05}, 
         
        {songCover:'./covers/vaaste.jpeg', songName:'Vaaste Jaan Bhi Doon', songPath:'./Music/vaaste.mp3', scaleIncrease:1.05}, 
    ]; 
     
  
    playList.forEach((e, i)=>{ 
        e.getElementsByClassName('songCover')[0].src      = songList[i].songCover; 
        e.getElementsByClassName('songName')[0].innerText = songList[i].songName; 
        e.getElementsByClassName('songPath')[0].src = songList[i].songPath;
        
        // Click Listener for individual Audio 
        e.getElementsByClassName('playPause btnImage')[0].addEventListener('click', ()=>{
            if(e.getElementsByClassName('songPath')[0].paused || e.getElementsByClassName('songPath')[0].currentTime<=0){
             e.getElementsByClassName('songPath')[0].play();
             e.getElementsByClassName('playPause btnImage')[0].src = './icons/pause.svg';
             gif.style.opacity = 100;
             gif.style.transition = 'ease all 2s';
             redBass.style.marginTop = '30px';
             speakerBass.style.marginTop = '30px';
             redBass.style.transition = 'ease all 2s';
             speakerBass.style.transition = 'ease all 2s';
             redBass.style.opacity = 100;
             speakerBass.style.opacity = 100;
            } 
            else{
                e.getElementsByClassName('songPath')[0].pause();
                e.getElementsByClassName('btnImage')[0].src = './icons/play.svg';
                gif.style.opacity = 0;
                redBass.style.opacity = 0;
                speakerBass.style.opacity = 0;
                redBass.style.marginTop = '0px';
                speakerBass.style.marginTop = '0px';
            }
            // masterSongName
            let masterSongName = document.querySelector('.masterSongName');
            if (currentSongIndex === i) {
                masterSongName.innerText = songList[i].songName;
            } else {
                masterSongName.innerText = "No Song Selected";
            }
            // ProgressBar update & change also masterSongName
            let audio = e.getElementsByClassName('songPath')[0];

            audio.addEventListener('timeupdate', () => {
              let myProgressBar = (audio.currentTime / audio.duration) * 100;
              progressBar.value = parseInt(myProgressBar);
         });
         progressBar.addEventListener('input', () => {
          audio.currentTime = (progressBar.value * audio.duration) / 100;
          e.querySelector('.masterTimeStamp').innerText = parseInt(audio.currentTime.value);
          document.write(audio.currentTime);
        });
        // masterForward Logic 
        let masterForward = document.getElementById('masterForward');

        masterForward.addEventListener('click', () => {
            if (currentSongIndex >= 0) {
                playList[currentSongIndex].getElementsByClassName('songPath')[0].pause();
                playList[currentSongIndex].getElementsByClassName('playPause btnImage')[0].src = './icons/play.svg';
            }
        
            currentSongIndex++;
        
            if (currentSongIndex >= songList.length) {
                currentSongIndex = 0;
            }
        
            // Pause and reset all audio elements
            playList.forEach(e => {
                let audioElement = e.getElementsByClassName('songPath')[0];
                audioElement.pause();
                audioElement.currentTime = 0;
            });
        
            // Update the audio source, cover, and song name for the new song
            let currentAudioElement = playList[currentSongIndex].getElementsByClassName('songPath')[0];
            currentAudioElement.src = songList[currentSongIndex].songPath;
            currentAudioElement.load(); // Load the new audio source
        
            gif.style.opacity = 100;
            redBass.style.marginTop = '30px';
            speakerBass.style.marginTop = '30px';
            redBass.style.opacity = 100;
            speakerBass.style.opacity = 100;
        
            // Play the new song
            currentAudioElement.play();
        
            playList[currentSongIndex].getElementsByClassName('playPause btnImage')[0].src = './icons/pause.svg';
        });

        // masterBackward logic 
        let masterBackward = document.getElementById('masterBackward');

masterBackward.addEventListener('click', () => {
    if (currentSongIndex >= 0) {
        playList[currentSongIndex].getElementsByClassName('songPath')[0].pause();
        playList[currentSongIndex].getElementsByClassName('playPause btnImage')[0].src = './icons/play.svg';
    }

    currentSongIndex--;

    if (currentSongIndex < 0) {
        currentSongIndex = songList.length - 1;
    }

    playList.forEach(e => {
        let audioElement = e.getElementsByClassName('songPath')[0];
        audioElement.pause();
        audioElement.currentTime = 0;
    });

    let currentAudioElement = playList[currentSongIndex].getElementsByClassName('songPath')[0];
    currentAudioElement.src = songList[currentSongIndex].songPath;
    currentAudioElement.load();

    gif.style.opacity = 100;
    redBass.style.marginTop = '30px';
    speakerBass.style.marginTop = '30px';
    redBass.style.opacity = 100;
    speakerBass.style.opacity = 100;

    currentAudioElement.play();

    playList[currentSongIndex].getElementsByClassName('playPause btnImage')[0].src = './icons/pause.svg';
});

// masterPlay Logic 
let masterPlay = document.getElementById('masterPlay');
let isPlaying = false; // Flag to track if music is playing

masterPlay.addEventListener('click', () => {
    if (currentSongIndex === -1) {
        // If no song is selected, start playing the first song
        currentSongIndex = 0;
        let currentAudioElement = playList[currentSongIndex].getElementsByClassName('songPath')[0];
        currentAudioElement.src = songList[currentSongIndex].songPath;
        currentAudioElement.load();

        gif.style.opacity = 100;
        redBass.style.marginTop = '30px';
        speakerBass.style.marginTop = '30px';
        redBass.style.opacity = 100;
        speakerBass.style.opacity = 100;

        currentAudioElement.play();

        playList[currentSongIndex].getElementsByClassName('playPause btnImage')[0].src = './icons/pause.svg';

        isPlaying = true;
    } else {
        let currentAudioElement = playList[currentSongIndex].getElementsByClassName('songPath')[0];
        if (isPlaying) {
            currentAudioElement.pause();
            masterPlay.src = './icons/play.svg';
            isPlaying = false;
        } else {
            currentAudioElement.play();
            masterPlay.src = './icons/pause.svg';
            isPlaying = true;
        }
    }
});
        });
            //All close 

});
    } 
    catch(err){ 
        console.log(err.message);
    } 