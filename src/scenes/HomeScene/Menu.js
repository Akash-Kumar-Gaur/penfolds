import React from "react";
import "./Menu.scss";

export function toggleMenu() {
  const menu = document.getElementById("menu");
  const bar1 = document.getElementById("bar1");
  const bar2 = document.getElementById("bar2");
  const bar3 = document.getElementById("bar3");
  bar1.classList.toggle("up");
  bar2.classList.toggle("mid");
  bar3.classList.toggle("low");
  menu.classList.toggle("cover");
}

export default function MyMenu() {
  return (
    <>
      <div id="menu-wrapper" onClick={() => toggleMenu()}>
        <div
          id="bar1"
          style={{
            backgroundColor: "#fff",
          }}
        />
        <div
          id="bar2"
          style={{
            backgroundColor: "#fff",
          }}
        />
        <div
          id="bar3"
          style={{
            backgroundColor: "#fff",
          }}
        />
      </div>
    </>
  );
}
