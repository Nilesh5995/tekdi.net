import Layout from '../components/layout/baselayout';
import BlogPagination from '../components/blog/pagination';
import renderList from '../components/blog/blog-list';
import { graphql } from 'gatsby'
import BlogCatList from '../components/blog/blog-cat-list';
import BlogTagList from '../components/blog/blog-tag-list';
import Banner from "../components/common/banner/banner"
import React, { Fragment } from 'react'
import lodash from "lodash"
import SEO from '../components/common/site-metadata';

 class BlogTagPage extends React.Component {
  render() {
    const posts = this.props.data.blogList.edges
    const bannerData  = this.props.data.bannerData.frontmatter
    const { currentPage, numPages, tag} = this.props.pageContext
    return (
      <Layout>
        <div className="blog-page">
        <Banner
            bannerTitle = {bannerData.title}
            bannerSubTitle = {bannerData.subTitle}
            image = {bannerData.image}
          />
          <SEO 
            title = {bannerData.title}
            metakeywords = {bannerData.metakeywords}
            metadescription = {bannerData.metadescription}
            ogimage = {bannerData.ogimage}
          />
        <div className="container py-5">
          <div className="row">
            <Fragment>
                <div className="col-md-9">
                  {
                    posts.map(renderList)
                  }
              <BlogPagination
                currentPage={currentPage}
                numPages={numPages}
                contextPage={"tags/" + lodash.kebabCase(tag)}
               />
          </div>
            </Fragment>
            <div className="col-md-3">
              <BlogCatList />
              <BlogTagList />
            </div>
          </div>
        </div>
        </div>
      </Layout>
    )
  }
}
export default BlogTagPage;

export const blogTagListQuery = graphql`
query BlogListTagQuery($tag: String,$skip: Int!, $limit: Int!) {
  blogList:allMarkdownRemark(
    sort: { order: DESC, fields: [frontmatter___date] }
    filter: {frontmatter: {templateKey: {eq: "blog-post"}, tags: {in: [$tag]}}}
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
      image {
        childImageSharp {
          fluid {
            ...GatsbyImageSharpFluid
          }
        }
      }
    }
  }
}`