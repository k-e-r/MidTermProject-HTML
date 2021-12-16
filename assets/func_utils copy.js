const debounce = (func, delay = 1000) => {
  let timeoutId;
  return (...args) => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    timeoutId = setTimeout(() => {
      func.apply(null, args);
      console.log('args:' + args);
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
  s_ranking.innerHTML = '';
  const title = document.createElement('div');
  title.className = `rankingTitle`;
  title.innerHTML = `<h2 class="total">Sales Ranking (${kind})</h2>`;
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
      onInput('', input.value);
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

showItems = (info, genre) => {
  const ranking = document.querySelector('#ranking-container');
  const results = document.querySelector('.results');
  ranking.style.display = 'none';
  results.innerHTML = '';
  if (info !== '') {
    item = info.Item;
    const option = document.createElement('div');
    const image =
      item.largeImageUrl === ''
        ? 'https://placehold.jp/400x250.png'
        : item.largeImageUrl;
    const url =
      item.affiliateUrl === ''
        ? '-'
        : '<a href="' + item.affiliateUrl + '" target="_blank">Rakuten</a>';
    if (genre === apiData.books.genreId.comic) {
      option.innerHTML = `
        <img src="${image}" />
        <div class="details">
          <p>Title : ${item.title}</p>
          <p>Title Kana : ${item.titleKana}</p>
          <p>Author : ${item.author}</p>
          <p>Author Kana : ${item.authorKana}</p>
          <p>Publisher : ${item.publisherName}</p>
          <p>ISBN Code: ${item.isbn}</p>
          <p>Sales Date: ${item.salesDate}</p>
          <p>Kind: ${item.seriesName}</p>
          <br />
          <p>Availability: ${availability(item.availability)}</p>
          <p>Postage: ${postage(item.postageFlag)}</p>
          <p>Purchase URL: ${url}</p>
        </div>
      `;
    } else {
      option.innerHTML = `
        <img src="${image}" />
        <div class="details">
          <p>Title : ${item.title}</p>
          <p>Title Kana : ${item.titleKana}</p>
          <p>Hardware : ${item.hardware}</p>
          <p>Publisher : ${item.label}</p>
          <p>JAN Code: ${item.jan}</p>
          <p>Sales Date: ${item.salesDate}</p>
          <br />
          <p>Description: </p><p class="desc">${item.itemCaption}</p>
          <br />
          <p>Availability: ${availability(item.availability)}</p>
          <p>Postage: ${postage(item.postageFlag)}</p>
          <p>Purchase URL: ${url}</p>
        </div>
      `;
    }
    results.appendChild(option);
  }
};

createHeroRanking = async (genres) => {
  const ranking = document.querySelector('#ranking-container');
  ranking.innerHTML = '';
  for (let genre of genres) {
    const lists = await searchItems('', 'sales', genre, 3);
    const items = lists.Items;

    const title = document.createElement('div');
    title.className = 'rankingTitle';
    if (genres[0] === apiData.books.genreId.comic) {
      title.innerHTML = `<h2 class="total">Sales Ranking (${apiData.books.genreName[genre]})</h2>`;
    } else if (genres[0] === apiData.games.genreId.game) {
      title.innerHTML = `<h2 class="total">Sales Ranking (${apiData.games.genreName[genre]})</h2>`;
    }
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
        onInput('', this.dataset.id);
      };

      if (genres[0] === apiData.books.genreId.comic) {
        option.innerHTML = `
          <img src="${item.Item.largeImageUrl}" />
          <div class="contents">
            <p class="title">${item.Item.title}</p>
            <p class="author">${item.Item.author}</p>
            <p class="salesDate">${item.Item.salesDate}</p>
          </div>
        `;
      } else if (genres[0] === apiData.games.genreId.game) {
        option.innerHTML = `
          <img src="${item.Item.largeImageUrl}" />
          <div class="contents">
            <p>${item.Item.title}</p>
            <p>${item.Item.hardware}</p>
            <p>${item.Item.label}</p>
            <p>${item.Item.salesDate}</p>
          </div>
        `;
      }
      title.appendChild(option);
    }
  }
};
