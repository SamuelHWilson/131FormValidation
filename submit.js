//Setup
$(document).ready( function() {
    DisplayOutput();
});

function DisplayOutput() {
	//Get uri, which contains GET values.
	var uri = new String(window.location);

    //Decode uri characters.
    uri = decodeURIComponent(uri);
    uri = uri.replace(/\+/g, " ");

	//Split into name value pairs.
	var nameValuePairs = uri.split("?")[1];

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
