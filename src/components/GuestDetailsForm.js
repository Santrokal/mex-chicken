const GuestDetailsForm = ({ formData2, handleChange }) => {
  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  return (
    <div className="w-full p-5 bg-white rounded-sm2 shadow-light-theme">
      <h6 className="text-black font-AvertaStdBold capitalize">
        Guest Details
      </h6>

      <div className="grid md:grid-cols-2 gap-5 mt-5">
        <div className="contact-field w-full">
          <input
            name="first_name"
            value={formData2.first_name}
            onChange={handleChange}
            className="w-full px-3 py-3 border bg-white text-black border-gray rounded-sm2 text-xs font-AvertaStdRegular focus-visible:outline-none"
            placeholder="First Name"
            type="text"
          />
          {!formData2.first_name && (
            <div className="text-red text-xs">First Name is required</div>
          )}
        </div>
        <div className="contact-field w-full">
          <input
            name="last_name"
            value={formData2.last_name}
            onChange={handleChange}
            className="w-full px-3 py-3 border bg-white text-black border-gray rounded-sm2 text-xs font-AvertaStdRegular focus-visible:outline-none"
            placeholder="Last Name"
            type="text"
          />
          {!formData2.last_name && (
            <div className="text-red text-xs">Last Name is required</div>
          )}
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-5 mt-5">
        <div className="contact-field w-full">
          <input
            name="mobile_number"
            value={formData2.mobile_number}
            onChange={handleChange}
            maxLength={10}
            className="w-full px-3 py-3 border bg-white text-black border-gray rounded-sm2 text-xs font-AvertaStdRegular focus-visible:outline-none"
            placeholder="Mobile Number"
            type="text"
            inputMode="numeric"
            pattern="\d*"
          />
          {!formData2.mobile_number && (
            <div className="text-red text-xs">Mobile Number is required</div>
          )}
        </div>

        <div className="contact-field w-full">
          <input
            name="email_id"
            value={formData2.email_id}
            onChange={handleChange}
            className="w-full px-3 py-3 border bg-white text-black border-gray rounded-sm2 text-xs font-AvertaStdRegular focus-visible:outline-none"
            placeholder="Email Id"
            type="text"
          />
          {!formData2.email_id ? (
            <div className="text-red text-xs">Email Id is required</div>
          ) : (
            !isValidEmail(formData2.email_id) && (
              <div className="text-red text-xs">
                Enter a valid email address
              </div>
            )
          )}
        </div>
      </div>

      <div className="flex gap-5 mt-5">
        <div class="flex-1">
          <input
            name="postcode"
            value={formData2.postcode}
            onChange={handleChange}
            className="w-full px-3 py-3 border bg-white text-black border-gray rounded-sm2 text-xs font-AvertaStdRegular focus-visible:outline-none"
            placeholder="Post Code"
            type="text"
          />
          {!formData2.email_id && (
            <div className="text-red text-xs">Post Code is required</div>
          )}
        </div>
        <div>
          <button
            class="text-white bg-red h-full max-h-10 px-3 py-2 rounded-sm2  flex items-center w-full text-sm font-AvertaStdBold font-normal"
            type="button">
            Find Address
          </button>
        </div>
      </div>
      <div className="grid md:grid-cols-2 gap-5 mt-5">
        <div className="col-span-3">
          <input
            name="enter_address"
            value={formData2.enter_address}
            onChange={handleChange}
            className="w-full px-3 py-3 border bg-white text-cgreen-200 border-cgray-600 rounded-sm2 text-xs font-AvertastdRegular focus-visible:outline-none"
            placeholder="Enter Address"
            type="text"
          />
          {!formData2.enter_address && (
            <div className="text-red text-xs">Address is required</div>
          )}
        </div>
      </div>
      <div className="grid md:grid-cols-2 gap-5 mt-5">
        <div className="contact-field w-full">
          <input
            name="street_name"
            value={formData2.street_name}
            onChange={handleChange}
            className="w-full px-3 py-3 border bg-white text-cgreen-200 border-cgray-600 rounded-sm2 text-xs font-AvertastdRegular focus-visible:outline-none"
            placeholder="Street Name"
            type="text"
          />
          {!formData2.street_name && (
            <div className="text-red text-xs">Street Name is required</div>
          )}
        </div>
        <div className="contact-field w-full">
          <input
            name="city"
            value={formData2.city}
            onChange={handleChange}
            className="w-full px-3 py-3 border bg-white text-cgreen-200 border-cgray-600 rounded-sm2 text-xs font-AvertastdRegular focus-visible:outline-none"
            placeholder="City"
            type="text"
          />
          {!formData2.city && (
            <div className="text-red text-xs">City is required</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default GuestDetailsForm;
