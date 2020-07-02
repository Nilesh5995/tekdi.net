import React from 'react';
import { graphql} from 'gatsby';
import SEO from '../components/common/site-metadata';
import Layout from '../components/layout/baselayout';
import Banner from "../components/common/banner/banner";
import CaseStudyInfo from '../components/common/case-studies/case-study-info';
import { HTMLContent } from '../components/common/content';
import ContactUs from '../components/common/contact/contact';
class CaseStudyTemplate extends React.Component {

    render()
    {
    const { markdownRemark: post } = this.props.data
      return (
        <Layout>
          <SEO
            title={post.frontmatter.title}
            metakeywords= {post.frontmatter.metakeywords}
            metadescription={post.frontmatter.metadescription}
            ogimage={post.frontmatter.ogimage}
          />
          <Banner
              bannerTitle= {post.frontmatter.title}
              bannerSubTitle = {post.frontmatter.bannerSubTitle}
          />
          <CaseStudyInfo
            heading = {post.frontmatter.title}
            content={post.html}
            contentComponent={HTMLContent}
          />
          <ContactUs pageName = {post.frontmatter.title} />
        </Layout>
      )
  }
}

export default CaseStudyTemplate;

export const pageQuery = graphql`
  query CaseStudyTemplateByID($id: String!) {
    markdownRemark(id: { eq: $id }) {
      id
      excerpt(pruneLength: 200)
      fields {
        slug
      }
      html
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
      }
    }
  }
`
