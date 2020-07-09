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
    const { caseStudyData: post } = this.props.data
    const bannerData = this.props.data.bannerData
      return (
        <Layout>
          <SEO
            title = {post.frontmatter.title}
            metakeywords = {post.frontmatter.metakeywords}
            metadescription = {post.frontmatter.metadescription}
            ogimage = {post.frontmatter.ogimage}
          />
          <Banner
              bannerTitle = {post.frontmatter.title}
              bannerSubTitle = {bannerData.frontmatter.title }
              image =  {post.frontmatter.bgimage  ? post.frontmatter.bgimage : bannerData.frontmatter.bgimage}
          />
          <CaseStudyInfo
            heading = {post.frontmatter.title}
            content = {post.html}
            contentComponent = {HTMLContent}
          />
           <ContactUs />
        </Layout>
      )
  }
}

export default CaseStudyTemplate;

export const pageQuery = graphql`
  query CaseStudyTemplateByID($id: String!) {
    caseStudyData:markdownRemark(id: { eq: $id }) {
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
      }
    }
    bannerData:markdownRemark(frontmatter: { templateKey: { eq: "index-case-study" }}) {
      frontmatter {
        title
        bgimage {
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
