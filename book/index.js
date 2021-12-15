const onInput = async (event, title = '') => {
  const checkValue = title === '' ? event.target.value : title;
  const ranking = document.querySelector('#ranking-container');
  const results = document.querySelector('.results');
  if (checkValue !== '') {
    ranking.style.display = 'none';
    const lists = await searchBooks(checkValue);
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
            <p>Author : ${item.Item.author}</p>
            <p>Publisher : ${item.Item.publisherName}</p>
            <p>Sales Date: ${item.Item.salesDate}</p>
            <p>Kind: ${item.Item.seriesName}</p>
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
  } else {
    ranking.style.display = 'flex';
    results.innerHTML = '';
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
          return 'default';
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
        <p>URL: ${item.affiliateUrl}</p>
      </div>
    `;
    results.appendChild(option);
  }
};

createAutoComplete = () => {
  document.querySelector('#autocomplete').innerHTML = `
    <label><input class="input" placeholder="よつばと!" /></label>
  `;
  const input = document.querySelector('#autocomplete').querySelector('input');
  input.addEventListener('input', debounce(onInput, 500));
};

createHeroImage = async () => {
  const ranking = document.querySelector('#ranking-container');
  const lists = await searchBooks('', 'sales', 3);

  if (lists !== '') {
    const items = lists.Items;
    ranking.innerHTML = '';
    const title = document.createElement('div');
    title.className = 'rankingTitle';
    title.innerHTML = '<h2>Sales Ranking (Comic)</h2>';
    ranking.appendChild(title);
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
        // bookDetails(this.dataset.id);
        onInput('', this.dataset.id);
      };
      option.innerHTML = `
        <img src="${item.Item.largeImageUrl}" />
        <div class="contents">
          <p>Title : ${item.Item.title}</p>
          <p>Author : ${item.Item.author}</p>
          <p>Publisher : ${item.Item.publisherName}</p>
          <p>Sales Date: ${item.Item.salesDate}</p>
          <p>Kind: ${item.Item.seriesName}</p>
        </div>
      `;
      ranking.appendChild(option);
    }
  } else ranking.innerHTML = '';
};

createAutoComplete();
createHeroImage();
