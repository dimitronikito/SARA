var file = document.getElementById("upload-file");
var searchbar = $('#searchinput');
var results = $('#from-file-results');
var resultsHead = $('#results-head');

var count = 0;
var found = false;

file.addEventListener("change", handleFiles, false);
function handleFiles() {
  fileList = this.files[0];
}

$('#file-search-button').click(function() {
  try {
    displayResults(fileList);
  } catch (ReferenceError) {
    results.html('<p class="error lead step"> please upload a csv, json, or xml file </p>');
  }
});

function Data(title, url, description) {
  this.title = title;
  this.url = url;
  this.description = description;
}

var checkBox = "<div class='checkbox'><input type='checkbox'>";

function handleCSV(csvfile, input) {
  results.html("");
  resultsHead.html("<p class='lead step'> searching for '" + input + "' in " + csvfile.name + "...</p>");
  var csvReader = new FileReader();

  csvReader.onload = function(event) {
    var content = event.target.result;
    var rows = content.split('\n');
    var csvDataSet = [];

    for (var i = 0; i < rows.length - 1; i++) {
      var parsed = rows[i].split(',');
      csvDataSet[i] = new Data(parsed[0], parsed[1], parsed[2]);

      Object.keys(csvDataSet[i]).forEach(function(key) {
        if (csvDataSet[i][key].toLowerCase().includes(input)) {
          found = true;
        }
      });
      if (found) {
        results.append(checkBox+"<h3 class='fixed-result'> <a target='_blank' href=http://www." + parsed[1] + "> " + parsed[0] + " </a> </h3> <h4 class='fixed-result-url'>" + parsed[1] + "</h4> <p class='lead fixed-result-desc'>" + parsed[2] + "</p></div>");
        found = false;
        count++;
      }
    }
    resultsHead.append("<h3>" + count + " results </h3>" );
    count = 0;
  }
  var csvdata = csvReader.readAsText(csvfile);
}

function handleJSON(jsonfile, input) {
  results.html("");
  resultsHead.html("<p class='lead step'> searching for '" + input + "' in " + jsonfile.name + "...</p>");
  var jsonReader = new FileReader();

  jsonReader.onload = function(event) {
    var content = event.target.result;
    var parsed = JSON.parse(content);
    var data = parsed["Result"];
    var found = false;
    for (i in data) {
      Object.keys(data[i]).forEach(function(key) {
        if (data[i][key].toLowerCase().includes(input)) {
          found = true;
        }
      });
      if (found) {
        results.append(checkBox+"<h3 class='fixed-result'> <a target='_blank' href=http://www." + data[i].url + "> " + data[i].title + " </a> </h3><h4 class='fixed-result-url'>" + data[i].url + "</h4><p class='lead fixed-result-desc'>" + data[i].description + "</p> </div>");
        found = false;
        count++;
      }
    }
    resultsHead.append("<h3>" + count + " results </h3>" );
    count = 0;
  }
  var jsondata = jsonReader.readAsText(jsonfile);
}

function handleXML(xmlfile, input) {
  results.html("");
  resultsHead.html("<p class='lead step'> searching for '" + input + "' in " + xmlfile.name + "...</p>");
  var xmlReader = new FileReader();

  xmlReader.onload = function(event) {
    var content = event.target.result;
    parser = new DOMParser();
    xmlDoc = parser.parseFromString(content, "text/xml");
    var n = $(xmlDoc).find('result').length;
    var xmlDataSet = [];

    for (var i = 0; i < n; i++) {
      var title = $(xmlDoc).find('title').eq(i).text();
      var url = $(xmlDoc).find('url').eq(i).text();
      var description = $(xmlDoc).find('description').eq(i).text();
      xmlDataSet[i] = new Data(title, url, description);

      Object.keys(xmlDataSet[i]).forEach(function(key) {
        if (xmlDataSet[i][key].toLowerCase().includes(input)) {
          found = true;
        }
      });
      if (found) {
        results.append(checkBox+"<h3 class='fixed-result'> <a target='_blank' href=http://www." + url + ">" + title + "</a> </h3><h4 class='fixed-result-url'>" + url + "</h4><p class='lead fixed-result-desc'>" + description + "</p> </div>");
        found = false;
        count++;
      }
    }
    resultsHead.append("<h3>" + count + " results </h3>" );
    count = 0;
  }
  var xmldata = xmlReader.readAsText(xmlfile);
}


function displayResults(upload) {
  resultsHead.html("");
  var input = searchbar.val().toLowerCase();
  if (upload.type === ("text/csv")) handleCSV(upload, input);
  else if (upload.type === ("application/json")) handleJSON(upload, input);
  else if (upload.type === ("text/xml")) handleXML(upload, input);
  else resultsHead.html('<h3 class="error"> please upload a csv, json, or xml file');
}
