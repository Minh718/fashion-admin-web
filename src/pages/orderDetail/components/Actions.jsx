import React from "react";

export default function Actions() {
  const handleAdminAction = (actionType) => {
    switch (actionType) {
      case "updateStatus":
        // Show modal or change status
        console.log("Update status clicked");
        break;
      case "cancelOrder":
        // Confirm and cancel
        console.log("Cancel order clicked");
        break;
      case "refund":
        // Open refund modal or process
        console.log("Refund clicked");
        break;
      case "resendEmail":
        // Trigger resend API
        console.log("Resend confirmation email clicked");
        break;
      default:
        break;
    }
  };

  return (
    <div className="mb-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <button
          onClick={() => handleAdminAction("updateStatus")}
          className="py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md shadow"
        >
          Update Order Status
        </button>
        <button
          onClick={() => handleAdminAction("cancelOrder")}
          className="py-2 px-4 bg-red-500 hover:bg-red-600 text-white font-medium rounded-md shadow"
        >
          Cancel Order
        </button>
        <button
          onClick={() => handleAdminAction("refund")}
          className="py-2 px-4 bg-green-600 hover:bg-green-700 text-white font-medium rounded-md shadow"
        >
          Refund Payment
        </button>
        <button
          onClick={() => handleAdminAction("resendEmail")}
          className="py-2 px-4 bg-yellow-500 hover:bg-yellow-600 text-white font-medium rounded-md shadow"
        >
          Resend Confirmation Email
        </button>
      </div>
    </div>
  );
}
