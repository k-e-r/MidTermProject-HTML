const onInput = async (event, title = '') => {
  const checkValue =
    title === '' ? (event === '' ? '' : event.target.value) : title;
  const ranking = document.querySelector('#ranking-container');
  const results = document.querySelector('.results');
  const s_ranking = document.querySelector('.ranking');
  if (checkValue !== '') {
    ranking.style.display = 'none';
    s_ranking.style.display = 'block';
    const lists = await searchGames(checkValue);
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
        const option = document.createElement('a');
        const image =
          item.Item.largeImageUrl === ''
            ? 'https://placehold.jp/400x250.png'
            : item.Item.largeImageUrl;

        option.innerHTML = `
          <img src="${image}" />
          <div class="contents">
            <p>Title : ${item.Item.title}</p>
            <p>Hardware : ${item.Item.hardware}</p>
            <p>Publisher : ${item.Item.label}</p>
            <p>Sales Date: ${item.Item.salesDate}</p>
          </div>
        `;
        results.appendChild(option);
        option.onclick = function () {
          // memo: Redeclaration... I want to delete it.
          const input = document
            .querySelector('#autocomplete')
            .querySelector('input');
          input.value = item.Item.title;
          bookDetails(item);
        };
      }
    }
    showRanking();
  } else {
    ranking.style.display = 'flex';
    results.innerHTML = '';
    s_ranking.style.display = 'none';
  }
};

bookDetails = (info) => {
  const ranking = document.querySelector('#ranking-container');
  const results = document.querySelector('.results');
  ranking.style.display = 'none';
  results.innerHTML = '';
  if (info !== '') {
    results.innerHTML = '';
    item = info.Item;
    const option = document.createElement('div');
    option.className = 'bookDetails';
    const image =
      item.largeImageUrl === ''
        ? 'https://placehold.jp/400x250.png'
        : item.largeImageUrl;
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

    const postage = (p) => {
      switch (p) {
        case 0:
          return 'Shipping not included';
        case 1:
          return 'Free delivery shipping';
        case 2:
          return 'Free shipping (including convenience store shipping)';
        default:
          return '';
      }
    };
    const url =
      item.affiliateUrl === ''
        ? '-'
        : '<a href="' + item.affiliateUrl + '" target="_blank">Rakuten</a>';

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
    results.appendChild(option);
  }
};

showRanking = async () => {
  const s_ranking = document.querySelector('.ranking');
  const lists = await searchGames('', 'sales', 10);
  const items = lists.Items;
  s_ranking.innerHTML = '';
  const title = document.createElement('div');
  title.className = 'rankingTitle';
  title.innerHTML = '<h2>Sales Ranking (Total)</h2>';
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
      // bookDetails(item);
      onInput('', input.value);
    };
  }
};

createAutoComplete = () => {
  document.querySelector('#autocomplete').innerHTML = `
    <label><input class="input" placeholder="牧場物語" /></label>
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

createHeroImageTotal = async () => {
  const ranking = document.querySelector('#ranking-container');
  ranking.innerHTML = '';
  const title = document.createElement('div');
  title.className = 'rankingTitle';
  title.innerHTML = '<h2 class="total">Sales Ranking (Total)</h2>';
  ranking.appendChild(title);

  const lists = await searchGames('', 'sales', 3);
  setData(title, lists);
  createHeroImagePS5();
};

createHeroImagePS5 = async () => {
  const ranking = document.querySelector('#ranking-container');
  const title = document.createElement('div');
  title.className = 'rankingTitle';
  title.innerHTML = '<h2 class="ps5">Sales Ranking (PS5)</h2>';
  ranking.appendChild(title);

  const lists = await searchGames('', 'sales', 3, '006515');
  setData(title, lists);
  createHeroImageSwitch();
};

createHeroImageSwitch = async () => {
  const ranking = document.querySelector('#ranking-container');
  const title = document.createElement('div');
  title.className = 'rankingTitle';
  title.innerHTML = '<h2 class="total">Sales Ranking (Nintendo Switch)</h2>';
  ranking.appendChild(title);

  const lists = await searchGames('', 'sales', 3, '006514');
  setData(title, lists);
  createHeroImageXbox();
};

createHeroImageXbox = async () => {
  const ranking = document.querySelector('#ranking-container');
  const title = document.createElement('div');
  title.className = 'rankingTitle';
  title.innerHTML = '<h2 class="xbox">Sales Ranking (Xbox Series X)</h2>';
  ranking.appendChild(title);

  const lists = await searchGames('', 'sales', 3, '006516');
  setData(title, lists);
};

setData = (title, lists) => {
  const items = lists.Items;
  for (let item of items) {
    const option = document.createElement('a');
    option.className = 'rankingBooks';
    option.setAttribute('data-id', item.Item.title);
    option.onclick = async function () {
      // memo: Redeclaration... I want to delete it.
      const input = document
        .querySelector('#autocomplete')
        .querySelector('input');
      input.value = this.dataset.id;
      onInput('', this.dataset.id);
    };
    option.innerHTML = `
        <img src="${item.Item.largeImageUrl}" />
        <div class="contents">
          <p>Title : ${item.Item.title}</p>
          <p>Hardware : ${item.Item.hardware}</p>
          <p>Publisher : ${item.Item.label}</p>
          <p>Sales Date: ${item.Item.salesDate}</p>
        </div>
      `;
    title.appendChild(option);
  }
};

createAutoComplete();
createHeroImageTotal();
