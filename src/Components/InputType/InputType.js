import React, { useEffect, useState } from "react";
import "./InputType.scss";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import { SelectChangeEvent } from "@mui/material/Select";
import { list } from "./Country";
import axios from "axios";
import { SearchableSelect } from "@dccs/react-searchable-select-mui";
import { Select } from "antd";
const InputType = ({ updateType, updateCountry, updatestate }) => {
  const [type, setType] = useState("");
  const [country, setCountry] = useState("");
  const [options, setOptions] = useState(false);
  const [states, setStates] = useState([]);

  const [showstates, setShowstates] = useState(false);

  const [selectstate, setSelectstate] = useState();

  const [search, setSearch] = useState("");

  const [value, setValue] = useState();

  const handleChangenew = (event) => {
    setValue(event.target.value);
  };

  const URL = "https://api.idverify.click";

  const handleChange_country = (event) => {
    setOptions(false);
    setCountry(event.target.value);
    updateCountry(event.target.value);

    if (
      event === "ind" ||
      event === "are" ||
      event === "egy" ||
      event === "uae" ||
      event === "gbr"
    ) {
      setOptions(true);
    }
    localStorage.removeItem("country");
    localStorage.setItem("country", event.target.value);
  };

  const handleChange = async (event) => {
    localStorage.removeItem("uploadtype");
    updateType(event.target.value);
    setType(event.target.value);

    if (
      (country == "usa" || country === "ind") &
      (event.target.value == "drivers_license")
    ) {
      var formdata = new FormData();
      formdata.append("type_of_id", event.target.value);
      formdata.append("country", country);
      try {
        const get_states = await axios.post(
          `${URL}/id_verify/templates/`,
          formdata,
          {
            headers: {
              "Content-Type": "multipart/form-data;",
            },
          }
        );

        console.log("states", get_states.data.sub_types);

        setStates(get_states.data.sub_types.sort());
        setShowstates(true);
        console.log(states);
      } catch (err) {
        console.log(err);
      }

      //  console.log("get_states", get_states);
    }
  };

  const handleChange_State = (event) => {
    updatestate(event.target.value);
    setSelectstate(event.target.value);
  };

  const contry = localStorage.getItem("contry");

  return (
    <>
      <div className="type-ctn">
        <div className="u-title">Select</div>
          {/* <Select
            mode="multiple"
            className="selectcountry selectcountryborder"
            onChange={handleChange_country}
            placeholder="Select Country"
          >
            {list.map((item) => (
              <Select.Option value={item.country} key={item.country}>
                {item.label}
              </Select.Option>
            ))}
          </Select> */}
        <select
          id="demo-simple-select1"
          value={country}
          label="Select Country"
          onChange={handleChange_country}
          className="selectcountry country_uppercase"
        >
          <option>Select Country</option>
          {list.map((item) => {
            return <option value={item.country}>{item.label}</option>;
          })}
        </select>
        <br />
        <select
          id="demo-simple-select"
          value={type}
          label="ID Type"
          onChange={handleChange}
          className="selectcountry"
        >
          <option>Select ID Type</option>

          {country == "ind" ||
          country == "egy" ||
          country == "jor" ||
          country == "uae" ||
          country == "gbr" ||
          country == "usa" ? (
            <>
              <option value={"nationalid"}>National ID</option>
              <option value={"passport"}>Passport</option>
              <option value={"drivers_license"}>Driving License</option>
            </>
          ) : (
            <>
              <option value={"nationalid"}>National ID</option>
              <option value={"passport"}>Passport</option>
            </>
          )}
        </select>

        <br />
        {showstates ? (
          <select
            id="demo-simple-select"
            value={selectstate}
            label="Select State"
            onChange={handleChange_State}
            className="selectcountry"
          >
            <option>Select State</option>
            {states.map((item) => {
              return <option>{item}</option>;
            })}
          </select>
        ) : (
          ""
        )}
      </div>
    </>
  );
};

export default InputType;
