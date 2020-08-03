import React from 'react';
import Layout from '../components/layout/baselayout';
import Banner from '../components/common/banner/banner';

const NotFoundPage = () => (
  <Layout>
     <Banner
            bannerTitle = "NOT FOUND"
          />
    <div>
      <h1>NOT FOUND</h1>
      <p>You just hit a route that doesn&#39;t exist... the sadness.</p>
    </div>
  </Layout>
)

export default NotFoundPage
