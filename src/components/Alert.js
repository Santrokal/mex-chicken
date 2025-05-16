const Alert = ({ show, onClose }) => {
  if (!show) return null;

  return (
    <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all w-full sm:max-w-[30rem]">
      <div className="flex flex-col mt-3 px-3">
        <div
          className="alert alert-warning d-flex align-items-center mt-3"
          role="alert">
          <div class="flex flex-col items-center text-center">
            <i class="bi bi-exclamation-triangle text-red text-5xl"></i>
            <span class="mt-2">
              Please select Pick Up with time or Delivery with postcode.
            </span>
          </div>
          <button
            type="button"
            className="ms-auto btn-close"
            aria-label="Close"
            onClick={onClose}></button>
        </div>
      </div>
    </div>
  );
};

export default Alert;
