import React from "react";
import { userActions } from "../_actions/";
import { useDispatch } from "react-redux";

export default function LogutButton() {
  const dispatch = useDispatch();
  const handleClick = () => {
    dispatch(userActions.logout());
  };
  return <button onClick={handleClick}>LOGOUT</button>;
}
