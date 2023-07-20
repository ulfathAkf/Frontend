import React from "react";
import { Link } from "react-router-dom";
import "./Dashboard.css";


const Dashboard = () => {
  return (
    <>
     
      <div className="container-main">
        <div className="header">New Application</div>
        <div className="page-container">
        <div className="template">
          <div className="content">
            <div className="content-card">
            <i class="bi bi-plus-circle"><Link to="/FormBuilder"> + </Link></i>
                
            </div>
            
          </div>
        </div>
        <div className="recent">
        <div className="header">My Projects</div>

        <div className="content">
            <div className="content-card"></div>
            <div className="content-card">project 1</div>
            <div className="content-card">project 2</div>
            <div className="content-card">project 3</div>
            <div className="content-card">project 4</div>
          </div>
        </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
