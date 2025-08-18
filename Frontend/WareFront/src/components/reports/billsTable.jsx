import React from "react";
import "../../cssfiles/BillsTable.css"; 

export default function BillsTable({ bills, isLoading, onStatusUpdate, isUpdating }) {
  const getStatusBadge = (status) => {
    switch (status) {
      case "paid":
        return <span className="badge paid">Paid</span>;
      case "pending":
        return <span className="badge pending">Pending</span>;
      case "overdue":
        return <span className="badge overdue">Overdue</span>;
      default:
        return <span className="badge">{status}</span>;
    }
  };

  const formatDate = (date) => new Date(date).toLocaleDateString();

  const formatAmount = (amount) =>
    `$${parseFloat(amount).toLocaleString(undefined, {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}`;

  if (isLoading) {
    return (
      <div className="loading-table">
        <p>Loading bills...</p>
      </div>
    );
  }

  return (
    <div className="bills-table-wrapper">
      <table className="bills-table" data-testid="bills-table">
        <thead>
          <tr>
            <th>Bill ID</th>
            <th>Vendor</th>
            <th>Amount</th>
            <th>Date</th>
            <th>Due Date</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {bills?.map((bill) => (
            <tr key={bill.id} data-testid={`bill-row-${bill.id}`}>
              <td>{bill.billId}</td>
              <td>{bill.vendor}</td>
              <td>{formatAmount(bill.amount)}</td>
              <td>{formatDate(bill.date)}</td>
              <td>{formatDate(bill.dueDate)}</td>
              <td>{getStatusBadge(bill.status)}</td>
              <td>
                <button onClick={() => alert(`Viewing ${bill.billId}`)}>👁 View</button>
                <button onClick={() => alert(`Downloading ${bill.billId}`)}>⬇ Download</button>
                {bill.status === "pending" && (
                  <button
                    onClick={() => onStatusUpdate(bill.id, "paid")}
                    disabled={isUpdating}
                  >
                    Mark Paid
                  </button>
                )}
                {bill.status === "overdue" && <button>⚠ Action</button>}
              </td>
            </tr>
          ))}

          {!bills?.length && (
            <tr>
              <td colSpan={7} className="no-bills">
                No bills found
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {bills && bills.length > 0 && (
        <div className="pagination">
          <p>
            Showing 1-{Math.min(10, bills.length)} of {bills.length} bills
          </p>
          <div>
            <button>{"<"}</button>
            <button className="active">1</button>
            <button>2</button>
            <button>3</button>
            <button>{">"}</button>
          </div>
        </div>
      )}
    </div>
  );
}
