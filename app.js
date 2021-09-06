// "use strict"


//Menu functions.
//Used for the overall flow of the application.
/////////////////////////////////////////////////////////////////
//#region 

// app is the function called to start the entire application
function app(people) {
  let searchType = promptFor("Do you know the name of the person you are looking for? Enter 'yes' or 'no'", yesNo).toLowerCase();
  let searchResults;


  switch (searchType) {
    case 'yes':
      searchResults = searchByName(people);
      break;
    case 'no':
      searchResults = traitToSearchBy(people);
      break;
    default:
      app(people); // restart app
      break;
  }

  // Call the mainMenu function ONLY after you find the SINGLE person you are looking for
  mainMenu(searchResults, people);
}


function traitToSearchBy(people) {
  let searchType = promptFor("Enter a trait to search for from these attributes: \n Gender \n DOB \n Height \n Weight \n Eye Color \n Occupation \n Up to 5 traits can be entered.  \n Enter 'Done' when you have no more traits to enter.", autoValid).toLowerCase();
  let foundPeople = people;


  for (let i = 0; i < 4; i++) {
    if (searchType === "done") {
      break;
    }

    switch (searchType) {
      case 'gender':
        foundPeople = searchByGender(foundPeople);
        break;
      case 'dob':
        foundPeople = searchByDOB(foundPeople);
        break;
      case 'height':
        foundPeople = searchByHeight(foundPeople);
        break;
      case 'weight':
        foundPeople = searchByWeight(foundPeople);
        break;
      case 'eye color':
        foundPeople = searchByEyeColor(foundPeople);
        break;
      case 'occupation':
        foundPeople = searchByOccupation(foundPeople);
        break;
      default:
        alert("Invalid option, try again");
        traitToSearchBy(foundPeople); // restart app
        break;
    }

    searchType = promptFor("Enter a trait to search for from these attributes: \n Gender \n DOB \n Height \n Weight \n Eye Color \n Occupation \n Parents \n Current Spouse \n Up to 5 traits can be entered.  \n Enter 'Done' when you have no more traits to enter.", autoValid).toLowerCase();

  }

  displayPeople(foundPeople);
  let outcome = promptFor("Is the person you are looking for on the previous list?\n Enter 'yes' or 'no'", yesNo).toLowerCase();

  if (outcome == "yes") {
    return searchByName(people);
  }
  else {
    alert("Try searching with more/different traits");
    traitToSearchBy(people);
  }


}

// Menu function to call once you find who you are looking for
function mainMenu(person, people) {
let personsInfo;
  /* Here we pass in the entire person object that we found in our search, as well as the entire original dataset of people. We need people in order to find descendants and other information that the user may want. */

  if (!person) {
    alert("Could not find that individual.");
    return app(people); // restart
  }

  let displayOption = promptFor("Found " + person.firstName + " " + person.lastName + " . Do you want to know their 'info', 'family', or 'descendants'? Type the option you want or 'restart' or 'quit'", autoValid);

  switch (displayOption) {
    case "info":
      personsInfo = displayPerson(person);
      break;
    case "family":
      personsInfo = displayFamily(person, people);
      break;
    case "descendants":
      personsInfo = displayDescendants(person, people);
      break;
    case "restart":
      app(people); // restart
      break;
    case "quit":
      return; // stop execution
    default:
      return mainMenu(person, people); // ask again
  }
}

//#endregion

//Filter functions.
//Ideally you will have a function for each trait.
/////////////////////////////////////////////////////////////////
//#region 

//nearly finished function used to search through an array of people to find matching first and last name and return a SINGLE person object.

//captures user input. 
function user(input){
  return true;
}

function searchByName(people) {
  let firstName = promptFor("What is the person's first name?", user, autoValid);
  let lastName = promptFor("What is the person's last name?", user, autoValid);
  let person;
  let foundPerson = [];
  
  foundPerson = people.filter(function (potentialMatch) {
    if (potentialMatch.firstName === firstName && potentialMatch.lastName === lastName) {
      return true;
    }
    else {
      return false;
    }
  })

  person = foundPerson.pop();
  // TODO: find the person single person object using the name they entered.
  mainMenu(person, people);
}

