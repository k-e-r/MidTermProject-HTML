const apiData = {
  general: {
    id: {
      appId: '1001664570423200416',
      affId: '0ab15da8.13a0f7f4.0ab15da9.075fbfdf',
    },
    url: {
      books:
        'https://app.rakuten.co.jp/services/api/BooksBook/Search/20170404?',
      games:
        'https://app.rakuten.co.jp/services/api/BooksGame/Search/20170404?',
      anime: 'https://app.rakuten.co.jp/services/api/BooksDVD/Search/20170404?',
    },
  },
  books: {
    genreId: {
      comic: '001001',
      lnovel: '001017',
      novel: '001003001002',
      art: '001009009007',
    },
    genreName: {
      '001001': 'Comic',
      '001017': 'Light Novel',
      '001003001002': "Children's Novel",
      '001009009007': 'Drawing',
    },
  },
  games: {
    genreId: {
      game: '006',
      ps5: '006515',
      sw: '006514',
      xbox: '006516',
    },
    genreName: {
      '006': 'Total',
      '006515': 'PS5',
      '006514': 'Nintendo Switch',
      '006516': 'Xbox Series X',
    },
  },
  anime: {
    genreId: {
      anime: '003206002',
      action: '003206002001',
      sf: '003206002002',
      fantasy: '003206002004',
    },
    genreName: {
      '003206002': 'Total',
      '003206002001': 'Action',
      '003206002002': 'SF',
      '003206002004': 'Fantasy',
    },
  },
};

const searchItems = async (
  keyword,
  sortVal = '-releaseDate',
  genreId = apiData.books.genreId.comic,
  hitsVal = 30, // max 30
  outOfStock = 0
) => {
  const url =
    genreId.indexOf('001') === 0
      ? apiData.general.url.books
      : genreId.indexOf('006') === 0
      ? apiData.general.url.games
      : apiData.general.url.anime;
  if (keyword === '') {
    const response = await axios.get(url, {
      params: {
        booksGenreId: genreId,
        applicationId: apiData.general.id.appId,
        affiliateId: apiData.general.id.affId,
        hits: hitsVal,
        sort: sortVal,
      },
    });

    console.log(response.data);
    return response.data;
  } else {
    const response = await axios.get(url, {
      params: {
        title: keyword,
        booksGenreId: genreId,
        applicationId: apiData.general.id.appId,
        affiliateId: apiData.general.id.affId,
        hits: hitsVal,
        sort: sortVal,
        outOfStockFlag: outOfStock,
      },
    });

    console.log(response.data);
    return response.data;
  }
};
