export  const getErrorMessage = (resultCode) => {
	console.log(resultCode);
	const errorMessages = {
	  "0": "Payment successful!", // Success case
	  "1": "Insufficient M-Pesa balance.", // Insufficient funds
	  "2001": "Invalid credentials. Please check your details.", // Invalid credentials
	  "1032": "Request cancelled by user.", // User canceled the request
	  "1037": "Request timed out"
	};

	// Default message for unknown error codes
	return errorMessages[resultCode] || "Payment failed. Please try again.";
  };