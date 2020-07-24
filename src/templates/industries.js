import React from 'react';
import { graphql } from 'gatsby';
import Banner from '../components/common/banner/banner';
import Layout from '../components/layout/baselayout';
import SEO from '../components/common/site-metadata';
import ContactUs from '../components/common/contact/contact';
import Content, { HTMLContent } from '../components/common/content';

export const HtmlContent = ({
  content,
  contentComponent
}) => {
  const PostContent = contentComponent || Content
  return (
    <PostContent content={content} />
  )
}

const IndustriesTemplate  =  ({data}) =>  {
  const pageData = data.pageData;
  const bannerData = data.bannerData.frontmatter
    return (
      <Layout>
        <Banner
            bannerTitle = {pageData.frontmatter.title}
            bannerSubTitle = {bannerData.title}
            image = {pageData.frontmatter.bgimage  ? pageData.frontmatter.bgimage : bannerData.bgimage }
          />
        <SEO 
          title = {pageData.frontmatter.title}
          metakeywords = {pageData.frontmatter.metakeywords}
          metadescription = {pageData.frontmatter.metadescription}
          ogimage = {pageData.frontmatter.ogimage}
        />
        <div className="container py-5">
          <div className="col-md-12">
          <div className="main-content">
            <HtmlContent
              content = {pageData.html}
              contentComponent = {HTMLContent}
            />
            </div>
          </div>
       </div>
        <ContactUs/>
      </Layout>
    )
  }

export default IndustriesTemplate;

export const pageQuery = graphql`
  query IndustriesTemplate($id: String!) {
    pageData:markdownRemark(id: { eq: $id }) {
      html
          frontmatter {
            title
            templateKey
            subTitle
            description
            index
            metakeywords
            metadescription
            ogimage {
              childImageSharp {
                fluid {
                  ...GatsbyImageSharpFluid
                }
              }
            }
            image  {
              childImageSharp {
                fluid(maxWidth: 100) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
            bgimage {
              childImageSharp {
                fluid {
                  ...GatsbyImageSharpFluid
                }
              }
            }
          }
        }

    bannerData:markdownRemark(frontmatter: { templateKey: { eq: "index-industries" }}) {
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