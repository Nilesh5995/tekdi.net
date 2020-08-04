import React from 'react';
import {Link} from "gatsby";
import Layout from '../components/layout/baselayout';
import Banner from '../components/common/banner/banner';
import './404.scss';
const NotFoundPage = () => (
  <Layout>
    <Banner
    bannerTitle = "Page Not Found"
    />
  <div>
    <div className="container">
    <div className="not-found-text"></div>
      <div className="not-found-text">
        <p>P<i class="fa fa-exclamation-triangle" aria-hidden="true"></i>GE NOT FOUND</p>
      </div>
    </div>
    <div className="not-found-img">
      <div className="container"></div>
    </div>
    <div className="not-found-text">
      <span>Whoops! We couldn't find page you were looking for <br />
      but you can go back to homepage.</span>
    </div>
    <div className="button-container">
      <Link to="/" className="button-home" >Home Page</Link>
    </div>
</div>
</Layout>
)

export default NotFoundPage
