const onInput = async (event) => {
  if (event.target.value !== '') {
    const lists = await searchBooks(checkValue);
    const results = document.querySelector('.results');
    if (lists.hits === 0) {
      const option = document.createElement('a');
      results.innerHTML = '';
      option.innerHTML = `
        <div class="undefined">
          <p>"${event.target.value}" is UNDEFINED</p>
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
      }
    }
  } else {
    results.innerHTML = '';
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
  const slide = document.querySelector('#ranking-container');
  const lists = await searchBooks('', 'sales', 10);

  if (lists !== '') {
    const items = lists.Items;
    slide.innerHTML = '';
    for (let item of items) {
      const option = document.createElement('a');
      option.className = 'rankingBooks';
      option.setAttribute('data-id', item.Item.title);
      // option.onclick = async function () {
      //   // memo: Redeclaration... I want to delete it.
      //   const input = document
      //     .querySelector('#autocomplete')
      //     .querySelector('input');
      //   input.value = this.dataset.id;
      //   onInput('', this.dataset.id);
      // };
      option.innerHTML = `
        <img src="${item.Item.largeImageUrl}" />
      `;
      slide.appendChild(option);
    }
  } else slide.innerHTML = '';
};

createAutoComplete();
createHeroImage();
