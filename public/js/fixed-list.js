var fixed = $("#fixed-search-list");

function searchEngine(title, url, description) {
  this.title = title;
  this.url = url;
  this.description = description;
}

var google = new searchEngine("Google", "https://www.google.com/", "The search engine giant holds the first place in search with a stunning difference of 65% from second in place Bing.");
var bing = new searchEngine("Bing", "https://www.bing.com/", "Google's biggest contender, rakes in 33% of U.S. searches and also powers Yahoo, the U.S.'s third biggest search engine.");
var yahoo = new searchEngine("Yahoo", "https://www.yahoo.com/", "Admittedly not the sleekest search engine interface, Yahoo still manages to capture fourth place in our list, with a little over 3% of the worldwide market share.");
var ask = new searchEngine("Ask", "https://www.ask.com/", "Ask.com, formerly Ask Jeeves, is unique due to its question and answer format. While most of Ask.com's sponsored search results are powered by Google, Ask has an original algorithm that favors expertise on a topic over popularity.");
var aol = new searchEngine("AOL", "https://www.aol.com/", "According to netmarketshare the old time famous AOL is still in the top 10 search engines with a market share that is close to 0.06%. The AOL network includes many popular web sites like engadget.com, techchrunch.com and the huffingtonpost.com. On June 23, 2015, AOL was acquired by Verizon Communications.");
var duck = new searchEngine("DuckDuckGo", "https://duckduckgo.com/", "Privacy, simplified. Protect your data as you search and browse. ***Permissions are to block hidden trackers lurking everywhere.***");
var wolframalpha = new searchEngine("Wolframalpha", "https://www.wolframalpha.com", "Compute expert-level answers using Wolfram's breakthrough algorithms, knowledgebase and AI technology");
var archive = new searchEngine("Internet Archive", "https://archive.org/", "archive.org is the internet archive search engine. You can use it to find out how a web site looked since 1996. It is very useful tool if you want to trace the history of a domain and examine how it has changed over the years.");
var baidu = new searchEngine("Baidu", "https://www.baidu.com/", "Baidu is China's largest search engine, capturing over 75% of China's search market. The search engine looks similar to Google (besides being in Mandarin), with a white background, blue links, and green URLs. Like Google, Baidu aims to incorporate more rich features in the SERPs.");
var yandex = new searchEngine("Yandex", "https://yandex.com/", "If you're aiming to capture Russian traffic, Yandex is your best bet, with 65% of total Russian search traffic. Yandex is also popular in Ukraine, Kazakhstan, Turkey, and Belarus. The search engine is available in two languages, English and Cyrillic. Plus, it offers a cloud storage service, so users can search for their files from Yandex's search bar.");

var searchEngines = [google, bing, yahoo, ask, aol, duck, wolframalpha, archive, baidu, yandex];

var checkBox = "<div class='checkbox'><input type='checkbox'>";

function fixedResults(arr) {
  for (i in searchEngines) {
    fixed.append(checkBox + "<h3 class='result'> <a target='_blank' href='" + searchEngines[i].url + "'> " + searchEngines[i].title + " </a> </h3><h4 class='result-url'>" + searchEngines[i].url + "</h4><p class='lead result-desc'>" + searchEngines[i].description + "</p> </div>");
  }
}

$("#fixed-search-button").click(function() {
  fixedResults(searchEngines);
});
