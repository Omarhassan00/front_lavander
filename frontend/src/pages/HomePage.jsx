import { useEffect } from "react";
import { useArticleStore } from "../stores/useArticleStore";
import FeaturedArticle from "../components/FeaturedArticle";
import "../../public/css/bloggar.css";
import "../../public/css/Home.css";
import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";
import "../../public/css/brand.css";
const HomePage = () => {
  const { fetchFeaturedArticles, Articles, isLoading } = useArticleStore();

  useEffect(() => {
    fetchFeaturedArticles();
  }, [fetchFeaturedArticles]);
  return (
    <div
      onClick={() => {
        Navbar.menuBtn;
      }}
    >
      {!isLoading && Articles.length > 0 && (
        <FeaturedArticle featuredArticle={Articles} />
      )}

      <div className="media-icon">
        <Link to="https://www.facebook.com/maidarawe?mibextid=ZbWKwL"></Link>
        <Link to="https://www.instagram.com/lavendermarketing634?igsh=YzAwZjE1ZTI0Zg=="></Link>
        <Link to="https://www.tiktok.com/@lavanderlifeexporting?_t=8piAmaKUfNB&_r=1"></Link>
      </div>
      <h1 className="text-center text-5xl sm:text-6xl my-8 font-bold text-purple-600 mb-4">
        Our Brands
      </h1>
      <div className="container-brands">
        <div className="brands">
          <Link to={"/category/Lavand"}>
            <div className="child-brand">
              <div className="img-brand imag1"></div>
              <div className="txt-brand txt1">
                <span>Egyptian civilization in lavander colors</span>
              </div>
            </div>
          </Link>
          <Link to={"/category/Lavant"}>
            <div className="child-brand">
              <div className="img-brand imag10"></div>
              <div className="txt-brand txt10">
                <span>
                  African brand in lavander
                  <br />
                  colors
                </span>
              </div>
            </div>
          </Link>
          <Link to={"/category/Lavande"}>
            <div className="child-brand">
              <div className="img-brand imag3"></div>
              <div className="txt-brand txt3">
                <span>
                  Lavender
                  <br />
                  scent
                </span>
              </div>
            </div>
          </Link>
          <Link to={"/category/Lava"}>
            <div className="child-brand">
              <div className="img-brand imag8"></div>
              <div className="txt-brand txt8">
                <span>The elegance of Handmade in different colors</span>
              </div>
            </div>
          </Link>
          <Link to={"/category/Lavanderita"}>
            <div className="child-brand">
              <div className="img-brand imag5"></div>
              <div className="txt-brand txt5">
                <span>
                  The elegance of Italian fashion with the scent of lavander
                </span>
              </div>
            </div>
          </Link>
          <Link to={"/category/Lavandula"}>
            <div className="child-brand">
              <div className="img-brand imag4"></div>
              <div className="txt-brand txt4">
                <span>
                  The elegance of spanish fashion with scent of lavander
                </span>
              </div>
            </div>
          </Link>
          <Link to={"/category/Lavanderá"}>
            <div className="child-brand">
              <div className="img-brand imag2"></div>
              <div className="txt-brand txt2">
                <span>
                  The elegance of French fashion with the scent of lavander
                </span>
              </div>
            </div>
          </Link>
          <Link to={"/category/Lavash"}>
            <div className="child-brand">
              <div className="img-brand imag7"></div>
              <div className="txt-brand txt7">
                <span>Leather furniture with a lavander mixture</span>
              </div>
            </div>
          </Link>
          <Link to={"/category/Lavarn"}>
            <div className="child-brand">
              <div className="img-brand imag6"></div>
              <div className="txt-brand txt6">
                <span>
                  Perfume with all French and Italian lavander fragrance
                </span>
              </div>
            </div>
          </Link>
          <Link to={"/category/Lavania"}>
            <div className="child-brand">
              <div className="img-brand imag9"></div>
              <div className="txt-brand txt9">
                <span>
                  Stationery and school supplies with the scent of lavander
                </span>
              </div>
            </div>
          </Link>
        </div>
      </div>
      <div className="wrapper">
        <div
          onClick={(event) => {
            const clickedElement = event.target,
              imgs = document.querySelectorAll(".img");

            if (!clickedElement.classList.contains("img")) {
              imgs.forEach((img) => img.classList.remove("active"));
              return;
            }
            if (clickedElement.classList.contains("active")) {
              clickedElement.classList.remove("active");
              return;
            }
            imgs.forEach((img) => img.classList.remove("active"));
            clickedElement.classList.add("active");
          }}
          className="imgs-parent"
        >
          <div
            className="img img1"
            style={{
              backgroundImage: `url('https://res.cloudinary.com/ds7lqwxbp/image/upload/v1729222541/static/smk86a9m7ubyu66k7uzt.png')`,
            }}
          ></div>
          <div
            className="img img2"
            style={{
              backgroundImage:
                "url('https://res.cloudinary.com/ds7lqwxbp/image/upload/v1729222538/static/koxeclafqaomhde4odmr.jpg')",
            }}
          ></div>
          <div
            className="img img3"
            style={{
              backgroundImage:
                "url('https://res.cloudinary.com/ds7lqwxbp/image/upload/v1729222540/static/eq86zt5rklwlyaqxlkjw.png')",
            }}
          ></div>
          <div
            className="img img4"
            style={{
              backgroundImage:
                "url('https://res.cloudinary.com/ds7lqwxbp/image/upload/v1729222539/static/wojwaa4fomizftgaazoq.png')",
            }}
          ></div>
          <div
            className="img img5"
            style={{
              backgroundImage:
                "url('https://res.cloudinary.com/ds7lqwxbp/image/upload/v1729222539/static/qxxayhgluwstqp3z5ore.png')",
            }}
          ></div>
          {/* <div
            className="img img6"
            style={{
              backgroundImage: `url('../../public/img/view-3d-businessman_23-2150709872.jpg')`,
            }}
          ></div>
          <div
            className="img img7"
            style={{
              backgroundImage: `url('../../public/img/view-3d-girl-with-open-book.jpg')`,
            }}
          ></div>
          <div
            className="img img8"
            style={{
              backgroundImage: `url('../../public/img/view-3d-shocked-man-with-mouth-wide-open.jpg')`,
            }}
          ></div> */}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
