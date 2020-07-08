import React from 'react';
import { graphql } from 'gatsby';
import Banner from '../../components/common/banner/banner';
import Layout from '.././../components/layout/baselayout';
import renderList from '../../components/list-view/list-view';
import SEO from '../../components/common/site-metadata';
import ContactUs from '../../components/common/contact/contact';

const IndustriesPage  =  ({data}) =>  {
  const lists = data.list.edges;
  console.log(lists)
  const bannerData = data.bannerData.frontmatter
    return (
      <Layout>
        <Banner
            bannerTitle = {bannerData.title}
            bannerSubTitle = {bannerData.subTitle}
            image = {bannerData.bgimage}
          />
        <SEO
          title = {bannerData.title}
          metakeywords = {bannerData.metakeywords}
          metadescription = {bannerData.metadescription}
          ogimage = {bannerData.ogimage}
        />
       {data.bannerData.html && data.bannerData.html !== "" ?
        <div className="container py-5">
          <div className="col-md-12">
            <div dangerouslySetInnerHTML={{ __html: data.bannerData.html }} />
          </div>
        </div>
         : null}
        <div className="container py-5">
          <div className="col-md-12">
            {lists.map(renderList)}
          </div>
        </div>
        <ContactUs/>
      </Layout>
    )
  }

export default IndustriesPage;

export const pageQuery = graphql`
  query IndustriesPageTemplate {
    list:allMarkdownRemark(filter: { frontmatter: { templateKey: { eq: "industries" } } }, sort: {fields: frontmatter___index}) {
      edges {
        node {
          excerpt(pruneLength: 200)
          html
          id
          fields {
            slug
          }
          frontmatter {
            title
            templateKey
            subTitle
            description
            index
            image  {
              childImageSharp {
                fluid(maxWidth: 200, quality: 100) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
          }
        }
      }
    }
    bannerData:markdownRemark(frontmatter: { templateKey: { eq: "index-industries" }}) {
      html
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
        bgimage {
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