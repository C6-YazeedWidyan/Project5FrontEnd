import React from "react";
import "./template.style.css";
import { useDispatch, useSelector } from "react-redux";
import { setTemplate } from "../../redux/reducers/template";
import { getTemplateText } from "../../redux/selectors/template.selectors";

const Template = () => {
  const dispatch = useDispatch();

  const templateText = useSelector(getTemplateText);

  const dummyDispatch = () => {
    dispatch(setTemplate("testPayload"));
  };

  return (
    <div className="container">
      <span>Template</span>
      <button onClick={dummyDispatch}>dispatch</button>
      <span>{templateText}</span>
    </div>
  );
};

export default Template;
