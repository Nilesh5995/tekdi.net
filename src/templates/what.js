import React from 'react';
import { graphql } from 'gatsby';
import Banner from '../components/common/banner/banner';
import Layout from '../components/layout/baselayout';
import SEO from '../components/common/site-metadata';
import ContactUs from '../components/common/contact/contact';
import Content, { HTMLContent } from '../components/common/content';

export const HtmlContents = ({
  content,
  contentComponent
}) => {
  const PostContent = contentComponent || Content
  return (
    <PostContent content={content} />
  )
}

const WhatTemplate  =  ({data}) =>  {
  const pageData = data.pageData;
  const bannerData = data.bannerData.frontmatter
    return (
      <Layout>
        <Banner
            bannerTitle= {pageData.frontmatter.title}
            bannerSubTitle = {pageData.frontmatter.subTitle}
          />
        <SEO 
          title={bannerData.title}
          metakeywords= {bannerData.metakeywords}
          metadescription={bannerData.metadescription}
          ogimage={bannerData.ogimage}
        />
        <div className="container py-5">
          <div className="col-md-12">
          <div className="main-content">
            <HtmlContents
              content = {pageData.html}
              contentComponent = {HTMLContent}
            />
            </div>
          </div>
       </div>
       <ContactUs pageName = {pageData.frontmatter.title} />
      </Layout>
    )
  }

export default WhatTemplate;

export const pageQuery = graphql`
  query WhatTemplate($id: String!) {
    pageData:markdownRemark(id: { eq: $id }) {
      html
          frontmatter {
            title
            templateKey
            subTitle
            description
            index
            image  {
              childImageSharp {
                fluid(maxWidth: 100, quality: 100) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
          }
        }

    bannerData:markdownRemark(frontmatter: { templateKey: { eq: "index-what" }}) {
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
        description
      }
    }
  }
`