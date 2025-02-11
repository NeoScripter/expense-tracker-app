import { useEffect, useLayoutEffect, useRef, useState } from 'react';

export function AddExpenseForm({ onClose, isOpen }) {
    const [isClosing, setIsClosing] = useState(false);
    const prevIsOpen = useRef();

    useEffect(() => {
        function handler(e) {
            if (e.key === 'Escape') onClose();
        }

        document.addEventListener('keydown', handler);

        return () => {
            document.removeEventListener('keydown', handler);
        };
    }, [onClose]);

    useLayoutEffect(() => {
        if (!isOpen && prevIsOpen.current) {
            setIsClosing(true);
        }

        prevIsOpen.current = isOpen;
    }, [isOpen]);

    if (!isOpen && !isClosing) return null;

    return (
        <div
            className={`fixed inset-0 z-10 bg-black/30 modal ${
                isClosing && 'closing'
            }`}
            onAnimationEnd={() => setIsClosing(false)}
        >
            <div className="overlay w-full h-full" onClick={onClose}>
                <div
                    className="modal-body ml-auto bg-light-gray max-w-80 h-full p-6 space-y-4"
                >
                    <header className="flex items-center justify-between gap-2">
                        <div className="text-3xl font-light">Add</div>
                        <button className="text-4xl font-thin cursor-pointer">
                            &times;
                        </button>
                    </header>
                    <form action="" className="space-y-4">
                        <div className="bg-white space-y-4 py-4 px-2">
                            <div>
                                <label
                                    htmlFor="amount"
                                    className="titles text-xs mb-2"
                                >
                                    Expense ($)
                                </label>
                                <input
                                    type="number"
                                    id="amount"
                                    className="border-b border-gray-300 text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                    placeholder="0"
                                    required
                                />
                            </div>
                            <div>
                                <label
                                    htmlFor="date"
                                    className="titles text-xs mb-2"
                                >
                                    Date
                                </label>
                                <input
                                    type="date"
                                    id="date"
                                    className="border-b border-gray-300 text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                    placeholder="0"
                                    required
                                />
                            </div>
                            <div>
                                <label
                                    htmlFor="description"
                                    className="titles text-xs mb-2"
                                >
                                    description
                                </label>
                                <input
                                    type="text"
                                    id="description"
                                    className="border-b border-gray-300 text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 placeholder:text-gray-400"
                                    placeholder="For example, groceries"
                                    required
                                />
                            </div>
                        </div>
                        <button className="btn-primary w-full py-4 mt-6">
                            Add new
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}
