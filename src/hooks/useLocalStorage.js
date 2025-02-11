import { useEffect, useState } from 'react';

export default function useLocalStorage(key, initialValue) {
    // Initialize state with the value from localStorage (if available) or use initialValue
    const [value, setValue] = useState(() => {
        const localValue = localStorage.getItem(key);

        // If no stored value exists, return the initialValue (supports functions for lazy initialization)
        if (localValue == null) {
            return typeof initialValue === 'function' ? initialValue() : initialValue;
        } else {
            return JSON.parse(localValue); // Parse stored JSON value
        }
    });

    // Update localStorage whenever `value` changes
    useEffect(() => {
        if (value === undefined) {
            localStorage.removeItem(key); // Remove key if value is undefined
        } else {
            localStorage.setItem(key, JSON.stringify(value)); // Store updated value
        }
    }, [value, key]); // Depend on `value` and `key` to trigger updates

    // Return the stored value and setter function for updating it
    return [value, setValue];
}
