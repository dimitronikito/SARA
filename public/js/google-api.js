var json_api_key = "AIzaSyCshjTXvmxSyUgceMhDG31EIGsO71UWOLc";
var custom_search_key = "AIzaSyC_YJay-YFw2HJJ4yW-OUNCKPcvwaXjSeo";
var url = "https://www.googleapis.com/customsearch/v1";
var cx = '010899884897236485615:zcnahc-yrs8';

var resultshtml = $("#search-results");

function Data(title, url, description) {
  this.title = title;
  this.url = url;
  this.description = description;
}

var checkBox = "<div class='checkbox'><input type='checkbox'>";

function googleSearch() {
  var input = $('#query').val();
  $.ajax({
    dataType:"json",
    type: "GET",
    url: url + "?key=" + json_api_key + "&cx=" + cx + "&q=" + input,
    success: function(response) {
      resultshtml.html("");
      var data = response.items;
      for (var i=0; i < data.length; i++) {
        var results = [];
        results[i] = new Data(data[i].title, data[i].link, data[i].snippet);

        resultshtml.append(checkBox + "<h3 class='result'> <a target='_blank' href='" + results[i].url + "'> " + results[i].title + " </a> </h3><h4 class='result-url'>" + results[i].url + "</h4><p class='lead result-desc'>" + results[i].description + "</p> </div>");
      }
    },
    error: function(xhr) {
      console.log(xhr);
    }
  });
}
