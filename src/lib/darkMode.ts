import { browser } from '$app/environment';
import { writable } from 'svelte/store';

function createDarkModeStore() {
    const isDark = writable(false);

    if (browser) {
        // Initialize dark mode based on localStorage or system preference
        if (
            localStorage.theme === 'dark' ||
            (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)
        ) {
            isDark.set(true);
            document.documentElement.classList.add('dark');
        } else {
            isDark.set(false);
            document.documentElement.classList.remove('dark');
        }

        // Set default theme to light if not set
        if (!('theme' in localStorage)) {
            localStorage.theme = 'light';
        }
    }

    function toggleDarkMode() {
        isDark.update(currentValue => {
            const newValue = !currentValue;
            if (browser) {
                if (newValue) {
                    document.documentElement.classList.add('dark');
                    localStorage.theme = 'dark';
                } else {
                    document.documentElement.classList.remove('dark');
                    localStorage.theme = 'light';
                }
            }
            return newValue;
        });
    }

    return {
        subscribe: isDark.subscribe,
        toggle: toggleDarkMode
    };
}

export const darkMode = createDarkModeStore(); 