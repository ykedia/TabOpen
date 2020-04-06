// you will see this log in console log of current tab in Chrome when the script is injected
console.log("content_script.js");

chrome.runtime.onConnect.addListener((port) => {
  port.onMessage.addListener((msg) => {
    var links = document.activeElement.getElementsByTagName('a');
    if (links.length == 0) {
        links = document.activeElement.nextElementSibling.getElementsByTagName('a');
    }
    var hrefs = [];
    for(var i = 0; i < links.length; i++) {
        hrefs.push(links[i].href);
    }    
    if (msg.function == 'get_links') {
      port.postMessage(hrefs);
    }
  });
});
