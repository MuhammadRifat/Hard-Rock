const searchSong = () => {
    const songName = document.getElementById('search-box').value;
    const url = `https://api.lyrics.ovh/suggest/${songName}`;
    fetch(url)
    .then(response => response.json())
    .then(data => displaySong(data.data));
}

const displaySong = songArray => {
    const containerDiv = document.getElementById('song-container');
    containerDiv.innerText = "";
    document.getElementById('lyrics').innerText = "";
    songArray.forEach(song => {
        const songDiv = document.createElement('div');
        songDiv.className = 'single-result row align-items-center my-3 p-3';
        songDiv.innerHTML = `
            <div class="col-md-9">
                <h3 class="lyrics-name">${song.title}</h3>
                <p class="author lead">Album by <span>${song.artist.name}</span></p>
                <audio controls>
                    <source src="${song.preview}" type="audio/mpeg">
                </audio> 
            </div>
            <div class="col-md-3 text-md-right text-center">
                <button onclick="getLyrics('${song.artist.name}', '${song.title}')" class="btn btn-success">Get Lyrics</button>
            </div>
        `;
        containerDiv.appendChild(songDiv);
    });
}

const getLyrics = (artist, title) => {
    fetch(`https://api.lyrics.ovh/v1/${artist}/${title}`)
    .then(response => response.json())
    .then(data => displayLyrics(data.lyrics));
}

const displayLyrics = lyrics => {
    document.getElementById('lyrics').innerText = lyrics;
    console.log(lyrics);

}