import React, { useState } from "react";
import {
  BiGridAlt,
  BiMenu,
  BiChevronDown,
  BiCircle,
  BiNotepad,
  BiLayout,
  BiBarChart,
  BiStar,
  BiUser,
  BiQuestionMark,
  BiEnvelope,
  BiClipboard,
  BiLogIn,
  BiErrorAlt,
  BiFileBlank,
} from "react-icons/bi";
import { useNavigate } from "react-router-dom";

const Sidebar = () => {
  const [activeMenu, setActiveMenu] = useState("");
  const navigate = useNavigate();

  const toggleMenu = (menu) => {
    setActiveMenu(activeMenu === menu ? "" : menu);
  };

  return (
    <aside id="sidebar" className="sidebar">
      <ul className="sidebar-nav" id="sidebar-nav">
        {/* Dashboard */}
        <li className="nav-item">
          <button
            className="nav-link"
            style={{ width: "90%" }}
            onClick={() => navigate("/")}
          >
            <BiGridAlt className="bi" />
            <span>Thống kê</span>
          </button>
        </li>
        <li
          className="sidebar-nav"
          id="sidebar-nav"
          style={{ marginTop: "10px" }}
        >
          <button
            className="nav-link"
            style={{ width: "90%" }}
            onClick={() => navigate("/car")}
          >
            <i className="fa-solid fa-car bi"></i>
            <span>Mẫu xe</span>
          </button>
        </li>
        <li
          className="sidebar-nav"
          id="sidebar-nav"
          style={{ marginTop: "10px" }}
        >
          <button
            className="nav-link"
            style={{ width: "90%" }}
            onClick={() => navigate("/rental-order")}
          >
            <i className="fa-solid fa-file-lines bi"></i>
            <span>Đơn đặt hàng</span>
          </button>
        </li>
        <li
          className="sidebar-nav"
          id="sidebar-nav"
          style={{ marginTop: "10px" }}
        >
          <button
            className="nav-link"
            style={{ width: "90%" }}
            onClick={() => navigate("/insurance")}
          >
            <i className="fa-solid fa-clipboard bi"></i>
            <span>Bảo hiểm</span>
          </button>
        </li>
        <li
          className="sidebar-nav"
          id="sidebar-nav"
          style={{ marginTop: "10px" }}
        >
          <button
            className="nav-link"
            style={{ width: "90%" }}
            onClick={() => navigate("/promotions")}
          >
            <i className="fa-solid fa-tag bi"></i>
            <span>Khuyễn mãi</span>
          </button>
        </li>
        {/* Pages Section */}
        <li className="nav-heading">Pages</li>

        {[
          {
            icon: <BiUser className="bi" />,
            text: "Profile",
            link: "users-profile.html",
          },
          {
            icon: <BiEnvelope className="bi" />,
            text: "Contact",
            link: "pages-contact.html",
          },
          {
            icon: <BiLogIn className="bi" />,
            text: "Login",
            link: "pages-login.html",
          },
          {
            icon: <BiErrorAlt className="bi" />,
            text: "Error 404",
            link: "pages-error-404.html",
          },
        ].map((item, index) => (
          <li key={index} className="nav-item">
            <a className="nav-link collapsed" href={item.link}>
              {item.icon}
              <span>{item.text}</span>
            </a>
          </li>
        ))}
      </ul>
    </aside>
  );
};

export default Sidebar;
