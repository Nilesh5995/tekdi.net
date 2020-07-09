import React from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'gatsby';
import SEO from '../../components/common/site-metadata';
import Layout from '../../components/layout/baselayout';
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
          bannerSubTitle = { frontmatter.subTitle}
          image = { frontmatter.image}
        />
        <div className="container py-5 contact-us">
          <div className="row">
            <div className="col-md-10 col-xs-12 offset-md-1">
              <div className="row">
                <div className="col-md-6 col-xs-12 mt-7 pt-7">
                <br/><br/><br/>
                  <h3 className="font-weight-bold  text-black com-heading mt-7">
                  {frontmatter.tagLine}
                  </h3>
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
        subTitle
        metakeywords
        metadescription
        tagLine
        ogimage {
          childImageSharp {
            fluid {
              ...GatsbyImageSharpFluid
            }
          }
        }
        image {
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
