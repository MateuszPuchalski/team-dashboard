import React from "react";
import { useState, useEffect } from "react";

export default function SearchLog() {
  const filterLogs = () => {
    const searchBar = document.forms["searchLog"].querySelector("input");
    searchBar.addEventListener("keyup", function(e) {
      const term = e.target.value.toLowerCase();
      const logs = document.querySelectorAll(".logButton");

      logs.forEach(element => {
        const inner = element.innerHTML.toLowerCase();
        if (inner.indexOf(term) != -1) {
          element.style.display = "flex";
        } else {
          element.style.display = "none";
        }
      });
    });
  };
  useEffect(() => {
    filterLogs();
  }, []);

  return (
    <form id="searchLog">
      <input type="text" placeholder="Search Player" />
    </form>
  );
}
