function getLoCRequest(option, term) {
  var apiUrl;
  if (option === "") {
    apiUrl = `https://www.loc.gov/search/?q=${term}&fo=json`;
  }
  else apiUrl = `https://www.loc.gov/${option}/?q=${term}&fo=json`;

  fetch(apiUrl)
    .then(function (response) {
      if (response.ok) response.json();
      else alert('Error: ' + response.statusText);
    })
    .then(function (data) {
      displayMovie(data, movie);
    })
    .catch(function (error) {
      alert("Unable to connect to the Library of Congress, probably trump's fault.");
    });
  ;
};

function displayLoCResults(data) {
  if (data.length === 0) {
    issueContainerEl.textContent = 'Your search returned no results';
    return;
  }

  for (var item of data.results) {
    var resultBlock = document.createElement('div');
    resultBlock.classList = '';

    var titleElement = document.createElement('h1');
    titleElement.textContent = item.title;
    resultBlock.appendChild(titleElement);

    var descriptionElement = document.createElement('p');
    descriptionElement.textContent = item.description

    resultBlock.appendChild(typeEl);
    issueContainerEl.appendChild(resultBlock);
  }
};
