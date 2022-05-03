const input = document.querySelector('[data-input]');
const searchBtn = document.querySelector('[data-search]');
const resultsContainer = document.querySelector('[data-results]');

const API_KEY = '469vh9ZIpXnNbLdTR0yzFVwKCzFIHExEutPqM5yT';

const options = {
  method: 'GET',
  headers: {
    'X-RapidAPI-Host': 'streaming-availability.p.rapidapi.com',
    'X-RapidAPI-Key': 'fd31e0f5bbmsh9cd8cbe53d8426ap1fcc64jsne202d1690d3d',
  },
};

let search = '';

searchBtn.addEventListener('click', (e) => {
  e.preventDefault();

  // Clean previous results
  let resultsDivs = resultsContainer.children;
  for (let item of resultsDivs) {
    item.remove();
  }

  // Searching movie/series
  if (input.value.length > 0) {
    search = input.value.replace(/ /g, '%20');

    // Get TMDB ID
    let url = `https://api.watchmode.com/v1/search/?apiKey=${API_KEY}&search_field=name&search_value=${search}`;
    let results = [];

    fetch(url, { method: 'Get' })
      .then((res) => res.json())
      .then((json) => {
        results = json.title_results;
        results.forEach((title) => {
          // Get where to watch
          fetch(
            `https://streaming-availability.p.rapidapi.com/get/basic?country=ar&tmdb_id=${title.tmdb_type}%2F${title.tmdb_id}&output_language=en`,
            options
          )
            .then((response) => response.json())
            .then((response) => {
              console.log(response);

              // Append results
              if (response.streamingInfo.length > 0) {
                const result = document.createElement('div');
                result.classList.add('result');
                result.textContent = `${response.title} is on ${response.streamingInfo[0]}.`;
                resultsContainer.append(result);
              }
            })
            .catch((err) => {
              console.error(err);
              const result = document.createElement('div');
              result.classList.add('result');
              result.textContent = `Hubo un problema al buscar.`;
              resultsContainer.append(result);
            });
        });
      });
  } else {
    // Error on input
    const result = document.createElement('div');
    result.textContent = 'Error al intentar buscar.';
    resultsContainer.append(result);
  }
});
