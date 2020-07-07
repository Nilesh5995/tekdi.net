import React from 'react';
import SEO from '../../components/common/site-metadata';
import Layout from '../../components/layout/baselayout';
import Banner from '../../components/common/banner/banner';
// import ContactUs from '../../components/common/contact/contact';
import CareersModal from "../../components/careers/careers-modal"
import { graphql, Link} from 'gatsby'
import './careers.scss';

const CareersIndexPage =  ({data}) => {
    const { frontmatter } = data.bannerData
    const { edges: posts } = data.openingList
    return (
      <Layout>
        <SEO 
          title={frontmatter.title}
          metakeywords= {frontmatter.metakeywords}
          metadescription={frontmatter.metadescription}
          ogimage={frontmatter.ogimage}
        />
        <div className="careers-page">
          <Banner
            bannerTitle= {frontmatter.title}
            bannerSubTitle = {frontmatter.subTitle}
            image = {frontmatter.image}
          />
          <div className="container py-5">
            <div className="col-lg-8 col-md-12 offset-lg-2 offset-md-1 col-xs-12">
              <h3 className="com-heading text-black text-center mb-5">{frontmatter.heading}</h3>
              {posts &&
              posts.map(({ node: post }) => (
                <div className="opening-list" key={post.id}>
                  <div className="row">
                    <div className="col-md-12 col-sm-12 col-xs-12 careers-box">
                      <h3 className="text-black post-title mb-3">
                      <Link className="" to={post.fields.slug}> {post.frontmatter.heading}</Link>
                      </h3>
                      <ul className="unstyled mb-3">
                        <li className="sub-title">
                          {post.frontmatter.subTitle}
                        </li>
                        <li className="mr-4">Type - <span className="text-black">{post.frontmatter.type}</span></li>
                        <li className="mr-4">Location - <span className="text-black">{post.frontmatter.location}</span></li>
                        {/* <li className="mr-4">Posts <span className="text-black">{post.frontmatter.vacancy}</span></li> */}
                      </ul>
                      <div className="main-content mb-3">
                      {post.excerpt}
                      </div>
                      <div className="row">
                      <div className="col-md-6 col-sm-12 col-xs-12 ">
                      <CareersModal position = {post.frontmatter.heading} />
                      </div>
                      <div className="col-md-6 col-sm-12 col-xs-12 ">
                      <Link className="open-position" to={post.fields.slug}>
                      Know More
                        </Link>
                      </div>
                    </div>
                    </div>
                  </div>
                  <hr />
                </div>
              ))}
            </div>
          </div>
          {/* <ContactUs /> */}
      </div>
  </Layout>
)}

export default CareersIndexPage;

export const pageQuery = graphql`
  query CareersBanner {
    openingList:allMarkdownRemark(
      filter: { frontmatter: { templateKey: { eq: "positions" } } }
    ) {
      edges {
        node {
          html
          excerpt(pruneLength: 200)
          id
          fields {
            slug
          }
          frontmatter {
            title
            heading
            type
            location
            vacancy
          }
        }
      }
    }
  bannerData:markdownRemark(frontmatter: { templateKey: { eq: "index-careers" }}) {
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
        heading
        image {
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