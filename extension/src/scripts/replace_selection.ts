function replaceSelection(replacement: string) {
    console.log('Result from scope:', replacement);
    
    const activeElement = document.activeElement;

    if (!activeElement) {
        console.error('Active element not found.');
        throw new Error('Active element not found.');
    }

    if (activeElement.tagName === 'INPUT' || activeElement.tagName === 'TEXTAREA') {
        const start = (activeElement as HTMLInputElement).selectionStart;
        const end = (activeElement as HTMLInputElement).selectionEnd;

        if (!start || !end) {
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

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.replaceSelection) {
        try {
            replaceSelection(message.replaceSelection as string);
            sendResponse({ success: true, message: 'Successfully replaced selection.' });
        } catch (error) {
            console.error('Failed to replace selection:', error);

            chrome.notifications.create({
                title: 'Failed to replace selection',
                message: error as string,
                type: 'basic',
                iconUrl: '/calculite_logo.png',
                buttons: [
                    {
                        title: 'Open in sidebar',
                    }
                ],
            });

            sendResponse({ success: false, message: 'Failed to replace selection.' });
        }
    }

    return true;
});