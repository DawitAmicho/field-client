import React, { useState } from "react";
import BookingForm from "./BookingForm";
import BookingsList from "./BookingsList";
import API from "./api";
import AdminPanel from "./AdminPanel";
import PaymentModal from "./PaymentModal";
import "./style.css";
import "bootstrap/dist/css/bootstrap.min.css";

export default function App() {
  const [currentPhone, setCurrentPhone] = useState("");
  const [payUrl, setPayUrl] = useState(null);
  const [showModal, setShowModal] = useState(false);

  function handleBooking(booking) {
    setCurrentPhone(booking.phone);
    // Request payment
    API.post(`/pay/${booking.id}`)
      .then(r => {
        setPayUrl(r.data.paymentUrl);
        setShowModal(true);
      })
      .catch(() => alert('Payment initiation failed!'));
  }

  return (
    <div className="bg-app">
      <div className="container py-5">
        <div className="main-box">
          <header className="mb-4 text-center">
            <h1 className="display-5">⚽ Football Field Rental</h1>
            <h4 className="text-secondary mb-3">Book and pay for your favorite pitch in just a few clicks!</h4>
          </header>
          <BookingForm onPaymentStart={handleBooking} />
          <BookingsList phone={currentPhone} />
          <AdminPanel />
        </div>
        <PaymentModal
          show={showModal}
          onHide={() => setShowModal(false)}
          payUrl={payUrl}
        />
        <footer className="mt-5 text-center text-muted">
          <hr />
          &copy; 2026 Football Rental Ethiopia
        </footer>
      </div>
    </div>
  );
}