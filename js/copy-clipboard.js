chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
	if (request.action === "copyText") {
		copyTextToClipboard(request.text);
	}
});

function copyTextToClipboard(text) {
	navigator.clipboard.writeText(text);
}
