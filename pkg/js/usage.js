var background = chrome.extension.getBackgroundPage();

function updateUsage() {
	var graphContainer = document.getElementById("graphContainer");
	var errorContainer = document.getElementById("errorContainer");
	var infoContainer = document.getElementById("infoContainer");
	errorContainer.style.display = "none";
	graphContainer.style.display = "block";
	infoContainer.style.display = "none";
	loading(true);
	background.updateUsage();
}

function showUsage(data) {
	var graphContainer = document.getElementById("graphContainer");
	var errorContainer = document.getElementById("errorContainer");
	var errorMessage = document.getElementById("errorMessage");
	var infoContainer = document.getElementById("infoContainer");
	if (!background.failureReason) {
		// Perform date calcs each load so they are correct against the time now.
		doDataDateCalc(data);

		var graph1UsageType = localStorage["graph1"];
		var graph1Usage = data.usageTypes[graph1UsageType];

		var graph2UsageType = localStorage["graph2"];
		var graph2Usage = data.usageTypes[graph2UsageType];

		// update graph
		if (graph1Usage) {
			var graph1 = document.getElementById("graph1");
			var graph1Percent = document.getElementById("graph1Percent");
			graph1.style.width = graph1Usage.pct + "%";
			if (graph1Usage.quota > 0 && localStorage["graphText"] == "true") {
				graph1Percent.innerHTML = graph1Usage.pct + "%";
			}
		}

		if (graph2Usage) {
			var graph2 = document.getElementById("graph2");
			var graph2Percent = document.getElementById("graph2Percent");
			graph2.style.width = graph2Usage.pct + "%";
			if (graph2Usage.quota > 0 && localStorage["graphText"] == "true") {
				graph2Percent.innerHTML = graph2Usage.pct + "%";
			}
		}

		var timePercent = (data.totalDays - (data.daysRemaining + (data.hoursRemaining / 24))) / data.totalDays;
		var graph = document.getElementById("graph");
        var arrow = document.getElementById("arrow");
        var position = graph.clientWidth * timePercent;
		arrow.style.left = (position - (arrow.clientWidth / 2)) + "px";

		// update info table
		removeAllChildren(infoContainer);
		if (data.user) {
			addInfoRow(infoContainer, "User:", data.user);
		}
		if (data.plan) {
			addInfoRow(infoContainer, "Plan:", data.plan);
		}
		for (usageType in data.usageTypes) {
			theUsage = data.usageTypes[usageType]
			addInfoRow(infoContainer, usageType + ":", getDisplayUsage(theUsage, data.unit));
		}
		addInfoRow(infoContainer, "Last Reset:", data.lastReset);
		addInfoRow(infoContainer, "Time Remaining:", data.daysRemaining + "d " + data.hoursRemaining + "h");
		if (data.peakDl) {
			addInfoRow(infoContainer, "Peak Remaining:", data.peakPerDayRemaining + " " + data.unit + "/d");
		}
		if (data.offpeakDl) {
			addInfoRow(infoContainer, "Off-Peak Remaining:", data.offpeakPerDayRemaining + " " + data.unit + "/d");
		}

		errorContainer.style.display = "none";
		graphContainer.style.display = "block";
		infoContainer.style.display = "block";
	} else {
		errorMessage.innerHTML = "<b>ERROR:</b> " + background.failureReason;
		errorDetail.innerHTML = background.failureDetail;
		errorContainer.style.display = "block";
		graphContainer.style.display = "none";
		infoContainer.style.display = "none";
	}
	loading(false);
}

function loading(mask) {
	var loading = document.getElementById("loading");
	if (mask) {
		loading.style.display = "block";
	} else {
		loading.style.display = "none";
	}
}

function addInfoRow(container, label, value) {
	var infoRow = document.createElement("div");
	infoRow.className = "infoRow";

	var infoLabel = document.createElement("div");
	infoLabel.className = "infoLabel";
	infoLabel.innerHTML = label;
	infoRow.appendChild(infoLabel);

	var infoValue = document.createElement("div");
	infoValue.className = "infoValue";
	infoValue.innerHTML = value;
	infoRow.appendChild(infoValue);

	container.appendChild(infoRow);
	/*
	 * <div class="infoRow">
	 * 		<div class="infoLabel">User:</div>
	 * 		<div id="user" class="infoValue"></div>
	 * </div>
	 */
}

//SHOW the error causing response
function showErrorDetail() {
	document.getElementById("errorDetail").style.display = "block";
}

//Add event listeners once the DOM has fully loaded by listening for the 'DOMContentLoaded' event
//on the document, and adding your listeners to specific elements when it triggers.
document.addEventListener('DOMContentLoaded', function () {
	document.getElementById('refreshButton').addEventListener('click', updateUsage);
	document.getElementById('showHideLink').addEventListener('click', showErrorDetail);
	showUsage(loadObject('data'));
});