/*add goal*/
document.querySelector('#btn-addgoal').addEventListener ('click', function () {
	document.querySelector('#addgoal').className = 'current';
	document.querySelector('[data-position="current"]').className = 'left';
});
document.querySelector('#btn-about').addEventListener ('click', function () {
	document.querySelector('#about').className = 'current';
	document.querySelector('[data-position="current"]').className = 'left';
});
document.querySelector('#btn-addgoal-back').addEventListener ('click', function () {
	document.querySelector('#addgoal').className = 'right';
	document.querySelector('[data-position="current"]').className = 'current';
});
document.querySelector('#btn-editgoal-back').addEventListener ('click', function () {
	document.querySelector('#editgoal').className = 'right';
	document.querySelector('[data-position="current"]').className = 'current';
});
document.querySelector('#btn-editachieved-back').addEventListener ('click', function () {
	document.querySelector('#editachieved').className = 'right';
	document.querySelector('[data-position="current"]').className = 'current';
});
document.querySelector('#btn-about-back').addEventListener ('click', function () {
	document.querySelector('#about').className = 'right';
	document.querySelector('[data-position="current"]').className = 'current';
});


window.onload = init;

function init() {
	var addgoal_btn = document.querySelector("#addgoal_btn");
	var buttonClear = document.querySelector("#clearStorage");
	addgoal_btn.onclick = createGoal;
	buttonClear.onclick = clearGoalNotes;

	reloadGoals();
}


function reloadGoals() {
	var goalList = document.getElementById("goals");
	var achievedList = document.getElementById("achieved");
	var goals = goalList.childNodes;
	var achieved = achievedList.childNodes;
	for (var i = goals.length-1; i >= 0; i--) {
		goalList.removeChild(goals[i]);
	}
	for (var i = achieved.length-1; i >= 0; i--) {
		achievedList.removeChild(achieved[i]);
	}

	var goalsArray = getGoalsArray();
	
	for (var i = 0; i < goalsArray.length; i++) {
		var key = goalsArray[i];
		var value = JSON.parse(localStorage[key]);
		if (value.achieved == 0) {
			addGoalToDOM(key, value.title, value.about, value.color);
		} else {
			addAchievedToDOM(key, value.title, value.about, value.color);
		}
	}
}


function createGoal() {
	var goalsArray = getGoalsArray();
	var title_input = document.getElementById("title_input");
	var about_input = document.getElementById("about_input");
	var colorSelectObj = document.getElementById("goal_color_add");
	var index = colorSelectObj.selectedIndex;
	var color = colorSelectObj[index].value;
	if (title_input.value != '') {
		var currentDate = new Date();
		var key = currentDate.getTime();
		var stickyObj = {
			"title": title_input.value,
			"about": about_input.value,
			"color": color,
			"achieved": 0
		};
		localStorage.setItem(key, JSON.stringify(stickyObj));
		goalsArray.push(key);
		localStorage.setItem("goalsArray", JSON.stringify(goalsArray));
		addGoalToDOM(key, title_input.value, about_input.value, color);
		document.querySelector('#addgoal').className = 'right';
		document.querySelector('[data-position="current"]').className = 'current';
		var formadd = document.getElementById("form-add");
		formadd.reset();
	}
}

function deleteGoal(key) {
	var goalsArray = getGoalsArray();
	if (goalsArray) {
		for (var i = 0; i < goalsArray.length; i++) {
			if (key == goalsArray[i]) {
				goalsArray.splice(i,1);
			}
		}
		localStorage.removeItem(key);
		localStorage.setItem("goalsArray", JSON.stringify(goalsArray));
		reloadGoals();
	}
	document.querySelector('#editgoal').className = 'right';
	document.querySelector('[data-position="current"]').className = 'current';
}

function deleteAchieved(key) {
	var goalsArray = getGoalsArray();
	if (goalsArray) {
		for (var i = 0; i < goalsArray.length; i++) {
			if (key == goalsArray[i]) {
				goalsArray.splice(i,1);
			}
		}
		localStorage.removeItem(key);
		localStorage.setItem("goalsArray", JSON.stringify(goalsArray));
		reloadGoals();
	}
	document.querySelector('#editachieved').className = 'right';
	document.querySelector('[data-position="current"]').className = 'current';
}

