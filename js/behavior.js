var contentContainer    = document.getElementById("content-container");
var contentWindow       = document.getElementById("content-window")
var mainPage            = true;

function ToggleBody(bodyID)
{
    var body            = document.getElementById(bodyID);
    var displayMode     = body.style.display=="none"?"block":"none";
    
    body.style.display  = displayMode;
}