export function vibrate(pattern: number[]) {
    if ('vibrate' in navigator) {
        navigator.vibrate(pattern);
    }
}