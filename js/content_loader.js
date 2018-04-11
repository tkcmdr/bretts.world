var contentURL = "https://raw.githubusercontent.com/tkcmdr/bretts.world/master/data/content.json";
var contentContainer = document.getElementById("content-container");

function LoadContent()
{
    if (this.status == "200")
    {
        var responseText = this.response;
        var responseJSON = JSON.parse(responseText);

        console.log(responseText);

        responseJSON.forEach(item => {
            var newDiv = document.createElement("div");
            newDiv.innerHTML = "<img class='content-image' src='img/" +
                item.image + "'><h1 class='content-title'>" + 
                item.title + "</h1>";
            newDiv.className = "content-item";

            contentContainer.appendChild(newDiv);
        });
    }
}

function XHRRequest(dataType, mode, url, callback, async, data)
{
    var xhr = new XMLHttpRequest();
    xhr.onload = callback;
    xhr.responseType = dataType;

    xhr.open(mode, url, async);
    xhr.send(data);
}

window.addEventListener("load", function()
{
    XHRRequest(
        "text",
        "GET",
        contentURL,
        LoadContent,
        true,
        null
    )
});