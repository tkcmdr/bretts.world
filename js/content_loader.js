var contentURL = "https://raw.githubusercontent.com/tkcmdr/bretts.world/master/data/content.json";
var articleDir  = "https://raw.githubusercontent.com/tkcmdr/bretts.world/master/articles/";
var contentContainer = document.getElementById("content-container");

function CreateContentItem(item, isRight, contentID)
{
    var newHTML = document.createElement("div");
    var itemID  = "content-" + contentID;
    
    newHTML.innerHTML = "<img class='content-image' style='float:" +
        (isRight?"right":"left") + "' src='" +
        item.imagePath + "'><h1 class='content-title'>" + 
        item.title + "</h1><div id='" + itemID + "-body" + 
        "' class='content-body'></div>";
    newHTML.className       = "content-item";
    newHTML.id              =  itemID;
    newHTML.style.animation = "slide" + (isRight?"Right":"Left") + " 1.5s";

    newHTML.addEventListener("click", function()
    {
        ToggleContent(itemID);
    });

    return newHTML;
}

function LoadBodyContent(xhr, bodyID)
{
    var body = document.getElementById(bodyID);

    if (xhr.status == "200" && body != "undefined")
    {
       body.innerHTML = xhr.responseText;
    }
}

function LoadContent()
{
    if (this.status == "200")
    {
        var responseText    = this.response;
        var responseJSON    = JSON.parse(responseText);
        var itemCounter     = 0;
        
        responseJSON.forEach(item =>
        {
            itemCounter++;

            var isRight     = itemCounter%2==0;
            var contentHTML = CreateContentItem(item, isRight, itemCounter);

            setTimeout(function()
            {
                contentContainer.appendChild(contentHTML);

                DataRequest(
                    "text",
                    "GET",
                    articleDir + item.articlePath,
                    function()
                    {
                        LoadBodyContent(this, contentHTML.id + "-body");
                    },
                    true
                );
            }, itemCounter * 250);                                
        });
    }
}
    
function DataRequest(dataType, mode, url, callback, async, data)
{
    var xhr = new XMLHttpRequest();
    xhr.onload = callback;
    xhr.responseType = dataType;
    
    xhr.open(mode, url, async);
    xhr.send(data);
}
    
window.addEventListener("load", function()
{
    DataRequest("text", "GET", contentURL, LoadContent, true);
});