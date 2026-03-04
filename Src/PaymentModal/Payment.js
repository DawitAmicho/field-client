import React from "react";

export default function PaymentModal({ show, onHide, payUrl }) {
  if (!show) return null;
  return (
    <div className="modal d-block" tabIndex="-1" role="dialog" style={{background: "rgba(0,0,0,0.5)"}}>
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content border-primary">
          <div className="modal-header">
            <h5 className="modal-title text-success">Telebirr Payment</h5>
            <button type="button" className="btn-close" aria-label="Close"
              onClick={onHide}></button>
          </div>
          <div className="modal-body text-center">
            <p className="mb-3"><strong>Scan the Telebirr payment code or click the button:</strong></p>
            <a href={payUrl} className="btn btn-primary btn-lg" target="_blank" rel="noopener noreferrer">
              Pay with Telebirr
            </a>
            <div className="text-muted mt-3">
              After payment, check your Booking History to see status.
            </div>
          </div>
          <div className="modal-footer">
            <button className="btn btn-outline-secondary" onClick={onHide}>Close</button>
          </div>
        </div>
      </div>
    </div>
  );
}