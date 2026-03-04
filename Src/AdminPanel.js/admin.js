import React, { useEffect, useState } from "react";
import API from "./api";

function statusBadge(status) {
  switch (status) {
    case "paid": return <span className="badge bg-success">Paid</span>;
    case "failed": return <span className="badge bg-danger">Failed</span>;
    default: return <span className="badge bg-warning text-dark">Pending</span>;
  }
}

export default function AdminPanel() {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    API.get("/admin/bookings")
      .then(r => setBookings(r.data));
  }, []);

  return (
    <div className="card card-body mb-2 shadow-sm">
      <h4 className="mb-3 text-primary">Admin: All Bookings</h4>
      <div className="table-responsive" style={{ maxHeight: "300px", overflowY: "auto" }}>
        <table className="table table-hover table-bordered align-middle">
          <thead className="table-light">
            <tr>
              <th>Customer</th>
              <th>Phone</th>
              <th>Field</th>
              <th>Date/Time</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map(b => (
              <tr key={b.id}>
                <td>{b.name}</td>
                <td>{b.phone}</td>
                <td>{b.field}</td>
                <td>{new Date(b.startTime).toLocaleString()}</td>
                <td>{statusBadge(b.status)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}