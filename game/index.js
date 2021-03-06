onInput = async (event, title = '') => {
  const checkValue =
    title === '' ? (event === '' ? '' : event.target.value) : title;
  const ranking = document.querySelector('#ranking-container');
  const results = document.querySelector('.results');
  const s_ranking = document.querySelector('.ranking');
  if (checkValue === '地下室の怪人') {
    const item = {
      Item: {
        title: '地下室の怪人',
        label: 'Yoshino Yayama',
        salesDate: '2021年12月17日',
        hardware: 'Windows PC (Me/98/95) / iMac',
        jan: '0123456789',
        affiliateUrl:
          'https://yoshino9397.github.io/TrainProject/HTML/index.html',
        reviewAverage: '5',
        availability: '1',
        largeImageUrl: '../assets/package.jpg',
      },
    };
    ranking.style.display = 'none';
    s_ranking.style.display = 'block';
    results.innerHTML = '';
    const option = document.createElement('div');
    option.className = 'resLists';
    const image =
      item.Item.largeImageUrl === ''
        ? 'https://placehold.jp/100x150.png'
        : item.Item.largeImageUrl;

    option.innerHTML = `
        <img src="${image}" />
        <div class="contents">
          <p class="title">${item.Item.title}</p>
          <p class="maker">${item.Item.label}</p>
          <p class="salesDate">${item.Item.salesDate}</p>
        </div>
      `;
    results.appendChild(option);
    option.onclick = function () {
      // memo: Redeclaration... I want to delete it.
      const input = document
        .querySelector('#autocomplete')
        .querySelector('input');
      input.value = item.Item.title;
      showItems(item, apiData.games.genreId.game);
    };
    showRanking(
      apiData.games.genreId.game,
      apiData.games.genreName[apiData.games.genreId.game]
    );
  } else if (checkValue !== '') {
    ranking.style.display = 'none';
    s_ranking.style.display = 'block';
    const lists = await searchItems(
      checkValue,
      '-releaseDate',
      apiData.games.genreId.game,
      30,
      1
    );
    if (lists.hits === 0) {
      const option = document.createElement('a');
      results.innerHTML = '';
      option.innerHTML = `
        <div class="undefined">
          <p>"${checkValue}" is UNDEFINED</p>
        </div>
      `;
      results.appendChild(option);
    } else if (lists !== '') {
      const items = lists.Items;
      results.innerHTML = '';
      for (let item of items) {
        const option = document.createElement('div');
        option.className = 'resLists';
        const image =
          item.Item.largeImageUrl === ''
            ? 'https://placehold.jp/100x150.png'
            : item.Item.largeImageUrl;

        option.innerHTML = `
          <img src="${image}" />
          <div class="contents">
            <p class="title">${item.Item.title}</p>
            <p class="maker">${item.Item.label}</p>
            <p class="salesDate">${item.Item.salesDate}</p>
          </div>
        `;
        results.appendChild(option);
        option.onclick = function () {
          // memo: Redeclaration... I want to delete it.
          const input = document
            .querySelector('#autocomplete')
            .querySelector('input');
          input.value = item.Item.title;
          showItems(item, apiData.games.genreId.game);
        };
      }
    }
    showRanking(
      apiData.games.genreId.game,
      apiData.games.genreName[apiData.games.genreId.game]
    );
  } else {
    ranking.style.display = 'flex';
    results.innerHTML = '';
    s_ranking.style.display = 'none';
  }
};

createAutoComplete('うたわれるもの');
const gamesRankGenre = [
  apiData.games.genreId.game,
  apiData.games.genreId.ps5,
  apiData.games.genreId.sw,
  apiData.games.genreId.xbox,
];
createHeroRanking(gamesRankGenre);
