const debounce = (func, delay = 1000) => {
  let timeoutId;
  return (...args) => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    timeoutId = setTimeout(() => {
      func.apply(null, args);
    }, delay);
  };
};

createAutoComplete = (pHolder) => {
  document.querySelector('#autocomplete').innerHTML = `
    <label><input class="input" placeholder="${pHolder}" /></label>
  `;
  const input = document.querySelector('#autocomplete').querySelector('input');
  input.addEventListener('input', debounce(onInput, 500));

  const logo = document.querySelector('h1');
  logo.onclick = async () => {
    // memo: Redeclaration... I want to delete it.
    const input = document
      .querySelector('#autocomplete')
      .querySelector('input');
    input.value = '';
    onInput('', '');
  };
};

showRanking = async (genre, kind) => {
  const s_ranking = document.querySelector('.ranking');
  const lists = await searchItems('', 'sales', genre, 10);
  const items = lists.Items;
  s_ranking.style.display = 'block';
  s_ranking.innerHTML = '';
  const title = document.createElement('div');
  title.className = `rankingTitle`;
  title.innerHTML = `<h2 class="rankLine0">Sales Ranking (${kind})</h2>`;
  s_ranking.appendChild(title);
  for (let item of items) {
    const option = document.createElement('a');
    option.className = 'ranking-item';
    option.innerHTML = `
      <div class="r-contents">
        <span class="order"></span>
        <p>${item.Item.title}</p>
      </div>
    `;
    s_ranking.appendChild(option);
    option.onclick = function () {
      // memo: Redeclaration... I want to delete it.
      const input = document
        .querySelector('#autocomplete')
        .querySelector('input');
      input.value = item.Item.title;
      // onInput('', input.value);
      showItems(item, genre);
    };
  }
};

const availability = (a) => {
  switch (a) {
    case '1':
      return 'In Stock';
    case '2':
      return 'Usually ships in 3 to 7 days';
    case '3':
      return 'Usually ships in 3 to 9 days';
    case '4':
      return 'On order from the manufacturer';
    case '5':
      return 'Available for reservation';
    case '6':
      return 'Check with the manufacturer for availability';
    default:
      return 'Out of stock';
  }
};

const checkRate = (r) => {
  if (r >= 0 && r < 0.5) return '00';
  else if (r >= 0.5 && r < 1) return '05';
  else if (r >= 1 && r < 1.5) return '10';
  else if (r >= 1.5 && r < 2) return '15';
  else if (r >= 2 && r < 2.5) return '20';
  else if (r >= 2.5 && r < 3) return '25';
  else if (r >= 3 && r < 3.5) return '30';
  else if (r >= 3.5 && r < 4) return '35';
  else if (r >= 4 && r < 4.5) return '40';
  else if (r >= 4.5 && r < 5) return '45';
  else return '50';
};

