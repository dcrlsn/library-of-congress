var formatInput = document.querySelector('#search-criteria')
var searchInput = document.querySelector('#search-text')
var searchFormElement = document.querySelector('#search-form1')

function getLoCRequest(format, term) {
  var apiUrl;
  if (format === "") {
    apiUrl = `https://www.loc.gov/search/?q=${term}&fo=json`;
  }
  else apiUrl = `https://www.loc.gov/${format}/?q=${term}&fo=json`;
  fetch(apiUrl)
    .then(function (response) {
      if (response.ok) return response.json();
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
  var resultsContainer = document.querySelector('#results-container')
  if (!data) return resultsContainer.textContent = 'Your search returned no results';

  for (var item of data.results) {
    var resultsDiv = document.createElement('div');

    var titleElement = document.createElement('h1');
    console.log(item.title)
    titleElement.textContent = item.title;
    resultsDiv.appendChild(titleElement);

    var descriptionElement = document.createElement('p');
    descriptionElement.textContent = item.description
    resultsDiv.appendChild(descriptionElement);
    resultsContainer.appendChild(resultsDiv)
  }
};

searchFormElement.addEventListener('submit',
  function (event) {
    event.preventDefault();

    var searchTerm = searchInput.value.replace(/\s/g, "+");
    var formatTerm = formatInput.value
    if (searchTerm) {
      getLoCRequest(formatTerm, searchTerm);
      searchInput.value = '';
      formatInput.value = '';
    } else alert('Please enter a search term');
  })
