import React from 'react';
import { graphql } from 'gatsby';
import Banner from '../components/common/banner/banner';
import Layout from '../components/layout/baselayout';
import SEO from '../components/common/site-metadata';
import ContactUs from '../components/common/contact/contact';

const JoomlaPageTemplate  =  ({data}) =>  {
  const pageData = data.pageData;
  const bannerData = data.bannerData.frontmatter
    return (
      <Layout>
        <Banner
            bannerTitle = {"joomla pages"}
            bannerSubTitle = {bannerData.title}
            image = {bannerData.bgimage }
          />
        {/* <SEO 
          title = {"joomla pages"}
          metakeywords = {"ABCD", "ABCD"}
          metadescription = {pageData.frontmatter.metadescription}
          ogimage = {pageData.frontmatter.ogimage}
        /> */}
        <div className="container py-5">
          <div className="col-md-12">
          <div className="main-content">
          <div dangerouslySetInnerHTML={{ __html: pageData.introtext }} />
            </div>
          </div>
       </div>
        <ContactUs/>
      </Layout>
    )
  }

export default JoomlaPageTemplate;

export const pageQuery = graphql`
  query JoomlaPageTemplate($id: String!) {
    pageData:joomlaArticle(id: { eq: $id }) {
      introtext
        }

    bannerData:markdownRemark(frontmatter: { templateKey: { eq: "index-experience" }}) {
      frontmatter {
        title
        image {
          childImageSharp {
            fluid {
              ...GatsbyImageSharpFluid
            }
          }
        }
        subTitle
        description
      }
    }
  }
`