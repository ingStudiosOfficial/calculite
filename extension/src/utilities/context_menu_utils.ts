import { calculate } from "@calculite/shared/src/utilities/calculator_utils";

export function calculateSelection(selection: string) {
    console.log('Calculating selection:', selection);

    const result = calculate(selection);

    console.log('Result:', result);

    let notifTitle: string;
    let resultToDisplay: string;

    if (typeof result !== 'number') {
        console.error('Error calculating.');
        notifTitle = 'Calculation error';
        resultToDisplay = result;
    } else {
        notifTitle = 'Calculation success';
        resultToDisplay = `${selection} = ${result}`;
    }

    chrome.notifications.create({
        title: notifTitle,
        message: resultToDisplay,
        type: 'basic',
        iconUrl: '/calculite_logo.png',
        buttons: [
            {
                title: 'Open in sidebar',
            }
        ],
    });
}

export async function calculateAndReplaceSelection(selection: string, tab: chrome.tabs.Tab) {
    console.log('Calculating selection:', selection);

    const result = calculate(selection);

    console.log('Result:', result);

    if (typeof result !== 'number') {
        console.error('Error calculating.');
        chrome.notifications.create({
            title: 'Error calculating and replacing',
            message: result,
            type: 'basic',
            iconUrl: '/calculite_logo.png',
            buttons: [
                {
                    title: 'Open in sidebar',
                }
            ],
        });
        return;
    }

    const tabId = tab.id;
    if (!tabId) {
        console.error('Tab ID not found.');
        return;
    }

    chrome.scripting.executeScript({
        target: { tabId: tabId },
        files: ['src/scripts/replace_selection.ts'],
    });

    await chrome.runtime.sendMessage({ replaceSelection: result });
}