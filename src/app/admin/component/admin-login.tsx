import { useState } from "react";

export const AdminLogin = ({ setMatchPassword }) => {
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const pass = process.env.NEXT_PUBLIC_LOCAL_PASS;

  const predefinedPassword = pass;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password === predefinedPassword) {
      setMessage("Password is correct!");
      setMatchPassword(true);
    } else {
      setMessage("Password is incorrect. Please try again.");
    }
  };
  return (
    <div className="p-8 shadow-2xl rounded-xl">
      <h2 className="py-4">Password Validation</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div className="flex items-center gap-2">
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border shadow w-full p-2 rounded-md"
          />
        </div>
        <button type="submit" className="p-4 rounded-2xl bg-black text-white">
          Submit
        </button>
      </form>
      {message && (
        <div className="mt-1 text-red-500 font-medium">{message}</div>
      )}
    </div>
  );
};
