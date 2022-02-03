import React from "react";

const CreateAdmin = () => {
  return (
    <form className="form-control">
      <label className="label">
        <span className="label-text">Name</span>
      </label>
      <input
        type="text"
        placeholder="username"
        className="input input-bordered"
      />

      <label className="label">
        <span className="label-text">Email</span>
      </label>
      <input
        type="email"
        placeholder="email"
        className="input input-bordered"
      />

      <label className="label">
        <span className="label-text">Password</span>
      </label>
      <input
        type="password"
        placeholder="password"
        className="input input-bordered"
      />
    </form>
  );
};

export default CreateAdmin;
