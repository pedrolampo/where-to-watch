const searchRecomBtn = document.querySelector('[data-recom-search]');
const categories = document.querySelectorAll('input[type="checkbox"]');
const resultsRecomContainer = document.getElementById('recomResults');

const options = { method: 'GET' };

const URL_NO_CATEGORY =
  'https://api.themoviedb.org/3/discover/movie?api_key=110bb98a209c2c9716c472819fe63e72&region=ar&sort_by=popularity.desc&include_adult=true&include_video=false&page=1&with_watch_monetization_types=flatrate';

searchRecomBtn.addEventListener('click', (e) => {
  e.preventDefault();

  clearResults();

  let specific = false;
  const CAT_IDS = [];

  categories.forEach((cat) => {
    if (cat.checked) {
      specific = true;
      CAT_IDS.push(cat.value);
    }
  });

  if (!specific) {
    fetch(URL_NO_CATEGORY, options)
      .then((res) => res.json())
      .then((res) => appendResults(res.results));
  }

  if (specific) {
    if (CAT_IDS.length === 1) {
      fetch(returnURLWithGenres(CAT_IDS[0]), options)
        .then((res) => res.json())
        .then((res) => appendResults(res.results));
    } else {
      let categoriesSelected = `${CAT_IDS[0]}`;

      CAT_IDS.slice(0, -1).forEach((e) => {
        categoriesSelected += `%2C${e}`;
      });

      fetch(returnURLWithGenres(categoriesSelected), options)
        .then((res) => res.json())
        .then((res) => appendResults(res.results));
    }
  }
});

function appendResults(results) {
  results.forEach((result) => {
    const resultEl = document.createElement('div');
    resultEl.classList.add('result');
    resultEl.innerHTML = `
      <img class="poster" src="https://image.tmdb.org/t/p/w500${result.poster_path}" alt="Poster of film" />
      <div class="result-info">
        <h4>${result.title}</h4>
        <p>${result.overview}</p>
      </div>
      `;
    resultsRecomContainer.append(resultEl);
  });
}

const returnURLWithGenres = (genreID) => {
  return `https://api.themoviedb.org/3/discover/movie?api_key=110bb98a209c2c9716c472819fe63e72&region=ar&sort_by=popularity.desc&include_adult=true&include_video=false&page=1&with_genres=${genreID}&with_watch_monetization_types=flatrate`;
};

const clearResults = () => {
  let resultsDivs = resultsRecomContainer.children;
  for (let i = 0; i < 5; i++) {
    for (let item of resultsDivs) {
      item.remove();
    }
  }
};
