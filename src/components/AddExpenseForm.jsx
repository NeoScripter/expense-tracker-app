import { useEffect, useLayoutEffect, useRef, useState } from 'react';

export function AddExpenseForm({ onClose, isOpen, setExpenses }) {
    const [isClosing, setIsClosing] = useState(false);
    const [showMessage, setShowMessage] = useState(false);
    const prevIsOpen = useRef();
    const amountRef = useRef();
    const dateRef = useRef();
    const descriptionRef = useRef();

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

    function addExpense(e) {
        e.preventDefault();
        console.log(dateRef.current.value)
        const date = dateRef.current.value;
        const description = descriptionRef.current.value;
        const amount = amountRef.current.value;

        if (date === '' || description === '' || isNaN(amount)) return;

        const id = crypto.randomUUID();
        const newExpense = {
            id,
            date,
            description,
            amount
        };

        setExpenses((prevExpenses) => [...prevExpenses, newExpense]);
        setShowMessage(true);
        setTimeout(() => setShowMessage(false), 4000)
    }

    return (
        <div
            className={`fixed inset-0 z-10 bg-black/30 modal ${
                isClosing && 'closing'
            }`}
            onAnimationEnd={() => setIsClosing(false)}
            onClick={onClose}
        >
            <div className="overlay w-full h-full">
                <div
                    onClick={(e) => e.stopPropagation()}
                    className="modal-body ml-auto bg-light-gray max-w-80 h-full p-6 space-y-4"
                >
                    <header className="flex items-center justify-between gap-2">
                        <div className="text-3xl font-light">Add</div>
                        {showMessage && <div className='toast'>Added!</div>}
                        <button onClick={onClose} className="text-4xl font-thin cursor-pointer">
                            &times;
                        </button>
                    </header>
                    <form onSubmit={(e) => addExpense(e)} className="space-y-4">
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
                                    ref={amountRef}
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
                                    ref={dateRef}
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
                                    ref={descriptionRef}
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
