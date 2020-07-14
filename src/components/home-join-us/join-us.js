import React from 'react';
import PropTypes from 'prop-types';
import { Link, graphql, StaticQuery } from 'gatsby';
import PreviewCompatibleImage from '../common/preview-compatible-image';
import './join-us.scss';

class JoinUs extends React.Component {
    
  render(){
      const { data } = this.props
      const { edges: posts } = data.allMarkdownRemark

      return (
      <div className="container join-us"> 
          {posts &&
              posts.map(({ node: post }) => (
              <div className="row" key={post.id}>
                <div className="col-md-6 col-xs-12 joinus-img">
                  <PreviewCompatibleImage
                    imageInfo={{
                      image: post.frontmatter.img,
                      alt: `icon for ${post.frontmatter.heading}`,
                    }}
                  />
                </div>
        
                <div className="col-md-6 col-xs-12 joinus-info-cover text-white">
                  <div className="joinus-info">
                    <h3 className="com-heading">{post.frontmatter.heading}</h3>
                    <p className="font-weight-normal mb-3">{post.frontmatter.subheading}</p>
                    <p>
                      <Link to={'/careers'} className="font-weight-normal">     {post.frontmatter.linktext}
                      </Link>
                    </p>
                  </div>
                </div>
              </div>
          ))}
      </div> 
      )
  }
}


JoinUs.propTypes = {
  data: PropTypes.shape({
    allMarkdownRemark: PropTypes.shape({
      edges: PropTypes.array,
    }),
  }),
}


export default () => (
  <StaticQuery
    query={graphql`
      query JoinUsQuery {
        allMarkdownRemark(
          filter: { frontmatter: { templateKey: { eq: "home-join-us" } } }
        ) {
          edges {
            node {
              id
              frontmatter {
                heading
                subheading
                linktext
                img {
                  childImageSharp {
                    fluid {
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
    render={(data, count) => <JoinUs data={data} count={count} />}
  />
)
