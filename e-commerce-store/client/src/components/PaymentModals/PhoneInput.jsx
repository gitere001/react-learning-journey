import { Phone } from 'lucide-react'

function PhoneInput() {
  return (
	<form action="" className="payment-form">
	<label htmlFor="mpesaNumber">M-Pesa Number</label>
	<div className="phone-input-wrapper">
	  <Phone className='phone-icon'/>
	  <input
		type="number"
		id="mpesaNumber"
		placeholder="07XXXXXX or 01XXXXXXXX"
	  />
	</div>
	<button className="pay-now-button payment-btn">Pay Now</button>
  </form>
  )
}

export default PhoneInput