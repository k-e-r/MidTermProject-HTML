const fetchData = async () => {
  const response = await axios.get('https://api.annict.com/v1/works', {
    params: {
      access_token: 'M6Vyw8ESfMMLQy7sAlfRdTeVhSuFvTh2GXTHw2nd8_A',
      filter_title: 'shirobako',
    },
  });

  console.log(response.data);
};

fetchData();
