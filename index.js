const fetchData = async (search) => {
  const response = await axios.get('https://api.annict.com/v1/works', {
    params: {
      access_token: 'M6Vyw8ESfMMLQy7sAlfRdTeVhSuFvTh2GXTHw2nd8_A',
      filter_title: search,
      sort_id: 'desc',
    },
  });

  console.log(response.data);
  return response.data.works;
};

const createAutoComplete = () => {
  document.querySelector('#autocomplete').innerHTML = `
    <label>Animation name is 
    <input class="input" placeholder="ラブひな" />
    </label>
  `;

  const input = document.querySelector('#autocomplete').querySelector('input');
  const results = document.querySelector('#contents').querySelector('.results');

  const onInput = async (event) => {
    const items = await fetchData(event.target.value);

    results.innerHTML = '';
    for (let item of items) {
      const option = document.createElement('a');
      const image =
        item.images.recommended_url === ''
          ? 'https://placehold.jp/400x250.png'
          : item.images.recommended_url;

      // option.classList.add('dropdown-item');
      // option.innerHTML = renderOption(item);
      // option.addEventListener('click', () => {
      //   dropdown.classList.remove('is-active');
      //   input.value = inputValue(item);
      //   onOptionSelect(item);
      // });
      option.innerHTML = `
        <img src="${image}" />
        <div class="contents">
          <p>Title : ${item.title}</p>
          <p>Data : ${item.season_name_text}</p>
          <p>Release media : ${item.media_text}</p>
          <p>Official site URL: <a href="${item.official_site_url}" target="_blank">${item.official_site_url}</a></p>
        </div>
      `;

      results.appendChild(option);
    }
  };
  input.addEventListener('input', debounce(onInput, 500));
};

// fetchData();
createAutoComplete();
