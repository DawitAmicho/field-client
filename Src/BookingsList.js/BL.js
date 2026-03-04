import React, { useState } from "react";
import API from "./api";

export default function BookingForm({ onPaymentStart }) {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    startTime: "",
    field: "Main Field",
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    setError(""); setSuccess("");
    setLoading(true);
    try {
      const resp = await API.post("/book", form);
      setSuccess("Booking created successfully!");
      onPaymentStart(resp.data.booking);
    } catch (err) {
      setError("Booking failed: " + (err.response?.data?.message || err.message));
    }
    setLoading(false);
  }

  return (
    <form onSubmit={handleSubmit} className="card card-body my-4 shadow-lg form-box">
      <h3 className="mb-3 text-primary">Book a Football Field</h3>
      <div className="mb-2">
        <input className="form-control" placeholder="Your Name" required
          value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} />
      </div>
      <div className="mb-2">
        <input className="form-control" placeholder="Phone Number" required
          value={form.phone}
          inputMode="tel" pattern="[0-9]{10,13}"
          onChange={e => setForm(f => ({ ...f, phone: e.target.value }))} />
      </div>
      <div className="mb-2">
        <input type="datetime-local" className="form-control" required
          value={form.startTime} onChange={e => setForm(f => ({ ...f, startTime: e.target.value }))} />
      </div>
      <div className="mb-2">
        <select className="form-select" value={form.field}
          onChange={e => setForm(f => ({ ...f, field: e.target.value }))}>
          <option>Main Field</option>
          <option>Mini Field</option>
        </select>
      </div>
      <button disabled={loading} className="btn btn-success w-100">
        {loading ? (
          <>
            <span className="spinner-border spinner-border-sm me-2"></span>
            Processing...
          </>
        ) : "Book & Pay (500 ETB)"}
      </button>
      {success && <div className="alert alert-success my-2">{success}</div>}
      {error && <div className="alert alert-danger my-2">{error}</div>}
    </form>
  );
}