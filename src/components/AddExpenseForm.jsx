import {
    forwardRef,
    useEffect,
    useLayoutEffect,
    useRef,
    useState
} from 'react';

export function AddExpenseForm({ onClose, isOpen, setExpenses }) {
    const [isClosing, setIsClosing] = useState(false);
    const [showMessage, setShowMessage] = useState(false);
    const prevIsOpen = useRef(null);
    const amountRef = useRef(null);
    const dateRef = useRef(null);
    const descriptionRef = useRef(null);

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
        console.log(dateRef.current.value);
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
        setTimeout(() => setShowMessage(false), 4000);
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
                    className="modal-body ml-auto bg-light-gray max-w-80 h-full p-6 space-y-4 overflow-y-auto"
                >
                    <header className="flex items-center justify-between gap-2">
                        <div className="text-3xl font-light">Add</div>
                        {showMessage && <div className="toast">Added!</div>}
                        <button
                            onClick={onClose}
                            className="text-4xl font-thin cursor-pointer"
                        >
                            &times;
                        </button>
                    </header>
                    <form onSubmit={(e) => addExpense(e)} className="space-y-4">
                        <div className="bg-white space-y-4 py-4 px-2">
                            <FormField
                                ref={amountRef}
                                type="number"
                                text="Expense ($)"
                            />
                            <FormField ref={dateRef} type="date" text="Date" />
                            <FormField
                                ref={descriptionRef}
                                type="text"
                                text="description"
                            />
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

const FormField = forwardRef(function FormFieldRef({ type, text }, ref) {
    return (
        <div>
            <label htmlFor="amount" className="titles text-xs mb-2">
                {text}
            </label>
            <input
                type={type}
                id="amount"
                className="border-b border-gray-300 text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                placeholder="0"
                required
                ref={ref}
            />
        </div>
    );
});
