import axios from 'axios';

const options = {
  method: 'POST',
  url: 'https://www.virustotal.com/api/v3/urls',
  headers: {
    accept: 'application/json',
    'content-type': 'application/x-www-form-urlencoded'
  }
};

axios
  .request(options)
  .then(function (response) {
    console.log(response.data);
  })
  .catch(function (error) {
    console.error(error);
  });