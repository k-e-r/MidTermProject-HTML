const debounce = (func, delay = 1000) => {
  let timeoutId;
  return (...args) => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    timeoutId = setTimeout(() => {
      func.apply(null, args);
    }, delay);
  };
};

const searchTitle = async (title) => {
  const response = await axios.get('https://api.annict.com/v1/works', {
    params: {
      access_token: 'M6Vyw8ESfMMLQy7sAlfRdTeVhSuFvTh2GXTHw2nd8_A',
      filter_title: title,
      sort_season: 'desc',
    },
  });

  console.log(response.data);
  return title === '' ? '' : response.data;
};

const searchSeason = async (season) => {
  const response = await axios.get('https://api.annict.com/v1/works', {
    params: {
      access_token: 'M6Vyw8ESfMMLQy7sAlfRdTeVhSuFvTh2GXTHw2nd8_A',
      filter_season: season,
      sort_watchers_count: 'desc',
    },
  });

  console.log(response.data);
  return season === '' ? '' : response.data;
};
