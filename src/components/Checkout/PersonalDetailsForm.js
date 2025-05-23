const PersonalDetailsForm = ({ formData, handleChange }) => {
  return (
    <div className="w-full p-5 bg-white shadow-custom rounded-sm2 shadow-light-theme">
      <h6 className="text-black font-Avertastd capitalize">
        Your Personal Details
      </h6>
      <div className="grid md:grid-cols-2 gap-5 mt-5">
        <div className="contact-field w-full">
          <input
            name="first_name"
            value={formData.first_name}
            onChange={handleChange}
            className="w-full px-3 py-3 border bg-white text-cgreen-200 border-cgray-600 rounded-sm2 text-xs font-AvertastdRegular focus-visible:outline-none"
            placeholder="First Name"
            type="text"
          />
          {!formData.first_name && (
            <div className="text-red text-xs">First Name is required</div>
          )}
        </div>

        <div className="contact-field w-full">
          <input
            name="last_name"
            value={formData.last_name}
            onChange={handleChange}
            className="w-full px-3 py-3 border bg-white text-cgreen-200 border-cgray-600 rounded-sm2 text-xs font-AvertastdRegular focus-visible:outline-none"
            placeholder="Last Name"
            type="text"
          />
          {!formData.last_name && (
            <div className="text-red text-xs">Last Name is Required</div>
          )}
        </div>
      </div>
      <div className="grid md:grid-cols-2 gap-5 mt-5">
        <div className="contact-field w-full">
          <input
            name="mobile_number"
            value={formData.mobile_number}
            onChange={handleChange}
            className="w-full px-3 py-3 border bg-white text-cgreen-200 border-cgray-600 rounded-sm2 text-xs font-AvertastdRegular focus-visible:outline-none"
            placeholder="Mobile Number"
            type="text"
          />
          {!formData.mobile_number && (
            <div className="text-red text-xs">Mobile Number is required</div>
          )}
        </div>
        <div className="contact-field w-full">
          <input
            name="email_id"
            value={formData.email_id}
            onChange={handleChange}
            className="w-full px-3 py-3 border bg-white text-cgreen-200 border-cgray-600 rounded-sm2 text-xs font-AvertastdRegular focus-visible:outline-none"
            placeholder="Email Id"
            type="text"
          />
          {!formData.email_id && (
            <div className="text-red text-xs">Email Id is required</div>
          )}
        </div>
      </div>

      {/* Password */}
      <h6 className="text-cgreen-500 font-Avertastd capitalize mt-5">
        Your Password
      </h6>
      <div className="grid md:grid-cols-2 gap-5 mt-5">
        <div className="contact-field w-full">
          <input
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="w-full px-3 py-3 border bg-white text-cgreen-200 border-cgray-600 rounded-sm2 text-xs font-AvertastdRegular focus-visible:outline-none"
            placeholder="Password"
            type="text"
          />
          {!formData.password && (
            <div className="text-red text-xs">Password is required</div>
          )}
        </div>
        <div className="contact-field w-full">
          <input
            name="confirm_password"
            value={formData.confirm_password}
            onChange={handleChange}
            className="w-full px-3 py-3 border bg-white text-cgreen-200 border-cgray-600 rounded-sm2 text-xs font-AvertastdRegular focus-visible:outline-none"
            placeholder="Confirm Password"
            type="text"
          />
          {!formData.confirm_password && (
            <div className="text-red text-xs">Confirm Password is required</div>
          )}
        </div>
      </div>
      {/* Address */}
      <h6 className="text-black font-Avertastd capitalize mt-5">
        Your Address
      </h6>
      <div className="flex gap-5 mt-5">
        <div className="flex-1">
          <input
            name="postcode"
            value={formData.postcode}
            onChange={handleChange}
            className="w-full px-3 py-3 border bg-white text-black border-cgray-600 rounded-sm2 text-xs font-AvertastdRegular focus-visible:outline-none"
            placeholder="Post Code"
            type="text"
          />
          {!formData.postcode && (
            <div className="text-red text-xs">Post Code is required</div>
          )}
        </div>
        <div>
          <button
            class="text-white bg-red  h-full max-h-10 px-3 py-2 rounded-sm2  flex items-center w-280 text-sm font-Avertastd font-normal"
            type="button">
            Find Address
          </button>
        </div>
      </div>
      <div className="grid md:grid-cols-2 gap-5 mt-5">
        <div className="col-span-3">
          <input
            name="enter_address"
            value={formData.enter_address}
            onChange={handleChange}
            className="w-full px-3 py-3 border bg-white text-cgreen-200 border-cgray-600 rounded-sm2 text-xs font-AvertastdRegular focus-visible:outline-none"
            placeholder="Enter Address"
            type="text"
          />
          {!formData.enter_address && (
            <div className="text-red text-xs">Address is required</div>
          )}
        </div>
      </div>
      <div className="grid md:grid-cols-2 gap-5 mt-5">
        <div className="contact-field w-full">
          <input
            name="street_name"
            value={formData.street_name}
            onChange={handleChange}
            className="w-full px-3 py-3 border bg-white text-cgreen-200 border-cgray-600 rounded-sm2 text-xs font-AvertastdRegular focus-visible:outline-none"
            placeholder="Street Name"
            type="text"
          />
          {!formData.street_name && (
            <div className="text-red text-xs">Street Name is required</div>
          )}
        </div>
        <div className="contact-field w-full">
          <input
            name="city"
            value={formData.city}
            onChange={handleChange}
            className="w-full px-3 py-3 border bg-white text-cgreen-200 border-cgray-600 rounded-sm2 text-xs font-AvertastdRegular focus-visible:outline-none"
            placeholder="City"
            type="text"
          />
          {!formData.city && (
            <div className="text-red text-xs">City is required</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PersonalDetailsForm;
