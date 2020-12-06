import React, { useState } from "react";
import deepcopy from "deepcopy";
import EmploymentDetails from "./Employment";
import produce from "immer";
import "./styles.css";

export default function App() {
  const [user, setUser] = useState({
    personalDetails: {
      name: "Rajat Kumar",
      address: {
        house: 1234,
        street: "street 1",
        city: "Chandigarh",
        pin: "000001"
      }
    },
    employmentDetails: {
      company: "Paytm",
      role: "Software Engineer"
    }
  });

  const handleInput = (value) => {
    // make copy to avoid mutating state directly
    const userCopy = { ...user };
    const address = { ...userCopy.personalDetails.address };
    address.street = value;
    userCopy.personalDetails.address = address;
    setUser(userCopy);
  };

  const handleInputWithDeepCopy = (value) => {
    const userCopy = deepcopy(user);
    userCopy.personalDetails.address.street = value;
    setUser(userCopy);
  };

  const handleInputWithImmer = (value) => {
    const userCopy = produce(user, (draft) => {
      draft.personalDetails.address.street = value;
    });
    setUser(userCopy);
  };

  return (
    <div>
      <h1>React setState</h1>
      <label htmlFor="street">New street value: </label>
      {/*changing onInput handler to handleInputWithDeepCopy breaks the React.memo optimisation*/}
      <input
        type="text"
        value={user.personalDetails.address.street}
        name="street"
        onInput={(e) => handleInputWithImmer(e.target.value)}
      ></input>
      <pre>{JSON.stringify(user, null, "\t")}</pre>
      <EmploymentDetails employmentDetails={user.employmentDetails} />
    </div>
  );
}
