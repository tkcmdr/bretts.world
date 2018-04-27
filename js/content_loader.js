var articleDir          = "https://raw.githubusercontent.com/tkcmdr/bretts.world/master/articles/";
var contentContainer    = document.getElementById("content-container");
var taglineElement      = document.getElementById("tagline-element");

// A helper function to create a content element, then return it.
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
    
    // Adding event listeners to both the image and title are required, as adding an event listener to the parent element can lead to accidental closing of the content.
    title.addEventListener("click", function()
    {
        ToggleContent(contentID);
    });
    
    image.addEventListener("click", function()
    {
        ToggleContent(contentID);
    });

    return content;
}

// Called when the body of the content has been retrieved.
function LoadBodyContent(xhr, bodyID)
{
    var body = document.getElementById(bodyID);

    if (xhr.status == "200" && body)
    {
       body.innerHTML = xhr.responseText;
    }
}

// Called when the page content is to be loaded.
function LoadContent()
{
    if (this.status == "200")
    {
        var responseJSON    = JSON.parse(this.response);
        var itemCounter     = 0;
        
        // Basically what we're doing here is looping through each article object, and rendering it into existence with a cool animation. Each object is loaded 0.250ms after the one before it, and the image and title are inverted for an even neater aesthetic.
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

function LoadTagline()
{
    if (this.status == "200")
    {
        var response = JSON.parse(this.response);
        taglineElement.innerHTML = response[Math.floor(Math.random()*response.length + 1)];
    }
}

// Helper function for using XMLHttpRequest.
function DataRequest(dataType, mode, url, callback, async, data)
{
    var xhr = new XMLHttpRequest();
    xhr.onload = callback;
    xhr.responseType = dataType;
    
    xhr.open(mode, url, async);
    xhr.send(data);
}