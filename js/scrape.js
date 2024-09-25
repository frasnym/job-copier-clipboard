document.getElementById("scrapeButton").addEventListener("click", () => {
	chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
		chrome.scripting.executeScript({
			target: { tabId: tabs[0].id },
			function: scrapeData,
		});
	});
});

function scrapeData() {
	let copyResult = "";

	const result = {};
	const companyEl = document.querySelector(".heading_Subhead__Ip1aW");
	if (companyEl) {
		result.company = companyEl.innerText;
		copyResult += `Company: ${result.company}\n`;
	}

	const jobTitleEl = document.querySelector(".heading_Level1__soLZs");
	if (jobTitleEl) {
		result.jobTitle = jobTitleEl.innerText;
		copyResult += `Job Title: ${result.jobTitle}\n`;
	}

	const jobDescEl = document.querySelector(".JobDetails_jobDescription__uW_fK.JobDetails_blurDescription__vN7nh");
	if (jobDescEl) {
		result.jobDesc = jobDescEl.innerText;
		copyResult += `Job Description: \n${result.jobDesc}\n`;
	} else {
		const jobDescEl = document.querySelector(".JobDetails_jobDescription__uW_fK.JobDetails_showHidden__C_FOA");
		if (jobDescEl) {
			result.jobDesc = jobDescEl.innerText;
			copyResult += `Job Description: \n${result.jobDesc}\n`;
		}
	}

	// Add to clipboard
	chrome.runtime.sendMessage({ action: "copyText", text: copyResult });

	console.log(result);
}
