// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or vendor/assets/javascripts of plugins, if any, can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// the compiled file.
//
// WARNING: THE FIRST BLANK LINE MARKS THE END OF WHAT'S TO BE PROCESSED, ANY BLANK LINE SHOULD
// GO AFTER THE REQUIRES BELOW.
//
//= require jquery
//= require jquery_ujs
//= require_tree .


// Create the XHR object.

function createCORSRequest(method, url) {
    var xhr = new XMLHttpRequest();
    if ("withCredentials" in xhr) 
    {
        // XHR for Chrome/Firefox/Opera/Safari
        xhr.open(method, url, true); 
    }
    else if (typeof XDomainRequest != "undefined")
    {
        // XDomainRequest for IE.
        xhr = new XDomainRequest(); 
        xhr.open(method, url);
    }
    else
    {
        // CORS not supported
        xhr = null 
    }
    return xhr;
}

// Helper method to parse the title tag from the response.
function getTitle(text) {
    return text.match('<title>(.*)?</title>')[1];
}

function makeCORSRequest() {
    var url = 'this should be dynamic';

    var xhr = createCORSRequest('GET', url);
    if(!xhr) 
    {
        alert('CORS not supported'); 
        return;
    }
    
    // Response handlers.
    xhr.onload = function() {
        var text = xhr.responseText; 
        var title = getTitle(text);
        alert('Response from CORS request to ' + url + ': ' + title);
    }

    xhr.onerror = function() {
        alert('There was an error making the request to ' + url + ': ' + title); 
    }

    xhr.send();
}



$(document).ready(function(){
    $('#send-the-form').click(function(e){
        e.preventDefault(); 
        var xhr = new XMLHttpRequest();


        xhr.open('GET', 'http://7b535f74.ngrok.com/sends/test_orig');

        xhr.onload = function() {
            var text = xhr.responseText; 
            console.log(text);
        }

        xhr.send('phone=8582005141&content_url=https://www.filepicker.io/api/file/9BrMUEm9THesOw9jhwGQ');



    });
});
