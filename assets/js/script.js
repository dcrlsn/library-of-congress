var formatInput = document.querySelector('#search-criteria')
var searchInput = document.querySelector('#search-text')
var searchFormElement = document.querySelector('form')
var searchFormCheck = document.querySelector('#search-form1')

const params = {}
document.location.search.substr(1).split('&').forEach(pair => {
  [key, value] = pair.split('=')
  params[key] = value
})

if (!searchFormCheck) {
  getLoCRequest(params.f, params.q)
}

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
    location.replace(`search.html?q=${searchTerm}&f=${formatTerm}`);
    if (searchTerm) {
      formatInput = "";
      searchInput = "";
    } else alert('Please enter a search term');
  })
