const CaptureModal = ({ isShown, onClose, timerSeconds, message }) => {
    if (!isShown) {
      return null;
    }
  
    return (
      <div className="capture-modal">
        <div className="modal-content">
          <h2>{message}</h2>
          {timerSeconds > 0 ? (
            <p>{timerSeconds} seconds remaining</p>
          ) : (
            <button onClick={onClose}>Close</button>
          )}
        </div>
      </div>
    );
  };
  export default CaptureModal;  