
async function getsongs() {

    
    let a = await fetch(`http://127.0.0.1:5500/artists/`);
    let response = await a.text();
    //console.log(response);//

    let div = document.createElement("div");
    div.innerHTML = response; // This line is needed to parse the HTML response

    let as = div.getElementsByTagName("a");

    
    for (let i = 0; i < as.length; i++) { // Added 'let' for the variable i
        if (as[i].href.endsWith("mp3")) { // Ensure the condition checks for ".mp3"
            songs.push(as[i].href);
        }
    }

    return songs;
}

async function main() {
    let songs = await getsongs();
    console.log(songs);

    if (songs.length > 0) { // Ensure there is at least one song before playing
        var audio = new Audio(songs[2]);
        audio.play().catch(error => {
            console.error('Error playing audio:', error); // Handle potential play() error
        });

        audio.addEventListener("loadeddata", () => {
            let duration = audio.duration;
            console.log(duration);
        });
    } else {
        console.log("No songs found.");
    }

    // script.js

    

}



// main();

// script.js



console.log('hi');
console.log(document.querySelectorAll('.cards'));
let currentsong= new Audio();


document.addEventListener('DOMContentLoaded', () => {
    const cards = document.querySelectorAll('.cards');
    const sidebar = document.getElementById('sidebar');
    const closeButton = document.getElementById('closeSidebar');
    const songsList = document.querySelector('.songs-list');
    const audioPlayer = document.getElementById('audioPlayer');

    cards.forEach(card => {
        card.addEventListener('click', async () => {
            console.log('Card clicked');
            
            
            const artistId = card.getAttribute('data-artist-id');
            console.log(`Artist ID: ${artistId}`);
            
            
            const songs = await fetchSongs(artistId);
            console.log(`Fetched songs:` ,songs);
            
            displaySongs(songs);

            sidebar.classList.add('show');
        });

    });

    closeButton.addEventListener('click', () => {
            console.log('Close button clicked');
            sidebar.classList.remove('show');
            console.log('Sidebar class removed');

    });

    

    const fetchSongs = async (artistId) => {
        try {
            let response = await fetch(`http://127.0.0.1:5500/artists/${artistId}`);
            let textResponse = await response.text();
            
            let div = document.createElement('div');
            div.innerHTML = textResponse;

            let as = div.getElementsByTagName('a');
            let songs = [];

            for (let i = 0; i < as.length; i++) {
                if (as[i].href.endsWith("mp3")) {
                    songs.push(as[i].href);
                }
            }
            return songs;
        } catch (error) {
            console.error('Error fetching songs:', error);
            return [];
        }

        

        
    };

    const displaySongs = (songs) => {
        songsList.innerHTML = ''; // Clear previous songs
        songs.forEach(song => {
            const listItem = document.createElement('li');
            listItem.classList.add('song-item');
    
            const songUrl = song; // Assuming song URL is provided
            const songName = decodeURIComponent(song.split('/').pop().replaceAll('%20', ' '));
            const artistName = decodeURIComponent(song.split('/').pop().split('-')[1]?.replaceAll('%20', ' '));
    
            listItem.innerHTML = `
                <div class="song-info">
                    <span class="song-name">${songName}</span>
                    <span class="artist-name">${artistName}</span>
                </div>
            `;
            listItem.setAttribute('data-song-url', songUrl);
            listItem.addEventListener('click', () => {
                playSong(listItem.getAttribute('data-song-url'));
            });
            songsList.appendChild(listItem);
            
    
            listItem.addEventListener("click", element=>{
                console.log(listItem.querySelector(".song-info").firstElementChild.innerHTML.trim());
                let name=listItem.querySelector(".song-info").firstElementChild.innerHTML.trim();
                playSong(listItem.querySelector(".song-info").firstElementChild.innerHTML.trim());
            })

        });
        
        
    };
    

    play.addEventListener("click",()=>{
        if(currentsong.paused){
            currentsong.play();
            play.src="pause.svg"
            
            
            document.querySelector(".songduration").innerHTML="00:00 / 00:00";
            document.querySelector(".songinfo").innerHTML=k;
            
        }

        else{
            document.querySelector(".songduration").innerHTML="00:00 / 00:00";
            currentsong.pause();
            play.src="play.svg"
            
        }
    })    


    const playSong = (track, songName) => {
        currentsong.src = track;
        currentsong.play();
        playButton.src = "pause.svg";
        document.querySelector(".songinfo").innerHTML = songName;
    };
    




});






