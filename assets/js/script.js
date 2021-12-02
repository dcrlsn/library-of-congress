var formatInput = document.querySelector('#search-criteria')
var searchInput = document.querySelector('#search-text')
var searchFormElement = document.querySelector('#search-form2')
var resultsContainer = document.querySelector('#something')

function getLoCRequest() {
  var apiUrl;
  if (format === "") {
    apiUrl = `https://www.loc.gov/search/?q=${term}&fo=json`;
  }
  else apiUrl = `https://www.loc.gov/${format}/?q=${term}&fo=json`;

  fetch(apiUrl)
    .then(function (response) {
      if (response.ok) response.json();
      else alert('Error: ' + response.statusText);
    })
    .then(function (data) {
      displayLoCResults(data);
    })
    .catch(function (error) {
      alert("Unable to connect to the Library of Congress, probably trump's fault.");
    });
  ;
};

function displayLoCResults(data) {
  if (data.length === 0) return resultsContainer.textContent = 'Your search returned no results';

  for (var item of data.results) {
    var resultBlock = document.createElement('div');
    resultBlock.classList = '';

    var titleElement = document.createElement('h1');
    titleElement.textContent = item.title;
    resultBlock.appendChild(titleElement);

    var descriptionElement = document.createElement('p');
    descriptionElement.textContent = item.description
    resultBlock.appendChild(titleElement);

    resultBlock.appendChild(typeEl);
    resultsContainer.appendChild(resultBlock);
  }
};

searchFormElement.addEventListener('submit',
  function (event) {
    event.preventDefault();

    var searchTerm = searchInput.value.replace(/s\s/g, "+");
    var formatTerm = formatInput.value
    if (searchTerm) {
      getLoCRequest(formatTerm, searchTerm);
      searchInput.value = '';
      formatInput.value = '';
    } else alert('Please enter a search term');
  })
