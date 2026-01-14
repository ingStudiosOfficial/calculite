import { calculateAndReplaceSelection, calculateSelection } from "./utilities/context_menu_utils";

chrome.runtime.onInstalled.addListener(async () => {
    chrome.sidePanel.setPanelBehavior({ openPanelOnActionClick: true }).catch((error) => console.error('Failed to open panel:', error));
    createContextMenus();
});

function createContextMenus() {
    chrome.contextMenus.create({
        id: 'calculate_selection',
        title: 'Calculate "%s"',
        type: 'normal',
        contexts: ['selection'],
    });

    chrome.contextMenus.create({
        id: 'calculate_and_replace_selection',
        title: 'Calculate and replace selection "%s"',
        type: 'normal',
        contexts: ['editable'],
    });
}

chrome.contextMenus.onClicked.addListener((info, tab) => {
    const menuItemId = info.menuItemId.toString();
    console.log(menuItemId);

    switch (menuItemId) {
        case 'calculate_selection':
            if (!info.selectionText) return;
            calculateSelection(info.selectionText);
            break;

        case 'calculate_and_replace_selection':
            if (!info.selectionText || !tab) return;
            calculateAndReplaceSelection(info.selectionText, tab);
            break;
        default:
            console.log('Action not supported.');
    }
});