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
            {console.log(pageData.custom_fields)}
          {pageData.custom_fields.map( (fields) => (
              //  url = fields.value && fields.name ==='uri'  ? fields.value : null
              fields.value && fields.title ==='html-contents' ? <div dangerouslySetInnerHTML={{ __html: fields.value }} /> : null
          ))}
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
          custom_fields{
            title
            value
          }
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