//unfinished function to search through an array of people to find matching eye colors. Use searchByName as reference.
function searchByEyeColor(people) {
  let eyeColor = promptFor("What is the person's eye color?", customValidationEyes);

  let foundPerson = people.filter(function (potentialMatch) {
    if (potentialMatch.eyeColor === eyeColor) {
      return true;
    }
    else {
      return false;
    }
  });
  return foundPerson;

}

function searchByGender(people) {
  let gender = promptFor("What is the person's gender?", customValidationGender);

  let foundPerson = people.filter(function (potentialMatch) {
    if (potentialMatch.gender === gender) {
      return true;
    }
    else {
      return false;
    }
  });
  return foundPerson;

}

function searchByHeight(people) {
  let height = promptFor("What is the person's height?", customValidationHeight);
  let foundPerson = people.filter(function (potentialMatch) {
    if (potentialMatch.height == height) {
      return true;
    }
    else {
      return false;
    }
  });
  return foundPerson;
}

function searchByWeight(people) {
  let weight = promptFor("How much does the person weigh?", customValidationWeight);
  let foundPerson = people.filter(function (potentialMatch) {
    if (potentialMatch.weight == weight) {
      return true;
    }
    else {
      return false;
    }
  });
  return foundPerson;
}

function searchByOccupation(people) {
  let occupation = promptFor("What does the person do for a living?", customValidationOccupation);
  let foundPerson = people.filter(function (potentialMatch) {
    if (potentialMatch.occupation === occupation) {
      return true;
    }
    else {
      return false;
    }
  });
  return foundPerson;
}

function searchByDOB(people) {
  let dob = promptFor("What is the persons date of birth?", customValidationDob);
  let foundPerson = people.filter(function (potentialMatch) {
    if (potentialMatch.dob === dob) {
      return true;
    }
    else {
      return false;
    }
  });
  return foundPerson;

}

//#endregion

//Display functions.
//Functions for user interface.
/////////////////////////////////////////////////////////////////
//#region 

// alerts a list of people
function displayPeople(people) {
  alert(people.map(function (person) {
    return person.firstName + " " + person.lastName;
  }).join("\n"));
}

function displayPerson(person) {
  // print all of the information about a person:
  // height, weight, age, name, occupation, eye color.
  let personInfo = "First Name: " + person.firstName + "\n";
  personInfo += "Last Name: " + person.lastName + "\n";
  personInfo += "Gender: " + person.gender + "\n";
  personInfo += "DOB: " + person.dob + "\n";
  personInfo += "Height: " + person.height + "\n";
  personInfo += "Weight: " + person.weight + "\n";
  personInfo += "Eye Color: " + person.eyeColor + "\n";
  personInfo += "Occupation: " + person.occupation + "\n";
  // TODO: finish getting the rest of the information to display.
  alert(personInfo);
}

function displayFamily(person, people){
	if(person.currentSpouse != null){
		let spouse = getSpouse(person, people);
		for (let i = 0; i < spouse.length; i++){
			var familyOfPerson = "Spouse: " + spouse[i].firstName + " " + spouse[i].lastName + "\n";	
		}
	}
	else {
		var familyOfPerson = "No spouse" + "\n";
	}	
	let parents = getParents(person, people);
	
		for (let i=0; i < parents.length; i++){ 
			familyOfPerson += "Parent: " + parents[i].firstName + " " + parents[i].lastName + "\n";
		}
		let children = getChildren(person, people);
	
		for (let i=0; i < children.length; i++){ 
			familyOfPerson += "Children: " + children[i].firstName + " " + children[i].lastName + "\n";
		}
	let siblings = getSiblings (person, people);
		for (let i=0; i< siblings.length; i++) {
			familyOfPerson += "Siblings: " + siblings[i].firstName + " " + siblings[i].lastName + "\n";
		}
	let infoArray =[]
	for (i=0; i < familyOfPerson.length; i++){
		infoArray.push(familyOfPerson);
	}
	alert(familyOfPerson);
}

