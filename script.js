const searchInput = document.getElementById('search-input');
const resultArtist = document.getElementById("result-artist");
const resultPlaylist = document.getElementById('result-playlists');
const gridContainer = document.querySelector('.grid-container');

function requestApi(searchTerm) {
    const url = `http://localhost:3000/artists?name_like=${searchTerm}`;
    fetch(url)
        .then((response) => response.json())
        .then((result) => displayResults(result, searchTerm))
        .catch(() => displayNoResults());
}

function displayResults(result, searchTerm) {
    resultPlaylist.classList.add("hidden");
    gridContainer.innerHTML = ''; // Limpa os resultados anteriores    

    const filteredArtists = result.filter(artist => artist.name.toLowerCase().includes(searchTerm));

    if (filteredArtists.length === 0) {
        displayNoResults();
        return;
    }

    filteredArtists.forEach(artist => {    
        const artistCard = document.createElement('div');
        artistCard.classList.add('artist-card');

        artistCard.innerHTML = `
            <div class="card-img">
                <img class="artist-img" src="${artist.urlImg}" />
                <div class="play">
                    <span class="fa fa-solid fa-play"></span>
                </div>
            </div>
            <div class="card-text">              
                <span class="artist-name">${artist.name}</span>
                <span class="artist-categorie">Artista</span>
            </div>
        `;
        gridContainer.appendChild(artistCard);
    });

    resultArtist.classList.remove('hidden');
}

function displayNoResults() {
    gridContainer.innerHTML = 
    ` 
    <div class="no-results">
        <div class="no-results__content-title">
            <h1 class="no-results__title">Oops!</h1>
            <div class="circle">
                <span class="fa-solid fa-x"></span>
            </div>
        </div>
        <p class="no-results__subtitle">Não achamos nenhum artista com esse nome.</p>
    </div>
    `;
    resultArtist.classList.remove('hidden');
    resultPlaylist.classList.add('hidden');
}

document.addEventListener('input', function () {
    const searchTerm = searchInput.value.toLowerCase().trim();

    if (searchTerm === '') {
        resultPlaylist.classList.remove('hidden');
        resultArtist.classList.add('hidden');
        gridContainer.innerHTML = ''; // Limpa os resultados ao apagar o input
        return;
    }

    requestApi(searchTerm);
});
