var request = require("request");

var options = {
  method: 'GET',
  url: 'http://3g.163.com/news/19/0403/18/EBRVPH950001875P.html',
  headers: {
    'Postman-Token': 'cb92e01a-c66f-40d7-b8a0-ce1b98dc51ac',
    'cache-control': 'no-cache'
  }
};

request(options, function (error, response, body) {
  if (error) throw new Error(error);

  console.log(body);
});
