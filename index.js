createAutoComplete = () => {
  document.querySelector('#autocomplete').innerHTML = `
    <label><input class="input" placeholder="ラブひな" /></label>
  `;
  const input = document.querySelector('#autocomplete').querySelector('input');
  const onInput = async (event) => {
    const lists = await searchTitle(event.target.value);
    const results = document
      .querySelector('#contents')
      .querySelector('.results');
    if (lists.total_count === 0) {
      const option = document.createElement('a');
      results.innerHTML = '';
      option.innerHTML = `
        <div class="undefined">
          <p>"${event.target.value}" is UNDEFINED</p>
        </div>
      `;
      let slides = document.getElementsByClassName('switchSlides');
      for (i = 0; i < slides.length; i++) {
        slides[i].style.display = 'none';
      }
      results.appendChild(option);
    } else outputResult(lists);
  };
  input.addEventListener('input', debounce(onInput, 500));
};

outputResult = (lists) => {
  const results = document.querySelector('#contents').querySelector('.results');
  if (lists != []) {
    const items = lists.works;
    results.innerHTML = '';
    for (let item of items) {
      if (item.season_name !== '' && item.season_name !== undefined) {
        const option = document.createElement('a');
        const image =
          item.images.recommended_url === ''
            ? 'https://placehold.jp/400x250.png'
            : item.images.recommended_url;
        const url =
          item.official_site_url === ''
            ? '-'
            : '<a href="' +
              item.official_site_url +
              '" target="_blank">' +
              item.official_site_url +
              '</a>';

        option.innerHTML = `
          <img src="${image}" />
          <div class="contents">
            <p>Title : ${item.title}</p>
            <p>Data : ${item.season_name_text}</p>
            <p>Release media : ${item.media_text}</p>
            <p>Official site URL: ${url}</p>
          </div>
        `;
        let slides = document.getElementsByClassName('switchSlides');
        for (i = 0; i < slides.length; i++) {
          slides[i].style.display = 'none';
        }
        results.appendChild(option);
      }
    }
  } else {
    results.innerHTML = '';
    let slides = document.getElementsByClassName('switchSlides');
    for (i = 0; i < slides.length; i++) {
      slides[i].style.display = 'block';
    }
  }
};

createHeroImage = async () => {
  const slide = document.querySelector('#slideshow-container');
  const lists = await searchSeason('2021-winter');

  if (lists != []) {
    const items = lists.works;
    slide.innerHTML = '';
    for (let item of items) {
      if (item.images.recommended_url !== '') {
        const option = document.createElement('a');
        option.setAttribute('data-id', item.title);
        option.onclick = async function () {
          const input = document
            .querySelector('#autocomplete')
            .querySelector('input');
          input.value = this.dataset.id;
          const lists = await searchTitle(this.dataset.id);
          outputResult(lists);
        };
        option.innerHTML = `
          <div class="showSlides">
            <img class="switchSlides" src="${item.images.recommended_url}" />
          </div>
        `;
        slide.appendChild(option);
      }
    }
  } else slide.innerHTML = '';
  showSlides();
};

let slideIndex = 0;
showSlides = () => {
  let i;
  let slides = document.getElementsByClassName('showSlides');
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = 'none';
  }
  slideIndex++;
  if (slideIndex > slides.length) {
    slideIndex = 1;
  }
  slides[slideIndex - 1].style.display = 'block';
  setTimeout(showSlides, 8000);
};

createAutoComplete();
createHeroImage();
