import type { LastCalculated } from "src/interfaces/Storage";

export async function openResultSidebar() {
    await chrome.runtime.sendMessage('open_sidebar');
}

export function recieveOpenSidebar(lastCalculated: LastCalculated | undefined) {

    chrome.runtime.onMessage.addListener(async (message: any, sender: chrome.runtime.MessageSender, sendResponse: (response?: any) => void) => {
        if (message !== 'open_sidebar') return;

        lastCalculated = await chrome.storage.session.get(['last_calculated']) as LastCalculated;

        if (!lastCalculated) {
            console.error('Failed to get last calculated result.');
            chrome.notifications.create('get_result_failure', {
                title: 'Failed to open sidebar',
                message: 'Failed to get last calculated result.',
                type: 'basic',
                iconUrl: '/calculite_logo.png',
            });
            return;
        }

        return true;
    });
}