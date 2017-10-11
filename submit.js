//Setup
$(document).ready( function() {
    DisplayOutput();
});

function DisplayOutput() {
	//Get url, which contains GET values.
	var url = new String(window.location);
	
	//Fix some characters
	//url.replace(/+/g, " ");
	//url.replace(/\%40/g, "@");
	//url.replace(/%29/g, "(");
	//url.replace(/%30/g, ")");
	
	//Split into name value pairs.
	var nameValuePairs = url.split("?")[1];
	nameValuePairs = nameValuePairs.split("&");
	for (var pair = 0; pair < nameValuePairs.length; pair++) {
		nameValuePairs[pair] = nameValuePairs[pair].split("=");
	}
	
	//DisplayOutput
	var holder = $("#signup-output")[0];
	for (var pair = 0; pair < nameValuePairs.length; pair++) {
		newP = document.createElement("p");
		newP.textContent = nameValuePairs[pair][0] + ": " + nameValuePairs[pair][1];
		console.log(newP.text);
		holder.appendChild(newP);
	}
}