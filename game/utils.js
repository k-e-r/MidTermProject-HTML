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

const searchGames = async (
  keyword,
  sortVal = '-releaseDate',
  hitsVal = 30,
  GenreId = '006'
) => {
  if (keyword === '') {
    const response = await axios.get(
      'https://app.rakuten.co.jp/services/api/BooksGame/Search/20170404?',
      {
        params: {
          booksGenreId: GenreId, // game
          applicationId: '1001664570423200416',
          affiliateId: '0ab15da8.13a0f7f4.0ab15da9.075fbfdf',
          hits: hitsVal, // max 30
          sort: sortVal,
        },
      }
    );

    return response.data;
  } else {
    const response = await axios.get(
      'https://app.rakuten.co.jp/services/api/BooksGame/Search/20170404?',
      {
        params: {
          title: keyword,
          booksGenreId: GenreId, // game
          applicationId: '1001664570423200416',
          affiliateId: '0ab15da8.13a0f7f4.0ab15da9.075fbfdf',
          hits: hitsVal, // max 30
          sort: sortVal,
          outOfStockFlag: 1,
        },
      }
    );

    console.log(response.data);
    return response.data;
  }
};
