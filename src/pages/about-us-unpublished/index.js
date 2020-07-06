import React from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'gatsby';
import SEO from '../../components/common/site-metadata'
import Content, { HTMLContent } from '../../components/common/content';
import Banner from '../../components/common/banner/banner';
import Layout from '../../components/layout/baselayout';

export const AboutUsTemplate = ({
  content,
  contentComponent,
  title,
  subheading
}) => {
  const PostContent = contentComponent || Content

  return (
    <section className="section">
      <div className="">
        <h1 className="title text-black">
          {title}
        </h1>
        <p>{subheading}</p>
        <PostContent content={content} />
      </div>
    </section>
  )
}


const AboutUsPage = ({ data }) => {
  const { markdownRemark: post } = data

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
      />
      <div className="container py-5">
        <div className="row">
          <div className="col-md-12">
          <AboutUsTemplate
              title={post.frontmatter.title}
              subheading={post.frontmatter.subheading}
              content={post.html}
              contentComponent={HTMLContent}
          />
          </div>
        </div>
      </div>
    </Layout>
  )
}

AboutUsTemplate.propTypes = {
  content: PropTypes.node.isRequired,
  contentComponent: PropTypes.func,
  title: PropTypes.string,
  subheading: PropTypes.string,
}

export default AboutUsPage;

export const pageQuery = graphql`
  query AboutUsPageTemplate {
    markdownRemark(frontmatter: { templateKey: { eq: "aboutus-page" } }) {
      id
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
        subheading
      }
    }
  }
`

