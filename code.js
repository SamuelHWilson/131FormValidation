//Global vars
var degrees = ["A.A.S of Computer Information Science", "Other Degree"];

//Setup
$(document).ready( function() {
    document.forms.signup.reset();
    SetupDegrees();
    SetupAllWarningTooltips();
    $('[data-toggle="tooltip"]').tooltip();
});

//Setup functions
function SetupDegrees() {
    var degreeSelect = $("#signup-degree")[0];

    for (i = 0; i < degrees.length; i++) {
        newOption = document.createElement("option");
        newOption.text = degrees[i];
        degreeSelect.add(newOption);
    }

    //Selects none. Unfortunatly unhandled by form.reset();
    $("#signup-degree").prop("selectedIndex", -1);
}

function SetupAllWarningTooltips() {
    SetupWarningTooltip("signup-name", "Please enter a valid name. (Letters and spaces only. Must be 6 characters or longer.)");
	SetupWarningTooltip("signup-email", "Please enter a valid email address.");
	SetupWarningTooltip("signup-phone", "Please enter a valid phone number. (Must match pattern (000)000-000 )");
	SetupWarningTooltip("signup-hours", "Please choose an option.")
	SetupWarningTooltip("signup-degree", "Please choose a degree.");
}

function SetupWarningTooltip(id, message) {
    var element = $("#" + id)[0];
    element.setAttribute("data-toggle", "tooltip");
    element.setAttribute("data-placement", "right");
    element.setAttribute("title", message);
    element.setAttribute("data-trigger", "manual");
}

//Related to setup, shows tooltip, and sets up event to hide it later.
function ActivateWarning(id, removeEvent) {
	var element = $("#"+id);
	var anonHandle;

	//Show tooltip
	element.tooltip("show");
	// element[0].classList.add("border-danger");
    element.toggleClass("border-danger");

	//Hide event, triggered when input is changed
	anonHandle = function() {
		element.tooltip("hide");
		// element[0].classList.remove("border-danger");
        element.toggleClass("border-danger");
		element[0].removeEventListener(removeEvent, anonHandle, false);
	}
	element[0].addEventListener(removeEvent, anonHandle, false);
}

function ActivateRadioTooltip(holderId) {
	var holder = $("#"+holderId);
	var radios = $("#"+holderId+" input");
	var anonHandle;
	var anonRemoveHandle;

	//Show tooltip
	holder.tooltip("show");
	holder[0].classList.add("border-danger");

	for (var i = 0; i < radios.length; i++) {
		//Hide event, triggers when any of the radio boxes are changed.
		anonHandle = function() {
			holder.tooltip("hide");
			anonRemoveHandle();
		}
		radios[i].addEventListener("click", anonHandle, false);
	}

	//Event to remove handlers
	anonRemoveHandle = function() {
		for (var i = 0; i < radios.length; i++) {
			radios[i].removeEventListener("click", anonHandle, false);
		}
		holder[0].classList.remove("border-danger");
	}
}

//Validate
function Validate(form) {
    var pass = true;
    //Get all form controls.
    var nameText = $("#signup-name");
    var emailText = $("#signup-email");
    var phoneText = $("#signup-phone");
    var hoursRadios = $("#signup-hours input");
    var degreeSelect = $("#signup-degree");

    //Validate name (length > 6)
    if (nameText[0].value.match(/^[a-zA-Z\s]{6,}$/) == null) {
        pass = false;
        ActivateWarning("signup-name", "input");
    }

    //Validate email (must be actual email)
    if (emailText[0].value.match(/^\w+@\w{2,}\.\w+$/) == null) {
        pass = false;
        ActivateWarning("signup-email", "input");
    }

    //Validate phone (must be actual phone #)
    if (phoneText[0].value.match(/^\(\d{3}\)\d{3}-\d{4}$/) == null) {
        pass = false;
        ActivateWarning("signup-phone", "input");
    }

    //Validate hours are checked
    if (hoursRadios[0].checked == false && hoursRadios[1].checked == false) {
        pass = false;
        ActivateRadioTooltip("signup-hours");
    }

    //Validate degree is selected
    if (degreeSelect[0].selectedIndex == -1) {
        pass = false;
		ActivateWarning("signup-degree", "change");
    }

    //Validate

    return pass;
}
