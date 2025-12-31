import { fetchSettings } from "./calculator_utils";

let wakeLock: WakeLockSentinel | null;

export async function requestWakeLock() {
    console.log('Wake lock requested.');

    if (!('wakeLock' in navigator)) {
        console.error('Screen wake lock API not supported.');
        return;
    }

    try {
        wakeLock = await navigator.wakeLock.request('screen');

        wakeLock.addEventListener('release', () => {
            wakeLock = null;
        });
    } catch (error) {
        console.error('Wake lock request failed:', error);
    }
}

export function disableWakeLock() {
    console.log('Disabling wake lock...');

    if (wakeLock) {
        wakeLock.release().then(() => {
            wakeLock = null;
        });
    }
}

export function wakeLockListener() {
    document.addEventListener('visibilitychange', () => {
        if (document.visibilityState === 'visible' && fetchSettings().stayAwake === true) {
            requestWakeLock();
        }
    });
}