import React from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'gatsby';
import SEO from '../../components/common/site-metadata';
import Layout from '../../components/layout/baselayout';
import Map from '../../components/contact/map';
import ContactUs from '../../components/contact/contact';
import Banner from '../../components/common/banner/banner';


const ContactPage = ({ data }) => {
  const { frontmatter } = data.markdownRemark
  return (
    <Layout>
      <SEO 
          title={frontmatter.title}
          metakeywords= {frontmatter.metakeywords}
          metadescription={frontmatter.metadescription}
          ogimage={frontmatter.ogimage}
        />
      <div className="contact-page">
        <Banner 
          bannerTitle= {frontmatter.title} 
          bannerSubTitle = { frontmatter.bannerSubTitle}
          image = { frontmatter.image}
        />
        <div className="container py-5 contact-us">
          <div className="mb-5 row">
            <div className="col-md-10 col-xs-12 offset-md-1">
              <Map></Map>
            </div>
          </div>
          <div className="row">
            <div className="col-md-10 col-xs-12 offset-md-1">
              <div className="row">
                <div className="col-md-6 col-xs-12">
                  <h3 className="font-weight-bold  text-black com-heading">
                    {frontmatter.title}
                  </h3>
                  <div className="row mb-3">
                    <div className="col-lg-6 col-md-12 col-sm-8 col-xs-12">
                      <h5 className="font-weight-bold text-black">
                        {frontmatter.address_title}
                      </h5>
                      <p>
                        {frontmatter.address} 
                      </p> 
                    </div>
                  </div>
                  {/* <div className="row mb-3">
                    <div className="col-lg-6 col-md-12 col-sm-8 col-xs-12">
                      <h5 className="font-weight-bold text-black">
                        {frontmatter.email_title}
                      </h5>
                      <p>
                        {frontmatter.email_address} 
                      </p> 
                    </div>
                  </div>  */}
                </div>  
                <div className="col-md-6 col-xs-12 ">
                  <h3 className="font-weight-bold  text-black com-heading">
                    Write us a line
                  </h3>
                  <ContactUs></ContactUs>
                </div>  
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}


ContactPage.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.shape({
      frontmatter: PropTypes.object,
    }),
  }),
}

export default ContactPage;

export const pageQuery = graphql`
  query ContactPageTemplate {
    markdownRemark(frontmatter: { templateKey: { eq: "contact-page" } }) {
      frontmatter {
        title
        bannerSubTitle
        metakeywords
        metadescription
        ogimage {
          childImageSharp {
            fluid(quality: 100) {
              ...GatsbyImageSharpFluid
            }
          }
        }
        image {
          childImageSharp {
            fluid(quality: 100) {
              ...GatsbyImageSharpFluid
            }
          }
        }
        address 
        address_title
        email_title
        email_address
      }
    }
  }
`
