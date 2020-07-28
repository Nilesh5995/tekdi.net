import React from "react"
import { Link } from 'gatsby';
import PreviewCompatibleImage from '../common/preview-compatible-image'
import './list-view.scss';
const renderList = ({ node }) => {
  let divId = node.title;
  divId = divId.replace(/^\s+|\s+$/g, ""); // trim
  divId = divId.toLowerCase();
  divId = divId
    .replace(/[^a-z0-9 -]/g, "") // remove invalid chars
    .replace(/\s+/g, "-") // collapse whitespace and replace by -
    .replace(/-+/g, "-") // collapse dashes
    .replace(/^-+/, "") // trim - from start of text
    .replace(/-+$/, ""); // trim - from end of text
  return (
     <div className="blog-list mb-5 pb-5" key={node.id} id={divId}>
       <div className="row">
        <div className="col-md-3 col-sm-4 col-xs-12">
          {node.imageIntro ? (
            <div className="featured-thumbnail">
              <PreviewCompatibleImage
                imageInfo={{
                  image: node.imageIntro,
                  alt: `featured image thumbnail for post ${node.title}`,
                }}
              />
            </div>
          ) : null}
          </div>
          <div className="col-md-9 col-sm-8 col-xs-12 blog-info">
            <h3 className="blog-title">
                {node.title}
            </h3>
            {/* <ul className="unstyled mb-4">
              {node.frontmatter.subTitle && node.frontmatter.subTitle !=null ?
              <li className="sub-title">
               {node.frontmatter.subTitle}
              </li>
              : null}
            </ul> */}
            <p>
               {/* {node.frontmatter.description} */}
               <div dangerouslySetInnerHTML={{ __html: node.introtext }} />
               {node.custom_fields.map( (fields) => (
                  //url = fields.value && fields.name ==='html-contents'  ? fields.value : null
                  fields.value && fields.title === 'uri' ? <span><Link class="read-more" to={fields.value}>{"Keep Reading"}</Link></span> : null
                ))}
            </p>
          </div>
        </div>
    </div>
)}

export default renderList