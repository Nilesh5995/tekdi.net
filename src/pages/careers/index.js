import React from 'react';
import Helmet from 'react-helmet';
import SEO from '../../components/common/site-metadata';
import Layout from '../../components/layout/baselayout';
import Openingslist from '../../components/careers/careers-accordian'; 
import Banner from '../../components/common/banner/banner';
import ContactUs from '../../components/common/contact/contact';

const CareersIndexPage =  ({data}) => {
  
    const { frontmatter } = data.markdownRemark

    return (
      <Layout>
        <SEO 
          title={frontmatter.title}
          description={frontmatter.description}
        />
        <Helmet>
        <script src={`https://www.google.com/recaptcha/api.js? r=${Math.random()}`} async defer>
       </script>
          {/* <title>{frontmatter.title}</title>
          <meta
            name="description"
            content={`${frontmatter.description}`}
          /> */}
        </Helmet>
        <div className="careers-page">
          <Banner 
            bannerTitle= {frontmatter.bannerTitle} 
            bannerSubTitle = {frontmatter.bannerSubTitle}
          />
          <div className="container py-5">
            <div className="col-lg-8 col-md-10 offset-lg-2 offset-md-1 col-xs-12">
              <h3 className="com-heading text-black text-center mb-5">{frontmatter.heading}</h3>
              <Openingslist />
            </div>
          </div>
          <ContactUs />
          </div>
      </Layout>
    )

}

export default CareersIndexPage;

export const pageQuery = graphql`
  query CareersBanner {
    markdownRemark(frontmatter: { templateKey: { eq: "careers-banner" }}) {
      frontmatter {
        title
        description
        heading
        bannerTitle
        bannerSubTitle
      }
    }
  }
`