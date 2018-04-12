var contentURL = "https://raw.githubusercontent.com/tkcmdr/bretts.world/master/data/content.json";
var contentContainer = document.getElementById("content-container");

function CreateContentItem(item, isRight, contentID)
{
    var newHTML = document.createElement("div");
    var bodyID  = "content-body-" + contentID;
    
    newHTML.innerHTML = "<img class='content-image' style='float:" +
        (isRight?"right":"left") + "' src='img/" +
        item.image + "'><h1 class='content-title'>" + 
        item.title + "</h1><div id='" + bodyID + 
        "' class='content-body'>" + item.body + "</div>";
    newHTML.className       = "content-item";
    newHTML.id              =  "content-" + contentID;
    newHTML.style.animation = "slide" + (isRight?"Right":"Left") + " 1.5s";
    newHTML.addEventListener("click", function()
    {
        ToggleBody(bodyID);
    });

    return newHTML;
}

function LoadContent()
{
    if (this.status == "200")
    {
        var responseText    = this.response;
        var responseJSON    = JSON.parse(responseText);
        var itemCounter     = 1;
        
        responseJSON.forEach(item =>
        {
            var isRight = itemCounter%2==0;
            var contentHTML = CreateContentItem(item, isRight, itemCounter);

            setTimeout(function()
            {
                contentContainer.appendChild(contentHTML);
            }, itemCounter * 250);

            itemCounter++;                                
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
    XHRRequest("text", "GET", contentURL, LoadContent, true)
});