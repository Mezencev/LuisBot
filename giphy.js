const request = require('request-promise-native');

const apiKey = process.env.KeyGiphyService;

module.exports.getGiphy = async function (searchString) {
  try {
    const options = {
      method: 'GET',
      uri: 'https://api.giphy.com/v1/gifs/translate',
      qs: {
        s: searchString,
        api_key: apiKey,
      },
    };
    return await request.get(options);
    // return rp(options);
  } catch (error) {
    console.log(error);
  }
};

