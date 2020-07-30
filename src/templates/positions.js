import React, { Fragment } from 'react'
import { graphql} from 'gatsby'
import Layout from '../components/layout/baselayout';
import Banner from '../components/common/banner/banner';
import CareersModal from "../components/careers/careers-modal"
import Content, { HTMLContent } from '../components/common/content';
import '../pages/careers/careers.scss';
import SEO from '../components/common/site-metadata';
import { Breadcrumb } from 'gatsby-plugin-breadcrumb';
export const PositionDetails = ({
  content,
  contentComponent
}) => {
  const PostContent = contentComponent || Content

  return (
    <PostContent content={content} />
  )
}
const PositionPage  =  ({pageContext, data}) =>  {
    const position = data.positionData.frontmatter
    const bannerData = data.bannerData.frontmatter
    const {
      breadcrumb: { crumbs },
    } = pageContext;
    return (
      <Layout>
        <Banner
            bannerTitle= {position.title}
            bannerSubTitle = {bannerData.title}
            image = {bannerData.image}
          />
          <SEO
            title = {position.title}
            metakeywords = {position.metakeywords}
            metadescription = {position.metadescription}
            ogimage = {position.ogimage}
          />
          <Breadcrumb
            crumbs={crumbs}
            crumbSeparator=">"
            crumbLabel={position.title}
          />
    <Fragment>
    <div className="container py-5">
          <div className="col-md-12">
          <div className="main-content single-position">
          <h3 className="text-black post-title mb-3">
             {position.title}
          </h3>
          <ul className="unstyled mb-4 list">
            <li className="mr-4">Type - <span className="text-black">{position.type}</span></li>
            <li className="mr-4">Location - <span className="text-black">{position.location}</span></li>
            {/* <li className="mr-4">Posts <span className="text-black">{position.vacancy}</span></li> */}
          </ul>
          <div className="main-content">
            <PositionDetails
              content = {data.positionData.html}
              contentComponent = {HTMLContent}
            />
          </div>
         {position.jobPortalLink ?
            <div className="mb-4 p-0"> <a className="btn-apply font-weight-bold" target="_blank" href={position.jobPortalLink }> Apply Now</a> </div>:   <CareersModal position = {position.title} />}
          </div>
          </div>
       </div>
    </Fragment>
  </Layout>
    )
  }
export default  PositionPage;

export const pageQuery = graphql`
      query CurrentOpeningslistQuery($id: String!) {
        positionData:markdownRemark(id: { eq: $id }) {
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
            metakeywords
            jobPortalLink
            metadescription
            ogimage {
              childImageSharp {
                fluid {
                  ...GatsbyImageSharpFluid
                }
              }
            }
          }
        }
        bannerData:markdownRemark(frontmatter: { templateKey: { eq: "index-careers" }}) {
          frontmatter {
            title
            image {
              childImageSharp {
                fluid {
                  ...GatsbyImageSharpFluid
                }
              }
            }
          }
        }
      }
    `
