var contentURL = "https://raw.githubusercontent.com/tkcmdr/bretts.world/master/data/content.json";

// Toggles the content in question open or closed.
function ToggleContent(contentID)
{
    document.getElementById(contentID).classList.toggle("open");
}

window.addEventListener("load", function()
{
    // We load all the page content when the page is ready.
    DataRequest("text", "GET", contentURL, LoadContent, true);
});