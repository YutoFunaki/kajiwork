import React, { useState } from "react";
import Select from "react-select";

const CompleteWorkForm = () => {
  const users = [
    { value: "you", label: "あなた" },
    { value: "rena", label: "れな" },
  ];

  const [selectedValue, setSelectedValue] = useState(users[0]);

  return (
    <div>
      <p className="AppSubtitle">家事完了ページ</p>

      <div className="userSelect">
        <Select
          options={users}
          value={selectedValue}
          onChange={(value) => {
            setSelectedValue(value);
          }}
        />
      </div>

      <label className="workSelect">
        <select className="item" multiple>
          <option>text1</option>
          <option>text2</option>
          <option>text3</option>
        </select>
      </label>
    </div>
  );
};

export default CompleteWorkForm;

