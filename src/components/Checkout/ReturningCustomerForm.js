import { useAuth } from "./AuthContext";
import { useState } from "react";
import BillingDetailsForm from "./BillingDetailsForm";

const ReturningCustomerForm = () => {
  const [formData1, setFormData1] = useState({
    email_address: "",
    password: "",
  });
  const [formData2, setFormData2] = useState({});
  const [loggedIn, setLoggedIn] = useState(false);
  const [error, setError] = useState("");

  const { login } = useAuth();

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (!loggedIn) {
      setFormData1((prev) => ({ ...prev, [name]: value }));
    } else {
      setFormData2((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleLogin = async () => {
    if (!formData1.email_address || !formData1.password) {
      setError("All fields are required.");
      return;
    }

    try {
      const response = await fetch("http://localhost:8000/users");
      const users = await response.json();

      const user = users.find(
        (u) =>
          u.email === formData1.email_address &&
          u.password === formData1.password
      );

      if (user) {
        login(user);
        setLoggedIn(true);

        const billingRes = await fetch(
          `http://localhost:8000/billingInfo?email=${user.email}`
        );
        const billing = await billingRes.json();
        if (billing.length > 0) setFormData2(billing[0]);
      } else {
        setError("Invalid credentials. Please check again.");
      }
    } catch (err) {
      console.error("Login error:", err);
      setError("Login failed. Try again.");
    }
  };

  return (
    <>
      {!loggedIn ? (
        <form className="w-full p-4 bg-white rounded shadow-light-theme">
          <h6 className="text-black font-semibold capitalize">
            Returning Customer
          </h6>

          <div className="grid md:grid-cols-3 gap-5 mt-5">
            <div className="col-span-1">
              <p className="text-black font-AvertaStdEB">E-mail</p>
            </div>
            <div className="col-span-2">
              <input
                name="email_address"
                value={formData1.email_address}
                onChange={handleChange}
                className="w-full px-3 py-3 border bg-cwhite-primary text-cgreen-200 border-cgray-600 rounded-sm2 text-xs font-AvertastdRegular"
                placeholder="Enter email"
              />
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-5 mt-5">
            <div className="col-span-1">
              <p className="text-black font-AvertaStdEB">Password</p>
            </div>
            <div className="col-span-2">
              <input
                name="password"
                value={formData1.password}
                onChange={handleChange}
                className="w-full px-3 py-3 border bg-cwhite-primary text-cgreen-200 border-cgray-600 rounded-sm2 text-xs font-AvertastdRegular"
                placeholder="Enter Password"
                type="password"
              />
            </div>
          </div>

          {error && <div className="text-red text-xs mt-2">{error}</div>}

          <div className="flex justify-center mt-6">
            <button
              type="button"
              onClick={handleLogin}
              className="w-3/4 px-2 text-white bg-red rounded-md py-3 font-Avertastd">
              Login
            </button>
          </div>
        </form>
      ) : (
        <BillingDetailsForm formData2={formData2} handleChange={handleChange} />
      )}
    </>
  );
};

export default ReturningCustomerForm;
