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
                // Append results based on how many there are
                switch (response.results.AR.flatrate.length) {
                  case 1:
                    const result = document.createElement('div');
                    result.classList.add('result');
                    result.innerHTML = `<span class='search'>${
                      title.name
                    }</span> is on <span class="${providerColor(
                      response.results.AR.flatrate[0].provider_name
                    )}">${
                      response.results.AR.flatrate[0].provider_name
                    }</span>.`;
                    resultsContainer.append(result);
                    break;
                  case 2:
                    const result2 = document.createElement('div');
                    result2.classList.add('result');
                    result2.innerHTML = `<span class='search'>${
                      title.name
                    }</span> is on <span class="${providerColor(
                      response.results.AR.flatrate[0].provider_name
                    )}">${
                      response.results.AR.flatrate[0].provider_name
                    }</span> and <span class="${providerColor(
                      response.results.AR.flatrate[1].provider_name
                    )}">${
                      response.results.AR.flatrate[1].provider_name
                    }</span>.`;
                    resultsContainer.append(result2);
                    break;
                  case 3:
                    const result3 = document.createElement('div');
                    result3.classList.add('result');
                    result3.innerHTML = `<span class='search'>${
                      title.name
                    }</span> is on <span class="${providerColor(
                      response.results.AR.flatrate[0].provider_name
                    )}">${
                      response.results.AR.flatrate[0].provider_name
                    }</span>, <span class="${providerColor(
                      response.results.AR.flatrate[1].provider_name
                    )}">${
                      response.results.AR.flatrate[1].provider_name
                    }</span> and <span class="${providerColor(
                      response.results.AR.flatrate[2].provider_name
                    )}">${
                      response.results.AR.flatrate[2].provider_name
                    }</span>.`;
                    resultsContainer.append(result3);
                    break;
                }
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
                // Append results based on how many there are
                switch (response.results.AR.flatrate.length) {
                  case 1:
                    const result = document.createElement('div');
                    result.classList.add('result');
                    result.innerHTML = `<span class='search'>${
                      title.name
                    }</span> is on <span class="${providerColor(
                      response.results.AR.flatrate[0].provider_name
                    )}">${
                      response.results.AR.flatrate[0].provider_name
                    }</span>.`;
                    resultsContainer.append(result);
                    break;
                  case 2:
                    const result2 = document.createElement('div');
                    result2.classList.add('result');
                    result2.innerHTML = `<span class='search'>${
                      title.name
                    }</span> is on <span class="${providerColor(
                      response.results.AR.flatrate[0].provider_name
                    )}">${
                      response.results.AR.flatrate[0].provider_name
                    }</span> and <span class="${providerColor(
                      response.results.AR.flatrate[1].provider_name
                    )}">${
                      response.results.AR.flatrate[1].provider_name
                    }</span>.`;
                    resultsContainer.append(result2);
                    break;
                  case 3:
                    const result3 = document.createElement('div');
                    result3.classList.add('result');
                    result3.innerHTML = `<span class='search'>${
                      title.name
                    }</span> is on </span> is on <span class="${providerColor(
                      response.results.AR.flatrate[0].provider_name
                    )}">${
                      response.results.AR.flatrate[0].provider_name
                    }</span>, </span> is on <span class="${providerColor(
                      response.results.AR.flatrate[1].provider_name
                    )}">${
                      response.results.AR.flatrate[1].provider_name
                    }</span> and <span class="${providerColor(
                      response.results.AR.flatrate[2].provider_name
                    )}">${
                      response.results.AR.flatrate[2].provider_name
                    }</span>.`;
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

    case 'Movistar Play':
      return 'movistar';

    case 'Apple TV Plus':
      return 'apple';
  }
};
