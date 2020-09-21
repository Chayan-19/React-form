import React, { Fragment, useState } from "react";
import axios from "axios";

const Form = () => {
  const [candidate, setCandidate] = useState({
    fullName: "",
    phoneNumber: 0,
    email: "",
    gitProfile: "",
    linkToResume: "",
    designation: "",
    interest: "",
  });

  const onChange = e =>
    setCandidate({ ...candidate, [e.target.name]: e.target.value });

  const onSubmit = e => {
    e.preventDefault();

    axios
      .post("https://webhook.site/4a4398c8-f074-4bfd-a81b-8c0504574224", {
        candidate,
      })
      .then(res => {
        console.log(res, candidate);
      });
  };

  const designationOptions = [
    "--select option--",
    "Graphic Designer",
    "Full Stack Developer",
    "Project Manager",
    "SEO and Digital Marketing",
  ];

  return (
    <Fragment>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <div className="form-row">
            <label>Full Name</label>
            <input
              type="text"
              name="fullName"
              value={candidate.fullName}
              onChange={onChange}
              required
            />
          </div>

          <div className="form-row">
            <label>Phone Number</label>
            <input
              type="number"
              name="phoneNumber"
              value={candidate.phoneNumber}
              onChange={onChange}
              required
            />
          </div>

          <div className="form-row">
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={candidate.email}
              onChange={onChange}
              required
            />
          </div>

          <div className="form-row">
            <label>Git Profile(Optional)</label>
            <input
              type="url"
              name="gitProfile"
              value={candidate.gitProfile}
              onChange={onChange}
            />
          </div>

          <div className="form-row">
            <label>Link to your Resume</label>
            <input
              type="url"
              name="linkToResume"
              value={candidate.linkToResume}
              onChange={onChange}
              required
            />
          </div>

          <div className="form-row">
            <label>Designation</label>
            <select
              type="text"
              name="designation"
              value={candidate.designation}
              onChange={onChange}
              required
            >
              {designationOptions.map((item, index) => (
                <option value={`${item}`} key={index}>
                  {item}
                </option>
              ))}
            </select>
          </div>

          <div className="form-row">
            <label>Interest</label>
            <textarea
              type="text"
              name="interest"
              spellCheck="true"
              value={candidate.interest}
              onChange={onChange}
              required
            />
          </div>

          <input type="submit" className="btn" value="Submit" />
        </div>
      </form>
    </Fragment>
  );
};

export default Form;
