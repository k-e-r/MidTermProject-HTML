onInput = async (event, title = '') => {
  const checkValue = title === '' ? event.target.value : title;
  const lists = await searchTitle(checkValue);
  const results = document.querySelector('.results');
  if (lists.total_count === 0) {
    timerSet('off');

    const option = document.createElement('a');
    results.innerHTML = '';
    option.innerHTML = `
      <div class="undefined">
        <p>"${event.target.value}" is UNDEFINED</p>
      </div>
    `;
    results.appendChild(option);
  } else if (lists != []) {
    timerSet('off');

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
        results.appendChild(option);
      }
    }
  } else {
    timerSet();
    results.innerHTML = '';
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
  // const lists = await searchSeason('2021-winter');
  const lists = await searchSeason(checkSeason());

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
    // progress bar
    const barOut = document.createElement('div');
    barOut.id = 'progressBarOut';
    const barIn = document.createElement('div');
    slide.appendChild(barOut);
    barIn.id = 'progressBarIn';
    barIn.style.animationDuration = timeValue + 'ms';
    slide.appendChild(barIn);

    // slide btn
    const btnPrev = document.createElement('a');
    btnPrev.className = 'prev';
    btnPrev.onclick = () => {
      showSlides('prev');
      timerSet('restart');
    };
    slide.appendChild(btnPrev);
    const btnNext = document.createElement('a');
    btnNext.className = 'next';
    btnNext.onclick = () => {
      showSlides('next');
      timerSet('restart');
    };
    slide.appendChild(btnNext);
  } else slide.innerHTML = '';
  timerSet();
  showSlides();
};

// time for slide changing
const timeValue = 8000;
let slideIndex = 0;
showSlides = (stat = '') => {
  const slides = document.querySelectorAll('.switchSlides');
  stat === 'prev' ? slideIndex-- : slideIndex++;
  if (slideIndex > slides.length) {
    slideIndex = 1;
  } else if (slideIndex <= 0) {
    slideIndex = slides.length;
  }
  slides[0].style.marginLeft = '-' + (slideIndex - 1) + '00%';
};

let time = 0;
timerSet = (sw = 'on') => {
  const slide = document.querySelector('#slideshow-container');
  const bar = document.querySelector('#progressBarIn');
  if (sw === 'on') {
    slide.style.display = 'inline-block';
    time = setInterval(showSlides, timeValue);
    bar.classList.add('active');
  } else if (sw === 'restart') {
    bar.classList.remove('active');
    clearInterval(time);
    setTimeout(() => {
      bar.classList.add('active');
    }, 1);
    time = setInterval(showSlides, timeValue);
  } else {
    slide.style.display = 'none';
    clearInterval(time);
  }
};

createAutoComplete();
createHeroImage();
