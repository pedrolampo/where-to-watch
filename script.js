const input = document.querySelector('[data-input]');
const searchBtn = document.querySelector('[data-search]');
const resultsContainer = document.getElementById('results');

const countries = document.querySelectorAll('input[type="radio"]');
const movieCheckbox = document.querySelector('[data-movie-checkbox]');
const tvCheckbox = document.querySelector('[data-tv-checkbox]');

const menu = document.querySelector('.menu');
const overlay = document.querySelector('.overlay');
const burgerMenuBtn = document.querySelector('.burger-menu');
const closeBurgerMenuBtn = document.querySelector('.close-menu');

const API_KEY = '469vh9ZIpXnNbLdTR0yzFVwKCzFIHExEutPqM5yT';
const API_KEY2 = '9OybJMTkuPIOJrvhl5qnQAPXM0W588LVWNSKeG40';

const options = { method: 'GET' };

let search = '';

let country = localStorage.getItem('whereWatchCountry');

searchBtn.addEventListener('click', (e) => {
  e.preventDefault();

  // Clean previous results
  clearResults();

  // Search the movie/tv-series
  if (input.value.length > 0) {
    search = input.value.replace(/ /g, '%20');

    // Get the requested movie/tv-series ID
    let url = `https://api.watchmode.com/v1/search/?apiKey=${API_KEY2}&search_field=name&search_value=${search}`;
    let results = [];

    // Search for Movies
    if (movieCheckbox.checked) {
      fetch(url, { method: 'Get' })
        .then((res) => res.json())
        .then((json) => {
          results = json.title_results;

          // If nothing is found return this
          if (!results.length) {
            const result = document.createElement('div');
            result.innerHTML = `We couldn't find <span class="search">${input.value}</span>.`;
            result.classList.add('result');
            resultsContainer.append(result);
            return;
          }

          results.forEach((title) => {
            // Get where to watch
            fetch(
              `https://api.themoviedb.org/3/movie/${title.imdb_id}/watch/providers?api_key=110bb98a209c2c9716c472819fe63e72`,
              options
            )
              .then((response) => response.json())
              .then((response) => {
                let movie = response.results[country].flatrate;

                // Append results based on how many there are
                switch (movie.length) {
                  case 1:
                    const result = document.createElement('div');
                    result.classList.add('result');
                    result.innerHTML = `<span class='search'>${
                      title.name
                    }</span> is on <span class="${providerColor(
                      movie[0].provider_name
                    )}">${movie[0].provider_name}</span>.`;
                    resultsContainer.append(result);
                    break;

                  case 2:
                    const result2 = document.createElement('div');
                    result2.classList.add('result');
                    result2.innerHTML = `<span class='search'>${
                      title.name
                    }</span> is on <span class="${providerColor(
                      movie[0].provider_name
                    )}">${
                      movie[0].provider_name
                    }</span> and <span class="${providerColor(
                      movie[1].provider_name
                    )}">${movie[1].provider_name}</span>.`;
                    resultsContainer.append(result2);
                    break;

                  case 3:
                    const result3 = document.createElement('div');
                    result3.classList.add('result');
                    result3.innerHTML = `<span class='search'>${
                      title.name
                    }</span> is on <span class="${providerColor(
                      movie[0].provider_name
                    )}">${
                      movie[0].provider_name
                    }</span>, <span class="${providerColor(
                      movie[1].provider_name
                    )}">${
                      movie[1].provider_name
                    }</span> and <span class="${providerColor(
                      movie[2].provider_name
                    )}">${movie[2].provider_name}</span>.`;
                    resultsContainer.append(result3);
                    break;
                }
              })
              .catch((err) => console.error(err));
          });
        });
    }

    // Search for TV Series
    if (tvCheckbox.checked) {
      fetch(url, { method: 'Get' })
        .then((res) => res.json())
        .then((json) => {
          results = json.title_results;

          // If nothing is found return this
          if (!results.length) {
            const result = document.createElement('div');
            result.innerHTML = `We couldn't find <span class="search">${input.value}</span>.`;
            result.classList.add('result');
            resultsContainer.append(result);
            return;
          }

          results.forEach((title) => {
            // Get where to watch
            fetch(
              `https://api.themoviedb.org/3/tv/${title.tmdb_id}/watch/providers?api_key=110bb98a209c2c9716c472819fe63e72`,
              options
            )
              .then((response) => response.json())
              .then((response) => {
                let tvSeries = response.results[country].flatrate;

                // Append results based on how many there are
                switch (tvSeries.length) {
                  case 1:
                    const result = document.createElement('div');
                    result.classList.add('result');
                    result.innerHTML = `<span class='search'>${
                      title.name
                    }</span> is on <span class="${providerColor(
                      tvSeries[0].provider_name
                    )}">${tvSeries[0].provider_name}</span>.`;
                    resultsContainer.append(result);
                    break;

                  case 2:
                    const result2 = document.createElement('div');
                    result2.classList.add('result');
                    result2.innerHTML = `<span class='search'>${
                      title.name
                    }</span> is on <span class="${providerColor(
                      tvSeries[0].provider_name
                    )}">${
                      tvSeries[0].provider_name
                    }</span> and <span class="${providerColor(
                      tvSeries[1].provider_name
                    )}">${tvSeries[1].provider_name}</span>.`;
                    resultsContainer.append(result2);
                    break;

                  case 3:
                    const result3 = document.createElement('div');
                    result3.classList.add('result');
                    result3.innerHTML = `<span class='search'>${
                      title.name
                    }</span> is on </span> is on <span class="${providerColor(
                      tvSeries[0].provider_name
                    )}">${
                      tvSeries[0].provider_name
                    }</span>, </span> is on <span class="${providerColor(
                      tvSeries[1].provider_name
                    )}">${
                      tvSeries[1].provider_name
                    }</span> and <span class="${providerColor(
                      tvSeries[2].provider_name
                    )}">${tvSeries[2].provider_name}</span>.`;
                    resultsContainer.append(result3);
                    break;
                }
              })
              .catch((err) => console.error(err));
          });
        });
    }

    // Error if movie nor tv-series are checked
    if (!movieCheckbox.checked && !tvCheckbox.checked) {
      const result = document.createElement('div');
      result.textContent = 'Please select what are you looking for.';
      result.classList.add('result');
      resultsContainer.append(result);
    }
  } else {
    // Error if input is empty
    const result = document.createElement('div');
    result.textContent = 'Please enter a movie or TV series to look up.';
    result.classList.add('result');
    resultsContainer.append(result);
  }
});

