const input = document.querySelector('[data-input]');
const searchBtn = document.querySelector('[data-search]');
const resultsContainer = document.getElementById('results');

const movieCheckbox = document.querySelector('[data-movie-checkbox]');
const tvCheckbox = document.querySelector('[data-tv-checkbox]');

const API_KEY = '469vh9ZIpXnNbLdTR0yzFVwKCzFIHExEutPqM5yT';

const options = {
  method: 'GET',
};

let search = '';

searchBtn.addEventListener('click', (e) => {
  e.preventDefault();

  // Clean previous results
  clearResults();

  // Searching movie/series
  if (input.value.length > 0) {
    search = input.value.replace(/ /g, '%20');

    // Get TMDB ID
    let url = `https://api.watchmode.com/v1/search/?apiKey=${API_KEY}&search_field=name&search_value=${search}`;
    let results = [];

    if (movieCheckbox.checked) {
      fetch(url, { method: 'Get' })
        .then((res) => res.json())
        .then((json) => {
          results = json.title_results;
          results.forEach((title) => {
            // Get where to watch
            fetch(
              `https://api.themoviedb.org/3/movie/${title.imdb_id}/watch/providers?api_key=110bb98a209c2c9716c472819fe63e72`,
              options
            )
              .then((response) => response.json())
              .then((response) => {
                // Append results
                const result = document.createElement('div');
                result.classList.add('result');
                result.innerHTML = `<span class='search'>${title.name}</span> is on ${response.results.AR.flatrate[0].provider_name}.`;
                resultsContainer.append(result);
              })
              .catch((err) => console.error(err));
          });
        });
    }

    if (tvCheckbox.checked) {
      fetch(url, { method: 'Get' })
        .then((res) => res.json())
        .then((json) => {
          results = json.title_results;
          results.forEach((title) => {
            // Get where to watch
            fetch(
              `https://api.themoviedb.org/3/tv/${title.tmdb_id}/watch/providers?api_key=110bb98a209c2c9716c472819fe63e72`,
              options
            )
              .then((response) => response.json())
              .then((response) => {
                // Append results
                const result = document.createElement('div');
                result.classList.add('result');
                result.innerHTML = `<span class='search'>${title.name}</span> is on ${response.results.AR.flatrate[0].provider_name}.`;
                resultsContainer.append(result);
              })
              .catch((err) => console.error(err));
          });
        });
    }
  } else {
    // Error on input
    const result = document.createElement('div');
    result.textContent = "There's an error on your input.";
    result.classList.add('result');
    resultsContainer.append(result);
  }
});

const clearResults = () => {
  let resultsDivs = resultsContainer.children;
  for (let i = 0; i < 5; i++) {
    for (let item of resultsDivs) {
      item.remove();
    }
  }
};
