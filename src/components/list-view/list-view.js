import React from "react"
import { Link } from 'gatsby';
import PreviewCompatibleImage from '../common/preview-compatible-image'
import './list-view.scss';
const renderList = ({ node }) => {
  return (
     <div className="blog-list mb-5 pb-5" key={node.id}>
       <div className="row">
        <div className="col-md-3 col-sm-4 col-xs-12">
          {node.frontmatter.image ? (
            <div className="featured-thumbnail">
              <PreviewCompatibleImage
                imageInfo={{
                  image: node.frontmatter.image,
                  alt: `featured image thumbnail for post ${node.frontmatter.title}`,
                }}
              />
            </div>
          ) : null}
          </div>
          <div className="col-md-9 col-sm-8 col-xs-12 blog-info">
            <h3 className="blog-title">
                {node.frontmatter.title}
            </h3>
            <ul className="unstyled mb-4">
              {node.frontmatter.subTitle && node.frontmatter.subTitle !=null ?
              <li className="sub-title">
               {node.frontmatter.subTitle}
              </li>
              : null}
            </ul>
            <p>
               {node.frontmatter.description}
              {node.html && node.html !== "" ? <span><br/><br/><Link class="read-more" to={node.fields.slug}>{"Keep Reading"}</Link></span> : null}
            </p>
          </div>
        </div>
    </div>
)}

export default renderList