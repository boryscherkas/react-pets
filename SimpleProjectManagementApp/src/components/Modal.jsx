import { useRef, forwardRef, useImperativeHandle } from "react";
import { createPortal } from "react-dom";

const Modal = forwardRef(function Modal({children}, ref) {
    const dialogRef = useRef();

    useImperativeHandle(ref, () => {
        return {
            open() {
                dialogRef.current.showModal();
            }
        };
    });

    return createPortal(
    <dialog ref={dialogRef} className="backdrop:bg-stone-900/90 rounded-md shadow-md">
        {children}
        <form method="dialog" className="mt-4 text-right">
            <button>Close</button>
        </form>
    </dialog>, document.getElementById('modal-root'));
});

export default Modal;