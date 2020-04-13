'use strict';

chrome.runtime.onInstalled.addListener(function() {
  chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
    chrome.declarativeContent.onPageChanged.addRules([{
      conditions: [new chrome.declarativeContent.PageStateMatcher({
        pageUrl: {hostEquals: 'keep.google.com'},
      })],
      actions: [new chrome.declarativeContent.ShowPageAction()]
    }]);
  });
});

function onWebNav(details) {
    var refIndex = details.url.indexOf('#');
    var ref = refIndex >= 0 ? details.url.slice(refIndex+1) : '';
    if (ref.indexOf('NOTE/') == 0) {
        chrome.pageAction.setIcon({tabId: details.tabId, path: 'images/logo_tabopen_active_48.png'});
        chrome.pageAction.setTitle({
            tabId: details.tabId,
            title: "Click on extention"
        });
        chrome.pageAction.setPopup({
            tabId: details.tabId,
            popup: 'popup.html'
        });
    } else {
        chrome.pageAction.setIcon({tabId: details.tabId, path: 'images/logo_tabopen_inactive_48.png'});
        chrome.pageAction.setTitle({
            tabId: details.tabId,
            title: "Select note first"
        });
        chrome.pageAction.setPopup({
            tabId: details.tabId,
            popup: 'no_popup.html'
        });
    }
}
// Base filter
var filter = {
    url: [{
        hostEquals: 'keep.google.com'
    }]
};
chrome.webNavigation.onCommitted.addListener(onWebNav, filter);
chrome.webNavigation.onHistoryStateUpdated.addListener(onWebNav, filter);
chrome.webNavigation.onReferenceFragmentUpdated.addListener(onWebNav, filter);

