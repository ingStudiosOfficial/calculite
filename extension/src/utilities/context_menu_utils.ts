import { calculate } from "@calculite/shared/src/utilities/calculator_utils";

export async function calculateSelection(selection: string) {
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

    chrome.notifications.create('notify_calc_result', {
        title: notifTitle,
        message: resultToDisplay,
        type: 'basic',
        iconUrl: '/calculite_logo.png',
    });
}

function replaceSelection(replacement?: string) {
    console.log('Replace selection called.');

    console.log('Result from scope:', replacement);

    if (replacement === null || replacement === undefined) return;
    
    const activeElement = document.activeElement;

    if (!activeElement) {
        console.error('Active element not found.');
        throw new Error('Active element not found.');
    }

    console.log('Active element:', activeElement);

    if (activeElement.tagName === 'INPUT' || activeElement.tagName === 'TEXTAREA') {
        const start = (activeElement as HTMLInputElement).selectionStart;
        const end = (activeElement as HTMLInputElement).selectionEnd;

        if (start === null || start === undefined || end === null || end === undefined) {
            console.error('Failed to find start and end.');
            throw new Error('Failed to find start and end.');
        }

        (activeElement as HTMLInputElement).setRangeText(replacement.toString(), start, end, 'end');

        activeElement.dispatchEvent(new Event('input', { bubbles: true }));
    } else {
        const selection = window.getSelection();

        if (!selection) {
            console.error('Failed to get selection.');
            throw new Error('Failed to get selection.');
        }

        if (selection.rangeCount > 0) {
            const range = selection.getRangeAt(0);
            range.deleteContents();
            range.insertNode(document.createTextNode(replacement.toString()));
            selection.collapseToEnd();
        }
    }
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

    console.log('Tab ID:', tabId);

    try {
        await chrome.scripting.executeScript({
            target: { tabId: tabId, allFrames: true },
            args: [result],
            func: replaceSelection,
        });
    } catch (error) {
        console.error('Error while executing script:', error);
    }
}