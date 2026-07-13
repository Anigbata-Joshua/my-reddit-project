import { useEffect } from 'react';

export function useClickOutside(ref, handler, isOpen) {
    useEffect(() => {
        if (!isOpen) return;

        const handleEvents = (event) => {
            if (event.type === 'mousedown' && ref.current && !ref.current.contains(event.target)) {
                handler();
            } else if (event.type === 'keydown' && event.key === 'Escape') {
                handler();
            }
        };

        document.addEventListener('mousedown', handleEvents);
        document.addEventListener('keydown', handleEvents);
        return () => {
            document.removeEventListener('mousedown', handleEvents);
            document.removeEventListener('keydown', handleEvents);
        };
    }, [ref, handler, isOpen]);
}