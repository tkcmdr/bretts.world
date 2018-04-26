var contentContainer    = document.getElementById("content-container");
var contentWindow       = document.getElementById("content-window");
var mainPage            = true;

function ToggleContent(contentID)
{
    document.getElementById(contentID).classList.toggle("open");
}

window.addEventListener("load", function()
{
    DataRequest("text", "GET", contentURL, LoadContent, true);
});