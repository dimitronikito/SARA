var json_api_key = "AIzaSyCshjTXvmxSyUgceMhDG31EIGsO71UWOLc";
var custom_search_key = "AIzaSyC_YJay-YFw2HJJ4yW-OUNCKPcvwaXjSeo";
var url = "https://www.googleapis.com/customsearch/v1";
var cx = '010899884897236485615:zcnahc-yrs8';

var resultshtml = $("#results");
var checkBox = "<div class='checkbox'><input type='checkbox'>";

function Data(title, url, description) {
  this.title = title;
  this.url = url;
  this.description = description;
}

function populateDB() {
  var input = $("#populate").val();
  $.ajax({
    dataType:"json",
    type: "GET",
    url: url + "?key=" + json_api_key + "&cx=" + cx + "&q=" + input,
    success: function(response) {
      var data = response.items;
      results = [];
      for (var i=0; i < data.length; i++) {
        results[i] = new Data(data[i].title, data[i].link, data[i].snippet);

        var parameters = { populate: results[i] };
        $.get('/populate', parameters, function(data) {
          console.log(data);
        });
      }
    },
    error: function(xhr) {
      console.log(xhr);
    }
  });
}

function searchDB() {
  var input = $("#query").val();
  var parameters = { search: input };
  $.get('/search', parameters, function(data) {
    resultshtml.html("");
    if (data == ("no results found")) {
      resultshtml.append("<h3 class = 'lead'> no results found </h3>")
    }
    else {
      for (var i=0; i < data.length; i++) {
        var content = [];
        content[i] = new Data(data[i].title, data[i].url, data[i].description);

        resultshtml.append(checkBox + "<h3 class='result'> <a target='_blank' href='" + content[i].url + "'> " + content[i].title + " </a> </h3><h4 class='result-url'>" + content[i].url + "</h4><p class='lead result-desc'>" + content[i].description + "</p> </div>");
      }
    }
  });
}
