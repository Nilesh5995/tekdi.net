import React from 'react';
import SEO from '../../components/common/site-metadata';
import Layout from '../../components/layout/baselayout';
import Banner from '../../components/common/banner/banner';
import ContactUs from '../../components/common/contact/contact';
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
            image = {frontmatter.bgimage}
          />
          <div className="container py-5">
            <div className="col-lg-8 col-md-12 offset-lg-2 offset-md-1 col-xs-12">
              <h3 className="com-heading text-black text-center mb-5">{frontmatter.heading}</h3>
              <div className="container pb-5">{frontmatter.description}</div>

              {posts &&
              posts.map(({ node: post }) => (
                <div className="opening-list" key={post.id}>
                  <div className="row">
                    <div className="col-md-12 col-sm-12 col-xs-12 careers-box">
                      <h3 className="text-black post-title mb-3">
                      <Link className="" to={post.alias}> {post.title}</Link>
                      </h3>
                      <ul className="unstyled mb-3">
                        <li className="sub-title">
                        </li>
                        {post.custom_fields.map( (fields) => (
                             fields.value && fields.title === 'Type' || fields.title === 'Location' ||  fields.title === 'Experience' ||  fields.title === 'Qualification' ? <li className="mr-4">{fields.title} - <span className="text-black">{fields.value}</span></li> : null
                          ))}
                      </ul>
                      <div className="main-content mb-3">
                      <div dangerouslySetInnerHTML={{ __html: post.introtext }} />
                      </div>
                      <div className="row">
                      <div className="col-md-6 col-sm-12 col-xs-12 ">
                      <CareersModal position = {post.alias} />
                      </div>
                      <div className="col-md-6 col-sm-12 col-xs-12 ">
                      <Link className="open-position" to={post.title}>
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
          <ContactUs />
      </div>
  </Layout>
)}

export default CareersIndexPage;

export const pageQuery = graphql`
  query CareersBanner {
    openingList:allJoomlaArticle (filter: {category: {alias: {eq: "careers"}}}){
      edges {
        node {
          id
          title
          state
          fulltext
          access
          alias
          introtext
          language
          images {
            float_fulltext
            float_intro
            image_fulltext
            image_fulltext_alt
            image_fulltext_caption
            image_intro
          }
          category {
            access
            alias
            asset_id
            title
            slug
            published
            description
            extension
          }
          categoryImage {
            childImageSharp {
                fluid {
                  ...GatsbyImageSharpFluid
                }
              }
          }
          custom_fields {
            access
            author_name
            access_level
            checked_out
            checked_out_time
            context
            created_time
            created_user_id
            default_value
            description
            group_id
            id
            label
            language
            name
            note
            ordering
            rawvalue
            required
            state
            title
            type
            value
          }
          tags {
            itemTags {
              access
              alias
              description
              urls
              title
            }
          }
          imageIntro {
            childImageSharp {
              fluid {
                ...GatsbyImageSharpFluid
              }
            }
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
            fluid {
              ...GatsbyImageSharpFluid
            }
          }
        }
        subTitle
        description
        heading
        bgimage {
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