function getSpouse(person, people) {
	console.log(person);
	let spouse = people.filter(function (el) {
		if(person.currentSpouse === el.id) {
			console.log(person.currentSpouse);
			return true;
		}	
 });
  return spouse;

}

function getParents (person, people){
	console.log(person);
	let parentsArray = people.filter(function (el) {
		if(person.parents[0] === el.id || person.parents[1] === el.id) {
			console.log(el.id);
			return true;
		}
  });
  return parentsArray;
}

function getChildren(person, people) {
	console.log(person);
	let childrenArray = people.filter(function (el) {
		if(el.parents[0] === person.id || el.parents[1] === person.id) {
			console.log(el.id);
			return true;
		}
  });
  return childrenArray;

}

function getSiblings(person, people){
	let newArray = people.filter (function (el) {
		for (let i = 0; i < people.length; i++){
		if(el.parents[i] == person.parents){
				console.log(el.id);
				return true;
			}
		}	
	});
	return newArray;	
}

function displayDescendants (person, people){
	let children = getDescendants(person, people);
	alert(people.map(function(person){
		return person.firstName + " " + person.lastName;
	}).join("\n"));
}
	
	
function getDescendants(person, people){
	let descendants = getChildren(person, people);

	for(let i = 0; i < descendants.length; i++){
		let grandchildren = getDescendants (descendants[i], people);
		descendants = descendants.concat(grandchildren);		
	}
	return descendants;
}
//#endregion



//Validation functions.
//Functions to validate user input.
/////////////////////////////////////////////////////////////////
//#region 

//a function that takes in a question to prompt, and a callback function to validate the user input.
//response: Will capture the user input.
//isValid: Will capture the return of the validation function callback. true(the user input is valid)/false(the user input was not valid).
//this function will continue to loop until the user enters something that is not an empty string("") or is considered valid based off the callback function(valid).

function promptFor(question, valid) {
  let isValid;
  do {
    var response = prompt(question).trim();
    isValid = valid(response);
  } while (response === "" || isValid === false)
  return response;
}

// helper function/callback to pass into promptFor to validate yes/no answers.
function yesNo(input) {
  if (input.toLowerCase() == "yes" || input.toLowerCase() == "no") {
    return true;
  }
  else {
    return false;
  }
}

// helper function to pass in as default promptFor validation.
//this will always return true for all inputs.
function autoValid(input) {
  return true; // default validation only
}

//Validation functions for attribute searches
function customValidationEyes(input) {
  if (input.toLowerCase() == "brown" || input.toLowerCase() == "black" || input.toLowerCase() == "hazel" || input.toLowerCase() == "blue" || input.toLowerCase() == "green") {
    return true;
  }
  else {
    alert("Not a correct eye color, try again");
    return false;
  }
}

function customValidationGender(input) {
  if (input.toLowerCase() == "male" || input.toLowerCase() == "female") {
    return true;
  }
  else {
    alert("Not a correct gender, try again");
    return false;
  }
}

function customValidationWeight(input) {
  input = parseInt(input, 10);
  if (input > 256 || input < 100) {
    alert("Weight entered is too high or low, try again");
    return false;
  }
  else {
    return true;
  }
}

function customValidationHeight(input) {
  input = parseInt(input, 10);
  if (input > 76 || input < 58) {
    alert("Height entered is too high or low, try again");
    return false;
  }
  else {
    return true;
  }
}

function customValidationOccupation(input) {
  if (input.toLowerCase() == "programmer" || input.toLowerCase() == "assistant" || input.toLowerCase() == "landscaper" || input.toLowerCase() == "nurse" || input.toLowerCase() == "student" || input.toLowerCase() == "architect" || input.toLowerCase() == "doctor" || input.toLowerCase() == "politician") {
    return true;
  }
  else {
    alert("Not a correct occupation, try again");
    return false;
  }
}

function customValidationDob(input) {
  if (!/^\d{1,2}\/\d{1,2}\/\d{4}$/.test(input)) {
    alert("Not in correct date format (MM/DD/YYYY), try again");
    return false;
  }
  else {
    return true;
  }
}
//#endregion

