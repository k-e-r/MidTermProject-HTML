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

const checkSeason = () => {
  const winter = Array(3).fill('winter');
  const spring = Array(3).fill('spring');
  const summer = Array(3).fill('summer');
  const autumn = Array(3).fill('autumn');
  const season = winter.concat(spring, summer, autumn);
  const date = new Date();
  return date.getFullYear() + '-' + season[date.getMonth()];
};

const searchTitle = async (title) => {
  const response = await axios.get('https://api.annict.com/v1/works', {
    params: {
      access_token: '',
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
      access_token: '',
      filter_season: season,
      sort_watchers_count: 'desc',
    },
  });

  console.log(response.data);
  return season === '' ? '' : response.data;
};