function completeGoal(key) {
	var goalsArray = getGoalsArray();
	var colorSelectObj = document.getElementById("goal_color_edit");
	var index = colorSelectObj.selectedIndex;
	var color = colorSelectObj[index].value;
	if (goalsArray) {
		var value = JSON.parse(localStorage[key]);
		value.achieved = 1;
		value.color = color;
		localStorage.setItem(key, JSON.stringify(value));
		reloadGoals();
	}
	document.querySelector('#editgoal').className = 'right';
	document.querySelector('[data-position="current"]').className = 'current';
}

function redo(key) {
	var goalsArray = getGoalsArray();
	var colorSelectObj = document.getElementById("achieved_color_edit");
	var index = colorSelectObj.selectedIndex;
	var color = colorSelectObj[index].value;
	if (goalsArray) {
		var value = JSON.parse(localStorage[key]);
		value.achieved = 0;
		value.color = color;
		localStorage.setItem(key, JSON.stringify(value));
		reloadGoals();
	}
	document.querySelector('#editachieved').className = 'right';
	document.querySelector('[data-position="current"]').className = 'current';
}


function editGoal(key) {
	var title_edit = document.getElementById("title_edit");
	var about_edit = document.getElementById("about_edit");
	var colorSelectObj = document.getElementById("goal_color_edit");
	var index = colorSelectObj.selectedIndex;
	var color = colorSelectObj[index].value;
	if (title_edit != '') {
		var goalsArray = getGoalsArray();
		if (goalsArray) {
			var value = JSON.parse(localStorage[key]);
			value.title = title_edit.value;
			value.about = about_edit.value;
			value.color = color;
			localStorage.setItem(key, JSON.stringify(value));
			reloadGoals();
		}
		document.querySelector('#editgoal').className = 'right';
		document.querySelector('[data-position="current"]').className = 'current';
	}
}

function editAchieved(key) {
	var title_achieved = document.getElementById("title_achieved");
	var about_achieved = document.getElementById("about_achieved");
	var colorSelectObj = document.getElementById("achieved_color_edit");
	var index = colorSelectObj.selectedIndex;
	var color = colorSelectObj[index].value;
	if (title_achieved != '') {
		var goalsArray = getGoalsArray();
		if (goalsArray) {
			var value = JSON.parse(localStorage[key]);
			value.title = title_achieved.value;
			value.about = about_achieved.value;
			value.color = color;
			localStorage.setItem(key, JSON.stringify(value));
			reloadGoals();
		}
		document.querySelector('#editachieved').className = 'right';
		document.querySelector('[data-position="current"]').className = 'current';
	}
}


function showEditGoal(key) {
	document.querySelector('#editgoal').className = 'current';
	document.querySelector('[data-position="current"]').className = 'left';
	var title_edit = document.getElementById("title_edit");
	var about_edit = document.getElementById("about_edit");
	var editgoal_btn = document.getElementById("editgoal_btn");
	var delete_btn = document.getElementById("delete_btn");
	var achieved_btn = document.getElementById("achieved_btn");
	var colorSelectObj = document.getElementById("goal_color_edit");
	if (JSON.parse(localStorage.getItem(key)).color == "LightGoldenRodYellow") {
		colorSelectObj.selectedIndex = 0;
	} else if (JSON.parse(localStorage.getItem(key)).color == "PaleGreen") {
		colorSelectObj.selectedIndex = 1;
	} else if (JSON.parse(localStorage.getItem(key)).color == "LightPink") {
		colorSelectObj.selectedIndex = 2;
	} else if (JSON.parse(localStorage.getItem(key)).color == "LightBlue") {
		colorSelectObj.selectedIndex = 3;
	}
	title_edit.setAttribute("value", JSON.parse(localStorage.getItem(key)).title);
	about_edit.innerHTML = JSON.parse(localStorage.getItem(key)).about;
	editgoal_btn.setAttribute("onClick", "editGoal("+key+")");
	delete_btn.setAttribute("onClick", "deleteGoal("+key+")");
	achieved_btn.setAttribute("onClick", "completeGoal("+key+")");
}

