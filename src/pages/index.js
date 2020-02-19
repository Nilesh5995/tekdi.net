import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import SEO from '../components/common/site-metadata'
import Layout from '../components/layout/baselayout';
import Slideshow from '../components/slideshow/slideshow';
import AboutUs from '../components/home-about-us/about-us';
import Industries from '../components/home-industries/industries';
import DigitalEvolution from '../components/home-digital-evolution/digital-evolution';
import ProductsPlatforms from '../components/home-products-platforms/products-platforms';
import JoinUs from '../components/home-join-us/join-us';
import TeamCulture from '../components/home-team-culture/team-culture';
import Vision from '../components/home-vision/vision';
import TestimonialCarousel from '../components/home-testimonial-carousel/testimonial-carousel';
import Clients from '../components/home-clients/clients';
import ContactUs from '../components/common/contact/contact';

const IndexPage = ({ data }) => {
  const { frontmatter } = data.markdownRemark
  return (
    <Layout>
      <SEO 
        title={frontmatter.title}
        description={frontmatter.description}
      />
       {/* <Helmet>
          <meta
            name="description"
            content={`${frontmatter.description}`}
          />
      </Helmet> */}
      <Slideshow />
      <AboutUs />
      <DigitalEvolution />
      <div className="bg">
        <Industries />
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
      <TestimonialCarousel />
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
        description
      }
    }
  }
`