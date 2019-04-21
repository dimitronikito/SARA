var $results = $("#search-results");

function result(title, url, description) {
  this.title = title;
  this.url = url;
  this.description = description;
}

var resultArr = [];
var title, url, desc;

function downloadCSV(arr) {
  var row, csv = '';

  for (var index in arr[0]) {
    row += index + ',';
  }
  row = row.slice(0, -1);
  csv += row + '\r\n';

  for (var i = 0; i < arr.length; i++) {
    var row = '';
    for (var index in arr[i]) {
      row += '"' + arr[i][index] + '",';
    }
    row.slice(0, row.length - 1);
    csv += row + '\r\n';
  }
  console.log(csv);

  var link = document.createElement("a");
  link.id="downloadLink";

  document.body.appendChild(link);
  blob = new Blob([csv], {type: 'text/csv'});
  var csvUrl = window.webkitURL.createObjectURL(blob);
  var filename = 'searchResults.csv';

  $("#downloadLink")
  .attr({
    'download': filename,
    'href': csvUrl
  });
  $('#downloadLink')[0].click();
  document.body.removeChild(link);
}

function downloadJSON(arr) {
  var dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(arr));
  var downloadAnchorNode = document.createElement('a');
  downloadAnchorNode.setAttribute("href",     dataStr);
  downloadAnchorNode.setAttribute("download", "searchResults.json");
  document.body.appendChild(downloadAnchorNode); // required for firefox
  downloadAnchorNode.click();
  downloadAnchorNode.remove();
}

function JSONtoXML(obj) {
  xml = '<?xml version="1.0" encoding="UTF-8"?> \n<results> \n';
  for (var i = 0; i < obj.length; i++) {
    xml += "<result> \n";
    for (var prop in obj[i]) {
      if (!obj[i].hasOwnProperty(prop)) {
        continue;
      }
      xml += "<" + prop + ">";
      if (typeof obj[i][prop] == "object")
        xml += JSONtoXML(new Object(obj[i][prop]));
      else
        xml += obj[i][prop];
      xml += "</" + prop + "> \n";
    }
    xml += "</result> \n";
  }
  xml += "</results>";

  return xml;
}

function downloadXML(xml) {
  var link = document.createElement("a");
  link.id="downloadLink";

  document.body.appendChild(link);
  blob = new Blob([xml], {type: 'text/xml'});
  var xmlUrl = window.webkitURL.createObjectURL(blob);
  var filename = 'searchResults.xml';

  $("#downloadLink")
  .attr({
    'download': filename,
    'href': xmlUrl
  });
  $('#downloadLink')[0].click();
  document.body.removeChild(link);
}

function download(format) {

  $('input[type=checkbox]:checked').parent().each(function (i) {
    title = this.getElementsByTagName("h3")[0];
    title = ($(title).text());

    url = this.getElementsByTagName("h4")[0];
    url = ($(url).text());

    desc = this.getElementsByTagName("p")[0];
    desc = ($(desc).text());

    resultArr[i] = new result(title, url, desc);
  });

  if (resultArr.length > 0) {
    $("#download-head").html('<p class = "lead"> download in csv, json, or xml formats! </p>');
    switch(format) {
      case 'csv':
        downloadCSV(resultArr);
        break;
      case 'json':
        downloadJSON(resultArr);
        break;
      case 'xml':
        JSONtoXML(resultArr);
        downloadXML(xml);
        break;
      default:
        null
      }
  }
  else $("#download-head").html('<p class = "lead error"> check off at least 1 result! </p>');

}
