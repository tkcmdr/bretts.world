var articleDir          = "https://raw.githubusercontent.com/tkcmdr/bretts.world/master/articles/";
var contentContainer    = document.getElementById("content-container");
var taglineElement      = document.getElementById("tagline-element");

// Called when the page content is to be loaded.
function LoadContent()
{
    if (this.status == "200")
    {
        var responseJSON    = JSON.parse(this.response);
        var itemCounter     = 0;
        
        // Basically what we're doing here is looping through each article object, and rendering it into existence with a cool animation. Each object is loaded 0.25ms after the one before it, and the image and title are inverted each time for an even neater aesthetic.
        responseJSON.forEach(item =>
        {
            itemCounter++;

            var isRight     = itemCounter%2==0;
            var isURLTarget = location.hash.substring(1) === item.articleName;

            LoadArticleAfterDelay(
                item.articleName,
                CreateContentItem(item, isRight, item.articleName, isURLTarget),
                itemCounter * 250 // Delay is in milliseconds, so we load in increments of 250ms.
            );                        
        });
    }
}

// A helper function to create a content element, then return it.
function CreateContentItem(item, isRight, contentID, isURLTarget)
{
    var content = document.createElement("div");
    var title   = document.createElement("h1");
    var body    = document.createElement("div");

    content.classList       = "content-item article" + (isURLTarget ? " open" : "");
    content.id              =  contentID;
    content.style.animation = "slide" + (isRight?"Right":"Left") + " 2s";

    title.id        = contentID + "-title";
    title.classList = "content-title";
    title.innerHTML = item.title;

    body.id         = contentID + "-body";
    body.classList  = "content-body";

    title.addEventListener("click", function()
    {
        ToggleContent(contentID);
    });

    if (item.imagePath != "null")
    {
        var image   = document.createElement("img");

        image.id        = contentID + "-img";
        image.classList = "content-image";
        image.style     = "float:" + (isRight?"right":"left");
        image.src       = item.imagePath;

        image.addEventListener("click", function()
        {
            ToggleContent(contentID);
        });

        content.appendChild(image);
    }

    content.appendChild(title);
    content.appendChild(body);

    return content;
}

// Loads given article (html) after specified delay. The article name is used to find the article path.
function LoadArticleAfterDelay(name, html, delay)
{
    setTimeout(function()
    {
        contentContainer.appendChild(html);

        DataRequest(
            "text",
            "GET",
            articleDir + name + ".html",
            function()
            {
                LoadBodyContent(this, html.id + "-body");
            },
            true
        );
    }, delay);
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

// Populates the tagline element with a random tagline from taglines.json.
function LoadTagline()
{
    if (this.status == "200")
    {
        var response = JSON.parse(this.response);
        var number = Math.floor(Math.random()*response.length);
        taglineElement.innerHTML = response[number];
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