function showEditAchieved(key) {
	document.querySelector('#editachieved').className = 'current';
	document.querySelector('[data-position="current"]').className = 'left';
	var title_achieved = document.getElementById("title_achieved");
	var about_achieved = document.getElementById("about_achieved");
	var editachieved_btn = document.getElementById("editachieved_btn");
	var deleteachieved_btn = document.getElementById("deleteachieved_btn");
	var redo_btn = document.getElementById("redo_btn");
	var colorSelectObj = document.getElementById("achieved_color_edit");
	if (JSON.parse(localStorage.getItem(key)).color == "LightGoldenRodYellow") {
		colorSelectObj.selectedIndex = 0;
	} else if (JSON.parse(localStorage.getItem(key)).color == "PaleGreen") {
		colorSelectObj.selectedIndex = 1;
	} else if (JSON.parse(localStorage.getItem(key)).color == "LightPink") {
		colorSelectObj.selectedIndex = 2;
	} else if (JSON.parse(localStorage.getItem(key)).color == "LightBlue") {
		colorSelectObj.selectedIndex = 3;
	}
	title_achieved.setAttribute("value", JSON.parse(localStorage.getItem(key)).title);
	about_achieved.innerHTML = JSON.parse(localStorage.getItem(key)).about;
	editachieved_btn.setAttribute("onClick", "editAchieved("+key+")");
	deleteachieved_btn.setAttribute("onClick", "deleteAchieved("+key+")");
	redo_btn.setAttribute("onClick", "redo("+key+")");
}


function addGoalToDOM(key, title_input, about_input, color) {
	var goals = document.getElementById("goals");
	var goal = document.createElement("li");
	var aside = document.createElement("aside");
	var img = document.createElement("img");
	var a = document.createElement("a");
	aside.style.backgroundColor = color;
	a.setAttribute("href", "#");
	a.setAttribute("class", "goalItem");
	a.setAttribute("id", key);
	a.setAttribute("onClick", "showEditGoal("+key+")");
	var title_p = document.createElement("p");
	var about_p = document.createElement("p");
	title_p.innerHTML = title_input;
	about_p.innerHTML = about_input;
	a.appendChild(title_p);
	a.appendChild(about_p);
	aside.appendChild(img);
	goal.appendChild(aside);
	goal.appendChild(a);
	goals.appendChild(goal);
}

function addAchievedToDOM(key, achieved_title, achieved_about, color) {
	var achieved = document.getElementById("achieved");
	var complete = document.createElement("li");
	var aside = document.createElement("aside");
	var img = document.createElement("img");
	var a = document.createElement("a");
	aside.style.backgroundColor = color;
	a.setAttribute("href", "#");
	a.setAttribute("class", "completeItem");
	a.setAttribute("id", key);
	a.setAttribute("onClick", "showEditAchieved("+key+")");
	var title_p = document.createElement("p");
	var about_p = document.createElement("p");
	title_p.innerHTML = achieved_title;
	about_p.innerHTML = achieved_about;
	a.appendChild(title_p);
	a.appendChild(about_p);
	aside.appendChild(img);
	complete.appendChild(aside);
	complete.appendChild(a);
	achieved.appendChild(complete);
}

function clearGoalNotes() {
	var goalsArray = getGoalsArray();
	if (goalsArray) {
		for (var i = 0; i < goalsArray.length; i++) {
			localStorage.removeItem(goalsArray[i]);
		}
	}
	localStorage.removeItem("goalsArray");
	var goalList = document.getElementById("goals");
	var goals = goalList.childNodes;
	for (var i = goals.length-1; i >= 0; i--) {
		goalList.removeChild(goals[i]);
	}

	var achievedList = document.getElementById("achieved");
	var achieved = achievedList.childNodes;
	for (var i = achieved.length-1; i >= 0; i--) {
		achievedList.removeChild(achieved[i]);
	}
}

function getGoalsArray() {
	var goalsArray = localStorage.getItem("goalsArray");
	if (!goalsArray) {
		goalsArray = [];
		localStorage.setItem("goalsArray", JSON.stringify(goalsArray));
	} else {
		goalsArray = JSON.parse(goalsArray);
	}
	return goalsArray;
}

