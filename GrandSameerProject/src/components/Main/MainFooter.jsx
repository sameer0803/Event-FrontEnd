// MainFooter.jsx
import { Link } from "react-router-dom";
import "./MainFooter.css";

const MainFooter = () => {
  return (
    <div className="main-footer-And-widget">
      {/* Main Footer Content */}
      <div className="main-footer">
        <div className="main-footer-container">
          <div className="main-footer1">
            <p className="hero__featured__title">LATEST NEWS</p>
            <p className="hero__featured__text">
              Latest news dainik bhaskas business excellence award
            </p>
            <a href="/global/news/" id="footer-anchor1" className="link">
              News overview
            </a>
          </div>

          <div className="main-footer2">
            <p className="hero__featured__title">PRODUCT HIGHLIGHT</p>
            <p className="hero__featured__text">
              Product highlight Transparent aluminium hanger
            </p>
            <a
              href="/global/products-services/event-space/levo/"
              id="footer-anchor2"
              className="link"
            >
              The Levo
            </a>
          </div>
        </div>
      </div>

      {/* Widget Section */}
      <div className="widget">
        <div className="widget-container">
          <div className="widget-inner">
            <h2 className="widget__title">How can we help you?</h2>

            <ol className="quickaccess__list">
              <li>
                <Link to="/solutions#sol-6" className="widget-button">
                  Design Your Own Warehouse
                </Link>
              </li>

              <li>
                <Link to="/solutions#sol-2" className="widget-button">
                  Political & Government Events
                </Link>
              </li>

              <li>
                <Link to="/solutions#sol-3" className="widget-button">
                  Corporate Events
                </Link>
              </li>

              <li>
                <Link to="/solutions#sol-5" className="widget-button">
                  Concerts & Grand Weddings
                </Link>
              </li>

              <li>
                <Link to="/solutions#sol-4" className="widget-button">
                  Cultural and religious gathering
                </Link>
              </li>
            </ol>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainFooter;
