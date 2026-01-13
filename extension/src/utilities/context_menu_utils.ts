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