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
          metakeywords= {frontmatter.metakeywords}
          metadescription={frontmatter.metadescription}
          ogimage={frontmatter.ogimage}
        />
        <Helmet>
        {/* <script src={`https://www.google.com/recaptcha/api.js? r=${Math.random()}`} async defer>
       </script> */}
        </Helmet>
        <div className="careers-page">
          <Banner 
            bannerTitle= {frontmatter.title}
            bannerSubTitle = {frontmatter.subTitle}
            image = {frontmatter.image}
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
    markdownRemark(frontmatter: { templateKey: { eq: "index-careers" }}) {
      frontmatter {
        title
        metakeywords
        metadescription
        ogimage {
          childImageSharp {
            fluid(quality: 100) {
              ...GatsbyImageSharpFluid
            }
          }
        }
        subTitle
        heading
        image {
          childImageSharp {
            fluid(quality: 100) {
              ...GatsbyImageSharpFluid
            }
          }
        }
      }
    }
  }
`