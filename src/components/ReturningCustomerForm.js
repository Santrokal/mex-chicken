const ReturningCustomerForm = ({ formData1, handleChange }) => {
  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };
  return (
    <form className="w-full p-4 bg-white rounded shadow-light-theme">
      <h6 className="text-black font-semibold capitalize">
        Returning Customer
      </h6>

      <div className="grid md:grid-cols-3 gap-5 mt-5">
        <div className="col-span-1">
          <p class="text-black  font-AvertaStdEB ">E-mail</p>
        </div>
        <div class="col-span-2">
          <div class="contact-field w-full">
            <input
              name="email_address"
              value={formData1.email_address}
              onChange={handleChange}
              class="w-full px-3 py-3 border bg-cwhite-primary text-cgreen-200 border-cgray-600 rounded-sm2 text-xs font-AvertastdRegular focus-visible:outline-none"
              placeholder="Enter email"
              type="text"
            />
            {!formData1.email_address ? (
              <div className="text-red text-xs">Email Id is required</div>
            ) : (
              !isValidEmail(formData1.email_address) && (
                <div className="text-red text-xs">
                  Enter a valid email address
                </div>
              )
            )}
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-5 mt-5">
        <div className="col-span-1">
          <p class="text-black  font-AvertaStdEB ">Password</p>
        </div>
        <div class="col-span-2">
          <div class="contact-field w-full">
            <input
              name="password"
              value={formData1.password}
              onChange={handleChange}
              class="w-full px-3 py-3 border bg-cwhite-primary text-cgreen-200 border-cgray-600 rounded-sm2 text-xs font-AvertastdRegular focus-visible:outline-none"
              placeholder="Enter Password"
              type="text"
            />
            {!formData1.email_address && (
              <div className="text-red text-xs">Password is required</div>
            )}
          </div>
        </div>
      </div>

      <div className="flex justify-center mt-6">
        <button
          type="button"
          disabled=""
          class="w-3/4 px-2 text-white bg-red rounded-md py-3 font-Avertastd">
          Login
        </button>
      </div>
    </form>
  );
};

export default ReturningCustomerForm;
