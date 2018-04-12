var contentURL = "https://raw.githubusercontent.com/tkcmdr/bretts.world/master/data/content.json";
var contentContainer = document.getElementById("content-container");

var itemStyle1  = ""

function CreateContentItem(item, side)
{
    var newHTML = document.createElement("div");
    
    newHTML.innerHTML = "<img class='content-image' style='float:" +
        side.toLocaleLowerCase() + "' src='img/" +
        item.image + "'><h1 class='content-title'>" + 
        item.title + "</h1>";
    newHTML.className = "content-item";
    newHTML.style.animation = "slide" + side + " 1.5s";
    newHTML.addEventListener("click", function()
    {
        DisplayContent(newHTML);
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
                setTimeout(function()
                {
                    var side = itemCounter%2==0 ? "Right" : "Left";
                    var newHTML = CreateContentItem(item, side);
                    
                    contentContainer.appendChild(newHTML);
                    itemCounter++;
                }, itemCounter * 500);
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