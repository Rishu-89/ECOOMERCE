import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Checkbox, Radio } from "antd";
import { Prices } from "../components/Prices";
import { useCart } from "../context/Cart";
import axios from "axios";
import { toast } from "react-toastify";
import Layout from "../components/layout/Layout";

import "../styles/HomePage.css";

const HomePage = () => {
  const navigate = useNavigate();
  const [cart, setCart] = useCart();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [checked, setChecked] = useState([]);
  const [radio, setRadio] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  //get all cat
  const getAllCategory = async () => {
    try {
      const { data } = await axios.get("https://ecoomerce-h1c7.onrender.com/api/v1/category/get-category");
      if (data?.success) {
        
        setCategories(data?.category);
      }
    } catch (error) {
      console.log(error);
    }
  };


  useEffect(() => {
    getAllCategory();
    getTotal();
  }, []);



  
  //getTOtal COunt
  const getTotal = async () => {
    try {
      const { data } = await axios.get("https://ecoomerce-h1c7.onrender.com/api/v1/product/product-count");
      setTotal(data?.total);
    } catch (error) {
      console.log(error);
    }
  };




  //get products
  const getAllProducts = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`https://ecoomerce-h1c7.onrender.com/api/v1/product/product-list/${page}`);
      setLoading(false);
      setProducts(data.products);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };







  // useEffect(() => {
  //   if (page === 1) return;
  //   loadMore();
  // }, [page]);





  //load more
  // const loadMore = async () => {
  //   try {
  //     setLoading(true);
  //     const { data } = await axios.get(`http://localhost:8080/api/v1/product/product-list/${page}`);
  //     setLoading(false);
  //     setProducts([...products, ...data?.products]);
  //   } catch (error) {
  //     console.log(error);
  //     setLoading(false);
  //   }
  // };



  // filter by cat
  const handleFilter = (value, id) => {
    let all = [...checked];
    if (value) {
      all.push(id);
    } else {
      all = all.filter((c) => c !== id);
    }
    setChecked(all);
  };




    //get filterd product
    const filterProduct = async () => {
      try {
        const { data } = await axios.post("https://ecoomerce-h1c7.onrender.com/api/v1/product/product-filters", {
          checked,
          radio,
        });
        setProducts(data?.products);
      } catch (error) {
        console.log(error);
      }
    };


    
  useEffect(() => {
    if (checked.length > 0 || radio.length > 0) {
      filterProduct();
    }
  }, [checked, radio]);

  useEffect(() => {
    if (checked.length === 0 && radio.length === 0) {
      getAllProducts();
    }
  }, [checked, radio]);




  // useEffect(() => {
  //   if (!checked.length || !radio.length) getAllProducts();
  // }, [checked.length, radio.length]);

  // useEffect(() => {
  //   if (checked.length || radio.length) filterProduct();
  // }, [checked, radio]);





  return (
    <Layout title={"ALl Products - Best offers "}>
      {/* banner image */}
      <img
        src="/images/banner.jpg"
        className="banner-img"
        alt="bannerimage"
        width={"100%"}
      />
      {/* banner image */}
      <div className="container-fluid row mt-3 home-page">
        <div className="col-md-3 filters">
          <h4 className="text-center">Filter By Category</h4>
          <div className="d-flex flex-column">
            {categories?.map((c,index) => (
              <Checkbox
                key={index}
                onChange={(e) => handleFilter(e.target.checked, c._id)}
              >
                {c.name}
              </Checkbox>
            ))}
          </div>
          {/* price filter */}
          <h4 className="text-center mt-4">Filter By Price</h4>
          <div className="d-flex flex-column">
            <Radio.Group onChange={(e) => setRadio(e.target.value)}>
              {Prices?.map((p) => (
                <div key={p._id}>
                  <Radio value={p.array}>{p.name}</Radio>
                </div>
              ))}
            </Radio.Group>
          </div>
          <div className="d-flex flex-column">
            <button
              className="btn btn-danger"
              onClick={() => window.location.reload()}
            >
              RESET FILTERS
            </button>
          </div>
        </div>
        {loading ? <>
          <div>
            <center>
  <div className="spinner-border" style={{width: '12rem', height: '12rem'}} role="status">
    <span className="visually-hidden">Loading...</span>
  </div>
  <div className="spinner-grow" style={{width: '13rem', height: '13rem'}} role="status">
    <span className="visually-hidden">Loading...</span>
  </div>
  <h1>Loading products...............</h1>
  </center>
</div>

        
        </>:<>
        <div className="col-md-9 ">
          <h1 className="text-center">All Products</h1>
          <div className="d-flex flex-wrap">
            {products?.map((p) => (
              <div className="card m-2" key={p._id}>
                <img
                  src={`https://ecoomerce-h1c7.onrender.com/api/v1/product/product-photo/${p._id}`}
                  className="card-img-top"
                  alt={p.name}
                />
                <div className="card-body">
                  <div className="card-name-price">
                    <h5 className="card-title">{p.name}</h5>
                    <h5 className="card-title card-price">
                      {p.price.toLocaleString("en-US", {
                        style: "currency",
                        currency: "USD",
                      })}
                    </h5>
                  </div>
                  <p className="card-text ">
                    {p.description.substring(0, 60)}...
                  </p>
                  <div className="card-name-price">
                    <button
                      className="btn btn-info ms-1"
                      onClick={() => navigate(`/product/${p.slug}`)}
                    >
                      More Details
                    </button>
                    <button
                      className="btn btn-dark ms-1"
                      onClick={() => {
                        setCart([...cart, p]);
                        localStorage.setItem(
                          "cart",
                          JSON.stringify([...cart, p])
                        );
                        toast.success("Item Added to cart");
                      }}
                    >
                      ADD TO CART
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          {/* <div className="m-2 p-3">
            {products && products.length < total && (
              <button
                className="btn loadmore"
                onClick={(e) => {
                  e.preventDefault();
                  setPage(page + 1);
                }}
              >
                {loading ? (
                  "Loading ..."
                ) : (
                  <>
                    {" "}
                    Loadmore 
                    
                  </>
                )}
              </button>
            )}
          </div> */}
        </div>
        </>}
     
      </div>
    </Layout>
  );
};

export default HomePage;









