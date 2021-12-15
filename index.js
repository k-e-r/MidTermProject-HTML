const onInput = async (event, title = '') => {
  const checkValue = title === '' ? event.target.value : title;
  const lists = await searchTitle(checkValue);
  const results = document.querySelector('#contents').querySelector('.results');
  if (lists.total_count === 0) {
    const option = document.createElement('a');
    results.innerHTML = '';
    option.innerHTML = `
      <div class="undefined">
        <p>"${event.target.value}" is UNDEFINED</p>
      </div>
    `;
    timerSet('off');
    results.appendChild(option);
  } else if (lists != []) {
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
        timerSet('off');
        results.appendChild(option);
      }
    }
  } else {
    results.innerHTML = '';
    timerSet();
  }
};

createAutoComplete = () => {
  document.querySelector('#autocomplete').innerHTML = `
    <label><input class="input" placeholder="ラブひな" /></label>
  `;
  const input = document.querySelector('#autocomplete').querySelector('input');
  input.addEventListener('input', debounce(onInput, 500));
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
        option.className = 'switchSlides';
        option.setAttribute('data-id', item.title);
        option.onclick = async function () {
          // memo: Redeclaration... I want to delete it.
          const input = document
            .querySelector('#autocomplete')
            .querySelector('input');
          input.value = this.dataset.id;
          onInput('', this.dataset.id);
        };
        option.innerHTML = `
          <img src="${item.images.recommended_url}" />
        `;
        slide.appendChild(option);
      }
    }
    const barOut = document.createElement('div');
    barOut.id = 'progressBarOut';
    const barIn = document.createElement('div');
    slide.appendChild(barOut);
    barIn.id = 'progressBarIn';
    barIn.style.animationDuration = timeValue + 'ms';
    slide.appendChild(barIn);
  } else slide.innerHTML = '';
  timerSet();
  showSlides();
};
const timeValue = 8000;
let slideIndex = 0;
const showSlides = () => {
  const slides = document.getElementsByClassName('switchSlides');
  slideIndex++;
  if (slideIndex > slides.length) {
    slideIndex = 1;
  }
  slides[0].style.marginLeft = '-' + (slideIndex - 1) + '00%';
};

let time = 0;
const timerSet = (sw = 'on') => {
  const slide = document.querySelector('#slideshow-container');
  const bar = document.querySelector('#progressBarIn');
  if (sw === 'on') {
    slide.style.display = 'inline-block';
    time = setInterval(showSlides, timeValue);
    bar.classList.add('active');
  } else {
    slide.style.display = 'none';
    clearInterval(time);
    bar.classList.remove('active');
  }
};

createAutoComplete();
createHeroImage();
