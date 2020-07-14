import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { graphql, StaticQuery } from 'gatsby';
import PreviewCompatibleImage from '../common/preview-compatible-image';
import './vision.scss';

class Vision extends React.Component {

  render(){
      const { data } = this.props
      const { edges: posts } = data.allMarkdownRemark

      return (
      <Fragment> 
        {posts &&
            posts.map(({ node: post }) => (
            <div className="col-md-6 col-xs-12 text-white vision-cover" key={post.id}>
              <div className="vision">
                <div className="row">
                  <div className="col-lg-7 col-xs-12">
                    <h3 className="com-heading">{post.frontmatter.heading}</h3>
                    <p className="font-weight-normal">{post.frontmatter.subheading}</p>
                    {/* <Link to={post.fields.slug} >Read More </Link> */}
                  </div>
                  <div className="col-lg-5 col-xs-12">
                    <PreviewCompatibleImage
                      imageInfo={{
                        image: post.frontmatter.img,
                        alt: `icon for ${post.frontmatter.title}`,
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
        ))}
      </Fragment> 
    )
  }
}

Vision.propTypes = {
data: PropTypes.shape({
  allMarkdownRemark: PropTypes.shape({
    edges: PropTypes.array,
  }),
}),
}

export default () => (
  <StaticQuery
    query={graphql`
      query VisionQuery {
        allMarkdownRemark(
          filter: { frontmatter: { templateKey: { eq: "vision-page" } } }
        ) {
          edges {
            node {
              excerpt(pruneLength: 120)
              id
              fields {
                slug
              }
              frontmatter {
                heading
                subheading
                img {
                  childImageSharp {
                    fluid(maxWidth: 130) {
                      ...GatsbyImageSharpFluid
                    }
                  }
                }
              }
            }
          }
        }
      }
    `}
    render={(data, count) => <Vision data={data} count={count} />}
  />
)
