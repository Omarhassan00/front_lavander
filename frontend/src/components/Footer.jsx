import "../../public/css/Footer.css";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="row">
          <div className="footer-col">
            <h4>company</h4>
            <ul>
              <li>
                <Link to={"/home"}>Home Page</Link>
              </li>
              <li>
                <Link to={"/Plogs"}>Articals</Link>
              </li>
              <li>
                <Link to={"/product_page"}>Product</Link>
              </li>
              <li>
                <Link to={"/About"}>About Us</Link>
              </li>
              <li>
                <Link to={"/ContactUs"}>Contact Us</Link>
              </li>
            </ul>
          </div>
          <div className="footer-col">
            <h4>Carrer</h4>
            <ul>
              <li>
                <Link to={"#"}>Recrutments</Link>
              </li>
              <li>
                <Link to={"#"}>Training</Link>
              </li>
              <li>
                <Link to={"#"}>Internship</Link>
              </li>
            </ul>
          </div>
          <div className="footer-col">
            <h4>Our Brands</h4>
            <ul className="Brands-nav">
              <li>
                <Link to={"/category/Lavant"}>LAVANT</Link>
              </li>
              <li>
                <Link to={"/category/Lavand"}>LAVAND</Link>
              </li>
              <li>
                <Link to={"/category/Lavande"}>LAVANDE</Link>
              </li>
              <li>
                <Link to={"/category/Lava"}>LAVA</Link>
              </li>
              <li>
                <Link to={"/category/Lavanderita"}>LAVANDERITA</Link>
              </li>
              <li>
                <Link to={"/category/Lavandula"}>LAVANDULA</Link>
              </li>
              <li>
                <Link to={"/category/Lavanderá"}>LAVANDERÁ</Link>
              </li>
              <li>
                <Link to={"/category/Lavash"}>LAVASH</Link>
              </li>
              <li>
                <Link to={"/category/Lavarne"}>LAVARNE</Link>
              </li>
              <li>
                <Link to={"/category/Lavania"}>LAVANIA</Link>
              </li>
            </ul>
          </div>
          <div className="footer-col">
            <h4>follow us</h4>
            <div className="social-links">
              <Link to={"https://www.facebook.com/maidarawe?mibextid=ZbWKwL"}>
                <i className="fab fa-facebook-f"></i>
              </Link>
              <Link to={"https://www.linkedin.com/in/lavender-life-exporting-3145852b4?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app"}>
                <i className="fab fa-linkedin"></i>
              </Link>
              <Link to={"https://www.instagram.com/lavendermarketing634?igsh=YzAwZjE1ZTI0Zg=="}>
                <i className="fab fa-instagram"></i>
              </Link>
              <Link to={"https://www.tiktok.com/@lavanderlifeexporting?_t=8piAmaKUfNB&_r=1"}>
                <i className="fab fa-tiktok"></i>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
