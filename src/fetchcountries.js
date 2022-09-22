const ffol = function (name) {
  return fetch(`https://restcountries.com/v3.1/name/${name}`).then(response => {
    if (response.status !== 404) {
      return response.json();
    } else {
      throw new Error(response.status);
    }
  });
};
export default { ffol };
