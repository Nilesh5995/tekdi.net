import React from 'react';
import PropTypes from 'prop-types';
import { kebabCase } from 'lodash';
import { graphql, Link } from 'gatsby';
import SEO from '../components/common/site-metadata';
import Layout from '../components/layout/baselayout';
import Banner from '../components/common/banner/banner';
import Content, { HTMLContent } from '../components/common/content';
import BlogCatList from '../components/blog/blog-cat-list';
import ContactUs from '../components/common/contact/contact';
import './blog.scss';
// import PreviewCompatibleImage from '../components/PreviewCompatibleImage'

export const BlogPostTemplate = ({
  content,
  contentComponent,
  description,
  tags,
  title,
  image,
  author,
  date,
  category,
  catslug
}) => {
  const PostContent = contentComponent || Content

  return (
    <section className="section">
      <div className="container">
        <div className="blog-detail">
          <div className="">
            <h1 className="title text-black">
              {title}
            </h1>
            <ul className="unstyled mb-4 info">
              <li className="blog-author mr-4">
                By <span className="author-name text-black">{author}</span>
              </li>
              <li className="blog-date mr-4">
                On <span className="text-black">{date}</span>
              </li>
              <li className="blog-category">
                In <Link to={catslug}>{category}</Link>
              </li>
            </ul>
            <p>{description}</p>
            <PostContent content={content} />
            {tags && tags.length ? (
              <div style={{ marginTop: `20px` }}>
                <h4>Tags</h4>
                <ul className="taglist">
                  {tags.map(tag => (
                    <li key={tag + `tag`}>
                      <Link to={`/blog/tags/${kebabCase(tag)}/`}>{tag}</Link>
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  )
}

BlogPostTemplate.propTypes = {
  content: PropTypes.node.isRequired,
  contentComponent: PropTypes.func,
  description: PropTypes.string,
  title: PropTypes.string,
  // helmet: PropTypes.object,
}

const BlogPost = ({ data }) => {
  const { postData : post } = data
  const bannerData  = data.bannerData.frontmatter

  return (
    
    <Layout>
      <SEO 
         title = {post.frontmatter.title}
         metakeywords = {post.frontmatter.metakeywords}
         metadescription = {post.frontmatter.metadescription}
         ogimage = {post.frontmatter.ogimage}
      />
      <div className="blog-page">
      <Banner 
            bannerTitle = {bannerData.title}
            bannerSubTitle = {bannerData.subTitle}
            image = {post.frontmatter.bgimage  ? post.frontmatter.bgimage : bannerData.bgimage}
          /> 
       <div className="container py-5">
        <div className="row">
          <div className="col-md-9">
            <BlogPostTemplate
              content={post.html}
              contentComponent={HTMLContent}
              description={post.frontmatter.description}
              tags={post.frontmatter.tags}
              title={post.frontmatter.title}
              image={post.frontmatter.featuredimage}
              author={post.frontmatter.author}
              category={post.frontmatter.category.join()}
              date={post.frontmatter.date}
              catslug={post.fields.slug}
            />
          </div>
            <div className="col-md-3">
              <BlogCatList />
            </div>
        </div>
       </div>
       <ContactUs />
       </div>
    </Layout>
  )
}

BlogPost.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.object,
  }),
}

export default BlogPost

export const pageQuery = graphql`
  query BlogPostByID($id: String!) {
    postData:markdownRemark(id: { eq: $id }) {
      id
      excerpt(pruneLength: 200)
      html
      fields {
        slug
      }
      frontmatter {
        date(formatString: "DD MMMM YYYY")
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
        bgimage {
          childImageSharp {
            fluid(quality: 100) {
              ...GatsbyImageSharpFluid
            }
          }
        }
        author
        category
        description
        tags
        featuredimage {
          childImageSharp {
            fluid(maxWidth: 120, quality: 100) {
              ...GatsbyImageSharpFluid
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
            fluid(quality: 100) {
              ...GatsbyImageSharpFluid
            }
          }
        }
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
