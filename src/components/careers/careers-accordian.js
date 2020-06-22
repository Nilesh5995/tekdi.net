import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import { graphql, StaticQuery } from 'gatsby'
import './careers.scss';
import Collapsible from 'react-collapsible';
import CareersModal from "./careers-modal"
import Content, { HTMLContent } from '../common/content';

export const PositionDetails = ({
  content,
  contentComponent
}) => {
  const PostContent = contentComponent || Content

  return (
    <PostContent content={content} />
  )
}
class Openingslist extends React.Component {
  render() {
    const { data } = this.props
    const { edges: posts } = data.allMarkdownRemark

    return (
    <Fragment>
      {posts &&
      posts.map(({ node: post }) => (
        <Collapsible trigger={`${post.frontmatter.heading}`} key={post.id}>
          <ul className="unstyled mb-4 list">
            <li className="mr-4">Type <span className="text-black">{post.frontmatter.type}</span></li>
            <li className="mr-4">Location <span className="text-black">{post.frontmatter.location}</span></li>
            <li className="mr-4">Posts <span className="text-black">{post.frontmatter.vacancy}</span></li>
          </ul>
          <div className="main-content">
            <PositionDetails
              content = {post.html}
              contentComponent = {HTMLContent}
            />
          </div>
          <CareersModal position = {post.frontmatter.heading} />
        </Collapsible>
      ))}
    </Fragment>
    )
  }
}

Openingslist.propTypes = {
  data: PropTypes.shape({
    allMarkdownRemark: PropTypes.shape({
      edges: PropTypes.array,
    }),
  }),
}

export default () => (
  <StaticQuery
    query={graphql`
      query OpeningslistQuery {
        allMarkdownRemark(
          filter: { frontmatter: { templateKey: { eq: "positions" } } }
        ) {
          edges {
            node {
              html
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
      }
    `}
    render={(data, count) => <Openingslist data={data} count={count} />}
  />
)
