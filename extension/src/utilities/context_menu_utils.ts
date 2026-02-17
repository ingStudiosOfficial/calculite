import { calculate } from "@calculite/shared/src/utilities/calculator_utils";
import { RuntimeMessage, RuntimeMessageCopy } from "src/interfaces/RuntimeMessage";

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

export function suggestCalculateResult(equation: string, suggest: (suggestResults: chrome.omnibox.SuggestResult[]) => void) {
    console.log('Calculating selection:', equation);

    const result = calculate(equation);

    console.log('Result:', result);

    suggest([
        {
            content: result.toString(),
            description: `${equation} = ${result}`,
        }
    ]);
}

export async function copyCalculateResult(equation: string) {
    console.log('Calculating selection:', equation);

    const result = calculate(equation);

    console.log('Result:', result);

    if (typeof result !== 'number') {
        chrome.notifications.create('notify_calc_copied_failure', {
            title: 'Failed to copy result',
            message: result,
            type: 'basic',
            iconUrl: '/calculite_logo.png',
        });
        return;
    }

    try {
        await chrome.offscreen.createDocument({
            url: '/offscreen.html',
            reasons: ['CLIPBOARD'],
            justification: 'Copy calculation result from omnibox',
        });
    } catch (error) {
        console.error('Error while creating offscreen document:', error);
    }

    try {
        const response: RuntimeMessage = await chrome.runtime.sendMessage({ action: 'copy', result: result.toString() } as RuntimeMessageCopy);

        switch (response.action) {
            case 'copySuccess':
                chrome.notifications.create('notify_calc_copied', {
                    title: `Copied result '${result}'`,
                    message: `Copied result '${result}' to clipboard`,
                    type: 'basic',
                    iconUrl: '/calculite_logo.png',
                });
                break;
            
            case 'copyFailure':
                chrome.notifications.create('notify_calc_copied_failure', {
                    title: 'Failed to copy result',
                    message: 'An unexpected error occurred while copying to clipboard',
                    type: 'basic',
                    iconUrl: '/calculite_logo.png',
                });
        }
    } catch (error) {
        console.error('An error occurred while sending message:', error);
        chrome.notifications.create('notify_calc_copied_failure', {
            title: 'Failed to copy result',
            message: 'An unexpected error occurred while copying to clipboard',
            type: 'basic',
            iconUrl: '/calculite_logo.png',
        });
    }

    chrome.offscreen.closeDocument();
}