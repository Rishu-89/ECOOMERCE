import React from 'react'
import Header from './Header'
import Footer from './Footer'
import {Helmet} from "react-helmet";
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Layout = (props) => {
  return (
    <>
     {/* <Helmet>
    
  <meta name={description} content={description} />
  <meta name={keywords} content={content} />
  <meta name={author} content="John Doe" />


            </Helmet> */}
      <Header/>
      <main style={{minHeight:'70vh'}}>
      <ToastContainer />
        {props.children}
        </main>
      <Footer/>

    </>
  )
}

export default Layout
