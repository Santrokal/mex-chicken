import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import "bootstrap/dist/css/bootstrap.min.css";

const ErrorModal = ({ show, onClose, message }) => {
  return (
    <Modal
      size="sm"
      show={show}
      onHide={onClose}
      aria-labelledby="error-modal"
      centered>
      <Modal.Header closeButton>
        <Modal.Title id="error-modal">Error</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p className="text-danger text-center">{message}</p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ErrorModal;
