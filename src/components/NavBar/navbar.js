import React, { Component } from "react";
import nvstyle from "./navbar.module.css";

export default function Navbar() {
  return (
    <nav className={nvstyle["navbar"]}>
      <div className={nvstyle["navbar_header_logo"]}>NOCO</div>
      <div className="d-flex justify-between" style={{ width: "" }}>
        <div className="d-flex" style={{ width: "1100px" }}>
          <div className="mx-4 ">page: Home</div>

          <div className="mx-4 ">Webpage</div>

          <div className="mx-4 ">About</div>

          <div className="mx-4 ">Setting</div>
        </div>

        <div className="right d-flex ml-4 w-full">
          <div>
            <button
              className=" Preview ml-3 "
              style={{ backgroundColor: "#fff5ff" , border:"1px solid black", borderRadius:"20px" }}
            >
              Preview{" "}
            </button>
          </div>

          <div>
            <button
              className="Save ml-3 "
              style={{ backgroundColor: "#fff5ff" , border:"1px solid black", borderRadius:"20px" }}
              
            >
              Save{" "}
            </button>
          </div>

          <div>
            <button className="Publish" style={{ backgroundColor: "blue",  border:"1px solid black", borderRadius:"20px" }}
            >
              Publish{" "}
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