// Menu
overlay.addEventListener('click', () => {
  menu.classList.add('collapsed');
  overlay.classList.add('hidden');
});

burgerMenuBtn.addEventListener('click', () => {
  menu.classList.remove('collapsed');
  overlay.classList.remove('hidden');
  document.body.classList.add('stop-scroll');
});

closeBurgerMenuBtn.addEventListener('click', () => {
  menu.classList.add('collapsed');
  overlay.classList.add('hidden');
  document.body.classList.remove('stop-scroll');
});

// Set country
if (localStorage.getItem('whereWatchCountry')) {
  countries.forEach((e) => {
    if (e.value === localStorage.getItem('whereWatchCountry')) {
      e.setAttribute('checked', 'checked');
    }
  });
} else {
  countries.forEach((e) => {
    if (e.checked) localStorage.setItem('whereWatchCountry', `${e.value}`);
  });
}

countries.forEach((e) => {
  e.addEventListener('click', () => {
    localStorage.setItem('whereWatchCountry', e.value);
    country = localStorage.getItem('whereWatchCountry');
  });
});

// Clear previous results
const clearResults = () => {
  let resultsDivs = resultsContainer.children;
  for (let i = 0; i < 5; i++) {
    for (let item of resultsDivs) {
      item.remove();
    }
  }
};

// Streaming provider class color
const providerColor = (provider) => {
  switch (provider) {
    case 'Netflix':
      return 'netflix';

    case 'HBO Max':
      return 'hbo';

    case 'HBO Go':
      return 'hbo';

    case 'Disney Plus':
      return 'disney';

    case 'Star Plus':
      return 'star';

    case 'Amazon Prime Video':
      return 'amazon';

    case 'Paramount Plus':
      return 'paramount';

    case 'Movistar Plus':
    case 'Movistar Play':
      return 'movistar';

    case 'Apple TV Plus':
      return 'apple';
  }
};
