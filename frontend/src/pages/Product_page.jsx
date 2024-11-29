import { useEffect } from "react";
import { useProductStore } from "../stores/useProductStore";
import FeaturedProducts from "../components/FeaturedProducts";
import "../../public/css/brand.css"
import { Link } from "react-router-dom";

const Product_page = () => {
  const { fetchFeaturedProducts, products, loading } = useProductStore();

  useEffect(() => {
    fetchFeaturedProducts();
  }, [fetchFeaturedProducts]);

  return (
    <div className="relative min-h-screen text-gray-800 overflow-hidden">
      <div className="relative z-10 max-w-7xl mx-auto mt-7 px-4 sm:px-6 lg:px-8 py-16">
        {!loading && products.length > 0 && (
          <FeaturedProducts featuredProducts={products} />
        )}

          <h1 className="text-center text-5xl sm:text-6xl my-8 font-bold text-purple-600 mb-4">
            Explore Our Brands
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
          <Link to={"/category/Lavanderá"}>

            <div className="child-brand">
              <div className="img-brand imag2"></div>
              <div className="txt-brand txt2">
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
          <Link to={"/category/Lavandula"}>

            <div className="child-brand">
              <div className="img-brand imag4"></div>
              <div className="txt-brand txt4">
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
          <Link to={"/category/Lavarn"}>

            <div className="child-brand">
              <div className="img-brand imag6"></div>
              <div className="txt-brand txt6">
                <span>
                  The elegance of spanish fashion with scent of lavander
                </span>
              </div>
            </div>
          </Link>
          <Link to={"/category/Lavash"}>

            <div className="child-brand">
              <div className="img-brand imag7"></div>
              <div className="txt-brand txt7">
                <span>
                  The elegance of French fashion with the scent of lavander
                </span>
              </div>
            </div>
          </Link>
          <Link to={"/category/Lava"}>

            <div className="child-brand">
              <div className="img-brand imag8"></div>
              <div className="txt-brand txt8">
                <span>Leather furniture with a lavander mixture</span>
              </div>
            </div>
          </Link>
          <Link to={"/category/Lavania"}>
          
            <div className="child-brand">
              <div className="img-brand imag9"></div>
              <div className="txt-brand txt9">
                <span>
                  Perfume with all French and Italian lavander fragrance
                </span>
              </div>
            </div>
          </Link>
          <Link to={"/category/Lavant"} >

            <div className="child-brand">
              <div className="img-brand imag10"></div>
              <div className="txt-brand txt10">
                <span>
                  Stationery and school supplies with the scent of lavander
                </span>
              </div>
            </div>
          </Link>
        </div>
      </div>
        </div>
      </div>
  );
};
export default Product_page;