showItems = (info, genre) => {
  const ranking = document.querySelector('#ranking-container');
  const results = document.querySelector('.results');

  ranking.style.display = 'none';
  results.innerHTML = '';
  if (info !== '') {
    item = info.Item;
    const option = document.createElement('div');
    const optionAdd = document.createElement('div');
    option.className = 'details';
    const image =
      item.largeImageUrl === ''
        ? 'https://placehold.jp/100x150.png'
        : item.largeImageUrl;
    const url = item.affiliateUrl === '' ? '-' : item.affiliateUrl;
    const rateVal = checkRate(parseFloat(item.reviewAverage).toFixed(1));
    // memo: It could be shorter...
    if (genre.indexOf('001') === 0) {
      option.innerHTML = `
        <img src="${image}" />
        <div class="detailsCont">
          <p class="title">${item.title}</p>
          <p class="maker">${item.author}</p>
          <p class="review">
            <span class="rate rate${rateVal}"></span>
            ${item.reviewAverage}
          </p>
          <p class="category">${item.publisherName} > ${item.seriesName}</p>
          <br />
          <p class="status">${availability(item.availability)}</p>
          <a href="${url}" class="btn" target="_blank">PURCHASE</a>
        </div>
      `;
      optionAdd.className = 'mDetails';
      optionAdd.innerHTML = `
        <div class="moreDetailsCont">
          <p>Product Information</p>
          <p class="desc">Sales Date </p><p class="data">: ${item.salesDate}</p>
          <p class="desc">Author </p><p class="data">: ${item.author}</p>
          <p class="desc">Label </p><p class="data">: ${item.seriesName}</p>
          <p class="desc">Publisher </p><p class="data">: ${item.publisherName}</p>
          <p class="desc">ISBN </p><p class="data">: ${item.isbn}</p>
        </div>
      `;
    } else if (genre.indexOf('006') === 0) {
      option.innerHTML = `
        <img src="${image}" />
        <div class="detailsCont">
          <p class="title">${item.title}</p>
          <p class="maker">${item.label}</p>
          <p class="review">
            <span class="rate rate${rateVal}"></span>
            ${item.reviewAverage}
          </p>
          <p class="category">${item.hardware}</p>
          <br />
          <p class="status">${availability(item.availability)}</p>
          <a href="${url}" class="btn" target="_blank">PURCHASE</a>
        </div>
      `;
      optionAdd.className = 'mDetails';
      optionAdd.innerHTML = `
        <div class="moreDetailsCont">
          <p>Product Information</p>
          <p class="desc">Sales Date </p><p class="data">: ${item.salesDate}</p>
          <p class="desc">Label </p><p class="data">: ${item.label}</p>
          <p class="desc">Hardware </p><p class="data">: ${item.hardware}</p>
          <p class="desc">JAN </p><p class="data">: ${item.jan}</p>
        </div>
      `;
    } else {
      option.innerHTML = `
        <img src="${image}" />
        <div class="detailsCont">
          <p class="title">${item.title}</p>
          <p class="maker">${item.label}</p>
          <p class="review">
            <span class="rate rate${rateVal}"></span>
            ${item.reviewAverage}
          </p>
          <br />
          <p class="status">${availability(item.availability)}</p>
          <a href="${url}" class="btn" target="_blank">PURCHASE</a>
        </div>
      `;
      optionAdd.className = 'mDetails';
      optionAdd.innerHTML = `
        <div class="moreDetailsCont">
          <p>Product Information</p>
          <p class="desc">Sales Date </p><p class="data">: ${item.salesDate}</p>
          <p class="desc">Label </p><p class="data">: ${item.label}</p>
          <p class="desc">JAN </p><p class="data">: ${item.jan}</p>
        </div>
      `;
    }
    results.appendChild(option);
    results.appendChild(optionAdd);
  }

  showRanking(
    genre,
    (kind =
      apiData.books.genreName[genre] === undefined
        ? apiData.games.genreName[genre] === undefined
          ? apiData.anime.genreName[genre]
          : apiData.games.genreName[genre]
        : apiData.books.genreName[genre])
  );
};

createHeroRanking = async (genres) => {
  const ranking = document.querySelector('#ranking-container');
  ranking.innerHTML = '';
  let i = 0;
  for (let genre of genres) {
    const lists = await searchItems('', 'sales', genre, 3);
    const items = lists.Items;

    const title = document.createElement('div');
    title.className = 'rankingTitle';
    const rankGenre =
      genres[0] === apiData.books.genreId.comic
        ? apiData.books.genreName[genre]
        : genres[0] === apiData.games.genreId.game
        ? apiData.games.genreName[genre]
        : apiData.anime.genreName[genre];
    title.innerHTML = `<h2 class="rankLine${i}">Sales Ranking (${rankGenre})</h2>`;
    ranking.appendChild(title);

    for (let item of items) {
      const option = document.createElement('a');
      option.className = 'rankingItems';
      option.setAttribute('data-id', item.Item.title);
      option.onclick = function () {
        // memo: Redeclaration... I want to delete it.
        const input = document
          .querySelector('#autocomplete')
          .querySelector('input');
        input.value = this.dataset.id;
        // onInput('', this.dataset.id);
        showItems(item, genre);
      };

      if (genres[0] === apiData.books.genreId.comic) {
        option.innerHTML = `
          <img src="${item.Item.largeImageUrl}" />
          <div class="contents">
            <p class="title">${item.Item.title}</p>
            <p class="maker">${item.Item.author}</p>
            <p class="salesDate">${item.Item.salesDate}</p>
          </div>
        `;
      } else if (
        genres[0] === apiData.games.genreId.game ||
        genres[0] === apiData.anime.genreId.anime
      ) {
        option.innerHTML = `
          <img src="${item.Item.largeImageUrl}" />
          <div class="contents">
            <p class="title">${item.Item.title}</p>
            <p class="maker">${item.Item.label}</p>
            <p class="salesDate">${item.Item.salesDate}</p>
          </div>
        `;
      }
      title.appendChild(option);
    }
    i++;
  }
};
