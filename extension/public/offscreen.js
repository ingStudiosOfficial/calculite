chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === 'copy') {
        try {
            const textInput = document.createElement('textarea');
            textInput.value = message.result;
            document.body.appendChild(textInput);
            
            textInput.select();
            
            const success = document.execCommand('copy');
            document.body.removeChild(textInput);

            if (success) {
                sendResponse({ action: 'copySuccess' });
            } else {
                throw new Error('execCommand copy failed.');
            }
        } catch (error) {
            navigator.clipboard.writeText(message.result)
                .then(() => sendResponse({ action: 'copySuccess' }))
                .catch((err) => {
                    console.error('All copy methods failed:', err);
                    sendResponse({ action: 'copyFailure' });
                });
        }
        return true;
    }
});