import React, { useState } from 'react';
import {
  BiGridAlt, BiMenu, BiChevronDown, BiCircle,
  BiNotepad, BiLayout, BiBarChart, BiStar,
  BiUser, BiQuestionMark, BiEnvelope, BiClipboard, BiLogIn, BiErrorAlt, BiFileBlank
} from 'react-icons/bi';

const Sidebar = () => {
  const [activeMenu, setActiveMenu] = useState('');

  const toggleMenu = (menu) => {
    setActiveMenu(activeMenu === menu ? '' : menu);
  };

  return (
    <aside id="sidebar" className="sidebar">
      <ul className="sidebar-nav" id="sidebar-nav">
        {/* Dashboard */}
        <li className="nav-item">
          <a className="nav-link" href="index.html">
            <BiGridAlt className="bi" />
            <span>Dashboard</span>
          </a>
        </li>

        {/* Components */}
        <li className="nav-item">
          <a 
            className={`nav-link ${activeMenu === 'components' ? '' : 'collapsed'}`}
            onClick={() => toggleMenu('components')}
          >
            <BiMenu className="bi" />
            <span>Components</span>
            <BiChevronDown className={`ms-auto ${activeMenu === 'components' ? 'rotate-180' : ''}`} />
          </a>
          <ul 
            id="components-nav" 
            className={`nav-content collapse ${activeMenu === 'components' ? 'show' : ''}`}
          >
            {['Alerts', 'Accordion', 'Badges', 'Breadcrumbs', 'Buttons', 'Cards', 
              'Carousel', 'List group', 'Modal', 'Tabs', 'Pagination', 'Progress', 
              'Spinners', 'Tooltips'].map((item) => (
              <li key={item}>
                <a href={`components-${item.toLowerCase().replace(' ', '-')}.html`}>
                  <BiCircle className="bi-menucon" />
                  <span>{item}</span>
                </a>
              </li>
            ))}
          </ul>
        </li>

        {/* Forms */}
        <li className="nav-item">
          <a 
            className={`nav-link ${activeMenu === 'forms' ? '' : 'collapsed'}`}
            onClick={() => toggleMenu('forms')}
          >
            <BiNotepad className="bi" />
            <span>Forms</span>
            <BiChevronDown className={`ms-auto ${activeMenu === 'forms' ? 'rotate-180' : ''}`} />
          </a>
          <ul 
            id="forms-nav" 
            className={`nav-content collapse ${activeMenu === 'forms' ? 'show' : ''}`}
          >
            {[ 'Layouts','Elements', 'Editors', 'Validation'].map((item) => (
              <li key={item}>
                <a href={`forms-${item.toLowerCase()}.html`}>
                  <BiCircle className="bi-menucon" />
                  <span>Form {item}</span>
                </a>
              </li>
            ))}
          </ul>
        </li>

        {/* Tables */}
        <li className="nav-item">
          <a 
            className={`nav-link ${activeMenu === 'tables' ? '' : 'collapsed'}`}
            onClick={() => toggleMenu('tables')}
          >
            <BiLayout className="bi" />
            <span>Tables</span>
            <BiChevronDown className={`ms-auto ${activeMenu === 'tables' ? 'rotate-180' : ''}`} />
          </a>
          <ul 
            id="tables-nav" 
            className={`nav-content collapse ${activeMenu === 'tables' ? 'show' : ''}`}
          >
            {['General', 'Data'].map((item) => (
              <li key={item}>
                <a href={`tables-${item.toLowerCase()}.html`}>
                  <BiCircle className="bi-menucon" />
                  <span>{item} Tables</span>
                </a>
              </li>
            ))}
          </ul>
        </li>

        {/* Charts */}
        <li className="nav-item">
          <a 
            className={`nav-link ${activeMenu === 'charts' ? '' : 'collapsed'}`}
            onClick={() => toggleMenu('charts')}
          >
            <BiBarChart className="bi" />
            <span>Charts</span>
            <BiChevronDown className={`ms-auto ${activeMenu === 'charts' ? 'rotate-180' : ''}`} />
          </a>
          <ul 
            id="charts-nav" 
            className={`nav-content collapse ${activeMenu === 'charts' ? 'show' : ''}`}
          >
            {['Chart.js', 'ApexCharts', 'ECharts'].map((item) => (
              <li key={item}>
                <a href={`charts-${item.toLowerCase().replace('.', '')}.html`}>
                  <BiCircle className="bi-menucon" />
                  <span>{item}</span>
                </a>
              </li>
            ))}
          </ul>
        </li>

        {/* Icons */}
        <li className="nav-item">
          <a 
            className={`nav-link ${activeMenu === 'icons' ? '' : 'collapsed'}`}
            onClick={() => toggleMenu('icons')}
          >
            <BiStar className="bi" />
            <span>Icons</span>
            <BiChevronDown className={`ms-auto ${activeMenu === 'icons' ? 'rotate-180' : ''}`} />
          </a>
          <ul 
            id="icons-nav" 
            className={`nav-content collapse ${activeMenu === 'icons' ? 'show' : ''}`}
          >
            {['Bootstrap', 'Remix', 'Boxicons'].map((item) => (
              <li key={item}>
                <a href={`icons-${item.toLowerCase()}.html`}>
                  <BiCircle className="bi-menucon" />
                  <span>{item} Icons</span>
                </a>
              </li>
            ))}
          </ul>
        </li>

        {/* Pages Section */}
        <li className="nav-heading">Pages</li>

        {[
          { icon: <BiUser className="bi"  />, text: 'Profile', link: 'users-profile.html' },
          { icon: <BiQuestionMark className="bi" />, text: 'F.A.Q', link: 'pages-faq.html' },
          { icon: <BiEnvelope className="bi" />, text: 'Contact', link: 'pages-contact.html' },
          { icon: <BiClipboard className="bi" />, text: 'Register', link: 'pages-register.html' },
          { icon: <BiLogIn className="bi" />, text: 'Login', link: 'pages-login.html' },
          { icon: <BiErrorAlt className="bi" />, text: 'Error 404', link: 'pages-error-404.html' },
          { icon: <BiFileBlank className="bi" />, text: 'Blank', link: 'pages-blank.html' }
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
