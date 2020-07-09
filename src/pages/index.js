import React from 'react';
import PropTypes from 'prop-types';
import SEO from '../components/common/site-metadata'
import Layout from '../components/layout/baselayout';
import Slideshow from '../components/slideshow/slideshow';
// import AboutUs from '../components/home-about-us/about-us';
import IndustriesCarousel from '../components/home-industries/industries-carousel';
import SuccessStoriesCarousel from '../components/home-industries/success-stories-carousel';
import DigitalTransformation from '../components/home-digital-evolution/digital-transformation';
// import Blogs from '../components/home-digital-evolution/blog';
import ProductsPlatforms from '../components/home-products-platforms/products-platforms';
import JoinUs from '../components/home-join-us/join-us';
import TeamCulture from '../components/home-team-culture/team-culture';
import Vision from '../components/home-vision/vision';
import Clients from '../components/home-clients/clients';
import ContactUs from '../components/common/contact/contact';

const IndexPage = ({ data }) => {
  const { frontmatter } = data.markdownRemark
  return (
    <Layout>
      <SEO 
        title={frontmatter.title}
        metakeywords= {frontmatter.metakeywords}
        metadescription={frontmatter.metadescription}
        ogimage={frontmatter.ogimage}
      />
      <Slideshow />
      {/* <AboutUs /> */}
      <DigitalTransformation />
      <SuccessStoriesCarousel/>
      <div className="bg">
        <IndustriesCarousel />
        <ProductsPlatforms />
        <div className="com-cover">
          <JoinUs />
          <div className="container">
            <div className="row">
              <TeamCulture/>
              <Vision />
            </div>
          </div>
        </div>
      </div>
      
      {/* <Blogs/> */}
      <Clients />
      <ContactUs />
    </Layout>
  )
}
IndexPage.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.shape({
      frontmatter: PropTypes.object,
    }),
  }),
}

export default IndexPage;

export const pageQuery = graphql`
  query IndexPageTemplate {
    markdownRemark(frontmatter: { templateKey: { eq: "index-page" } }) {
      frontmatter {
        title
        metakeywords
        metadescription
        ogimage {
          childImageSharp {
            fluid {
              ...GatsbyImageSharpFluid
            }
          }
        }
      }
    }
  }
`