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
};

const searchItems = async (
  keyword,
  sortVal = '-releaseDate',
  genreId = apiData.books.genreId.comic,
  hitsVal = 30, // max 30
  outOfStock = 0
) => {
  const url =
    genreId === apiData.books.genreId.comic ||
    genreId === apiData.books.genreId.lnovel ||
    genreId === apiData.books.genreId.novel ||
    genreId === apiData.books.genreId.art
      ? apiData.general.url.books
      : apiData.general.url.games;
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
