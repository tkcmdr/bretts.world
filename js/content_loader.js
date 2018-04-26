var contentURL = "https://raw.githubusercontent.com/tkcmdr/bretts.world/master/data/content.json";
var articleDir  = "https://raw.githubusercontent.com/tkcmdr/bretts.world/master/articles/";
var contentContainer = document.getElementById("content-container");

function CreateContentItem(item, isRight, contentID, isURLTarget)
{
    var content = document.createElement("div");
    var image   = document.createElement("img");
    var title   = document.createElement("h1");
    var body    = document.createElement("div");

    content.classList       = "content-item" + (isURLTarget ? " open" : "");
    content.id              =  contentID;
    content.style.animation = "slide" + (isRight?"Right":"Left") + " 1.5s";

    image.id        = contentID + "-img";
    image.classList = "content-image";
    image.style     = "float:" + (isRight?"right":"left");
    image.src       = item.imagePath;

    title.id        = contentID + "-title";
    title.classList = "content-title";
    title.innerHTML = item.title;

    body.id         = contentID + "-body";
    body.classList  = "content-body";

    content.appendChild(image);
    content.appendChild(title);
    content.appendChild(body);
    
    title.addEventListener("click", function()
    {
        ToggleContent(contentID);
    });

    return content;
}

function LoadBodyContent(xhr, bodyID)
{
    var body = document.getElementById(bodyID);

    if (xhr.status == "200" && body)
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
            var isURLTarget = location.hash.substring(1) === item.articleName;
            
            var contentHTML = CreateContentItem(item, isRight, item.articleName, isURLTarget);

            setTimeout(function()
            {
                contentContainer.appendChild(contentHTML);

                DataRequest(
                    "text",
                    "GET",
                    articleDir + item.articleName + ".html",
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