onInput = async (event, title = '') => {
  const checkValue =
    title === '' ? (event === '' ? '' : event.target.value) : title;
  const ranking = document.querySelector('#ranking-container');
  const results = document.querySelector('.results');
  const s_ranking = document.querySelector('.ranking');
  if (checkValue !== '') {
    ranking.style.display = 'none';
    s_ranking.style.display = 'block';
    const lists = await searchItems(checkValue);
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
            <p class="maker">${item.Item.author}</p>
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
          showItems(item, apiData.books.genreId.comic);
        };
      }
    }
    showRanking(
      apiData.books.genreId.comic,
      apiData.books.genreName[apiData.books.genreId.comic]
    );
  } else {
    ranking.style.display = 'flex';
    results.innerHTML = '';
    s_ranking.style.display = 'none';
  }
};

createAutoComplete('よつばと!');
const booksRankGenre = [
  apiData.books.genreId.comic,
  apiData.books.genreId.lnovel,
  apiData.books.genreId.novel,
  apiData.books.genreId.art,
];
createHeroRanking(booksRankGenre);
