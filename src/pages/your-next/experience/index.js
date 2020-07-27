import React from 'react';
import { graphql } from 'gatsby';
import Banner from '../../../components/common/banner/banner';
import Layout from '../.././../components/layout/baselayout';
import renderList from '../../../components/list-view-joomla/list-view';
import SEO from '../../../components/common/site-metadata';
import ContactUs from '../../../components/common/contact/contact';

const ExperiencePage  =  ({data}) =>  {
  const lists = data.list.edges;
  const bannerData = data.bannerData.frontmatter
    return (
      <Layout>
        <Banner
            bannerTitle = {bannerData.title}
            bannerSubTitle = {bannerData.subTitle}
            image = {bannerData.bgimage}
          />
        <SEO 
          title={bannerData.title}
          metakeywords= {bannerData.metakeywords}
          metadescription={bannerData.metadescription}
          ogimage={bannerData.ogimage}
        />
      {data.bannerData.html && data.bannerData.html !== "" ?
        <div className="container py-5">
          <div className="col-md-12">
            <div dangerouslySetInnerHTML={{ __html: data.bannerData.html }} />
          </div>
        </div>
         : null}
        <div className="container py-5">
          <div className="col-md-12">
            {lists.map(renderList)}
          </div>
        </div>
        <ContactUs/>
      </Layout>
    )
  }

export default ExperiencePage;

export const pageQuery = graphql`
  query ExperiencePage {
    list:allJoomlaArticle (filter: {category: {alias: {eq: "experience"}}}){
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
    bannerData:markdownRemark(frontmatter: { templateKey: { eq: "index-experience" }}) {
      html
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
        bgimage  {
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