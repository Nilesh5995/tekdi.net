

import Layout from '../components/layout/baselayout';
//import Helmet from 'react-helmet';
import SEO from '../components/common/site-metadata';
import BlogPagination from '../components/blog/pagination';
import renderList from '../components/blog/blog-list';
import { graphql } from 'gatsby'
import BlogCatList from '../components/blog/blog-cat-list';
import BlogTagList from '../components/blog/blog-tag-list';
import Banner from "../components/common/banner/banner"
import ContactUs from '../components/common/contact/contact';
import React, { Fragment } from 'react'

 class BlogIndexPage extends React.Component {
  render() {
    const { data } = this.props
    const posts = this.props.data.blogList.edges;
    const bannerData  = data.bannerData.frontmatter
    const { currentPage, numPages } = this.props.pageContext

    return (
      <Layout>
        <SEO 
          title = "Blogs"
        />
        <div className="blog-page">
          <Banner 
            bannerTitle = {bannerData.title}
            bannerSubTitle = {bannerData.subTitle}
            image = {bannerData.bgimage}
          /> 
          <div className="container py-5">
            <div className="row">
                <Fragment>
                  <div className="col-md-9">
                    {posts.map(renderList)}
                    <BlogPagination currentPage={currentPage} numPages={numPages} />
                  </div> 
                </Fragment>
              <div className="col-md-3">
                <BlogCatList />
                <BlogTagList />
              </div>
            </div>
          </div>
          <ContactUs />
        </div>
      </Layout>
    )
  }
}
export default BlogIndexPage;
export const blogListQuery = graphql`
query BlogListQuery($skip: Int!, $limit: Int!) {
  blogList:allMarkdownRemark(
    sort: { order: DESC, fields: [frontmatter___date] }
    filter: { frontmatter: { templateKey: { eq: "blog-post" } } }
    limit: $limit
    skip: $skip
  ) {
    edges {
      node {
        excerpt(pruneLength: 200)
        id
        fields {
          slug
        }
        frontmatter {
          title
          templateKey
          date(formatString: "DD MMMM YYYY")
          author
          category
          featuredpost
          featuredimage {
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
  bannerData:markdownRemark(frontmatter: { templateKey: { eq: "index-blog" }}) {
    frontmatter {
      title
      metakeywords
      metadescription
      subTitle
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
}`