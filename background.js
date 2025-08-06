chrome.runtime.onInstalled.addListener(() => {
    console.log('Dobby X Assistant installed');
});

chrome.action.onClicked.addListener((tab) => {
    if (tab.url.includes('twitter.com') || tab.url.includes('x.com')) {
        chrome.tabs.sendMessage(tab.id, { action: 'showStatus' });
    } else {
        chrome.notifications.create({
            type: 'basic',
            iconUrl: 'D.png',
            title: 'Dobby X Assistant',
            message: 'This extension only works on Twitter. Please visit twitter.com or x.com to use it.'
        });
    }
});

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === 'generateReplies') {
        sendResponse({ success: true });
    }
});