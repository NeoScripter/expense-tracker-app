import {
    forwardRef,
    useEffect,
    useLayoutEffect,
    useRef,
    useState
} from 'react';

export function AddExpenseForm({ onClose, isOpen, setExpenses }) {
    const [isClosing, setIsClosing] = useState(false); // Tracks modal closing animation state
    const [showMessage, setShowMessage] = useState(false); // Controls visibility of success message
    
    // References for previous modal state and form fields
    const prevIsOpen = useRef(null);
    const amountRef = useRef(null);
    const dateRef = useRef(null);
    const descriptionRef = useRef(null);
    
    // Handle Escape key press to close the modal
    useEffect(() => {
        function handler(e) {
            if (e.key === 'Escape') onClose(); // Close modal when Escape key is pressed
        }
    
        document.addEventListener('keydown', handler);
    
        return () => {
            document.removeEventListener('keydown', handler); // Cleanup event listener on unmount
        };
    }, [onClose]);
    
    // Track previous modal state to trigger closing animation
    useLayoutEffect(() => {
        if (!isOpen && prevIsOpen.current) {
            setIsClosing(true); // Start closing animation when modal is transitioning to closed
        }
    
        prevIsOpen.current = isOpen; // Store current modal state
    }, [isOpen]);
    
    // Prevent rendering when modal is fully closed and animation is complete
    if (!isOpen && !isClosing) return null;
    
    // Handle adding a new expense
    function addExpense(e) {
        e.preventDefault();
    
        // Retrieve input values from refs
        const date = dateRef.current.value;
        const description = descriptionRef.current.value;
        const amount = amountRef.current.value;
    
        // Validate inputs
        if (date === '' || description === '' || isNaN(amount)) return;
    
        // Create a unique ID for the new expense
        const id = crypto.randomUUID();
        const newExpense = { id, date, description, amount };
    
        // Update expenses state with the new expense
        setExpenses((prevExpenses) => [...prevExpenses, newExpense]);
    
        // Show success message for 4 seconds
        setShowMessage(true);
        setTimeout(() => setShowMessage(false), 4000);
    }
    

    return (
        <div
            className={`fixed inset-0 z-10 h-screen bg-black/30 modal ${
                isClosing && 'closing'
            }`}
            onAnimationEnd={() => setIsClosing(false)}
            onClick={onClose}
        >
            <div className="overlay w-full h-full md:flex md:items-center md:justify-center">
                <div
                    onClick={(e) => e.stopPropagation()}
                    className="modal-body ml-auto md:mr-auto bg-light-gray max-w-80 md:max-w-100 md:w-full h-full md:h-auto p-6 space-y-4 overflow-y-auto"
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
