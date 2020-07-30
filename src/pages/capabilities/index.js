import React from 'react';
import { graphql } from 'gatsby';
import Banner from '../../components/common/banner/banner';
import Layout from '.././../components/layout/baselayout';
import renderList from '../../components/list-view/list-view';
import SEO from '../../components/common/site-metadata';
import ContactUs from '../../components/common/contact/contact';
import { Breadcrumb } from 'gatsby-plugin-breadcrumb';

const CapabilitiesPage  =  ({pageContext, data}) =>  {
  const lists = data.list.edges;
  const bannerData = data.bannerData.frontmatter;
  const {
    breadcrumb: { crumbs },
  } = pageContext
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
        <Breadcrumb
            crumbs={crumbs}
            crumbSeparator=">"
            crumbLabel={bannerData.title}
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

export default CapabilitiesPage;

export const pageQuery = graphql`
  query CapabilitiesPageTemplate {
    list:allMarkdownRemark(filter: {frontmatter: {unlisted: {ne: 1}, templateKey: {eq: "capabilities"}}}, sort: {fields: frontmatter___index}) {
      edges {
        node {
          excerpt(pruneLength: 200)
          id
          html
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
                fluid(maxWidth: 200) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
          }
        }
      }
    }
    bannerData:markdownRemark(frontmatter: { templateKey: { eq: "index-capabilities" }}) {
      html
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
        bgimage {
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