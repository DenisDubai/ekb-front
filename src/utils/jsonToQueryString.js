const cleanObj = obj => {
  for (const propName in obj) {
    if (obj[propName] === null || obj[propName] === undefined || obj[propName] === '') {
      delete obj[propName];
    }
  }
  return obj;
};

export const jsonToQueryString = json => {
    const data = cleanObj(json);
    return (
      '?' +
      Object.keys(data)
        .map(function(key) {
          return encodeURIComponent(key) + '=' + encodeURIComponent(json[key]);
        })
        .join('&')
    );
  };
  