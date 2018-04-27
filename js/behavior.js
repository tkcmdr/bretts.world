var dataDir    = "https://raw.githubusercontent.com/tkcmdr/bretts.world/master/data/";
var contentURL = dataDir + "content.json";
var taglineURL = dataDir + "taglines.json";

// Toggles the content in question open or closed.
function ToggleContent(contentID)
{
    document.getElementById(contentID).classList.toggle("open");
}

window.addEventListener("load", function()
{
    // We load all the page content when the page is ready.
    DataRequest("text", "GET", contentURL, LoadContent, true);
    DataRequest("text", "GET", taglineURL, LoadTagline, true);
});