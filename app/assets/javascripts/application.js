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
    var xhr;
    if (window.XMLHttpRequest) {
        xhr = new XMLHttpRequest();
    } 
    else {
        xhr = new ActiveXObject("MSXML2.XMLHTTP.3.0"); 
    }

    if ("withCredentials" in xhr) 
    {
        // XHR for Chrome/Firefox/Opera/Safari
        xhr.open(method, url, true); 
        xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    }
    else if (typeof XDomainRequest != "undefined")
    {
        // XDomainRequest for IE.
        // to set the content type in IE use 
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


function makeCORSRequest(method, url, payload) {
    var xhr = createCORSRequest(method, url);

    if(!xhr) 
    {
        alert('CORS not supported'); 
        return;
    }

    
    // Response handlers.
    
    xhr.onload = function() {
        // parse the response from the server
        var response = JSON.parse(xhr.responseText);

        if (response.status == 'success') {
            // add the logic to update the DOM here
            // a flash message or someway to notify the 
            // user that the message is successful
            alert('this is the onload function');
        } else {

        }
    }

    xhr.onerror = function() {
        alert('There was an error making the request to ' + url ); 
    }

    xhr.send(payload);
}


function serialForm(el) {;
    var arr = [];

    for (var i = 0;  i < el.elements.length; i++) {
        if (el.elements[i].type != 'submit') {
            arr.push(el.elements[i].name + "=" + encodeURIComponent(el.elements[i].value));
            arr.push("&");
        } 
    }
    arr.pop();
    return arr.join('');
}


$(document).ready(function(){
    $('#send-the-form').click(function(e){

        // prevent the form from submitting non-ajax
        e.preventDefault(); 

        // set vars
        var form    = document.getElementById('send-it'),
            method  = 'POST'
            payload = serialForm(form);
            url     = 'http://68b8e7eb.ngrok.com/sends/recreate'

        // make the request
        makeCORSRequest(method, url, payload);
        //alert('hello there');
    });

});



