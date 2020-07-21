import React from 'react';
import { graphql, Link } from 'gatsby';
import Banner from '../../components/common/banner/banner';
import Layout from '.././../components/layout/baselayout';
import renderList from '../../components/list-view/list-view';
import SEO from '../../components/common/site-metadata';
import ContactUs from '../../components/common/contact/contact';
import PreviewCompatibleImage from '../../components/common/preview-compatible-image'
const _ = require(`lodash`);
const IndustriesJoomlaPage  =  ({data}) =>  {
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
          title = {bannerData.title}
          metakeywords = {bannerData.metakeywords}
          metadescription = {bannerData.metadescription}
          ogimage = {bannerData.ogimage}
        />
       {/* {data.bannerData.html && data.bannerData.html !== "" ?
        <div className="container py-5">
          <div className="col-md-12">
            <div dangerouslySetInnerHTML={{ __html: data.bannerData.html }} />
          </div>
        </div>
         : null} */}
        <div className="container py-5">
          <div className="col-md-12">
          {/* {lists.map((material) => {
  console.log(material.node);
})} */}
          {lists &&
            lists.map((list) => (
            <div className="blog-list mb-5 pb-5" key={list.node.id}>
              <div className="row">
                <div className="col-md-3 col-sm-4 col-xs-12">
                  {list.node.imageIntro ? (
                    <div className="featured-thumbnail">
                      <PreviewCompatibleImage
                        imageInfo={{
                          image: list.node.imageIntro,
                          alt: `featured image thumbnail for post ${list.node.imageIntro}`,
                        }}
                      />
                    </div>
                  ) : null}
                  </div>
                  <div className="col-md-8 col-sm-12 col-xs-12 blog-info">
                    <h3 className="blog-title">
                        {list.node.title}
                    </h3>
                    <ul className="unstyled mb-4">
                      {list.node.alias && list.node.alias !=null ?
                      <li className="sub-title">
                        { list.node.tags.itemTags.map( (tags) => (
                        <Link class="read-more" to={tags.title}>{tags.title}</Link>
                          ))}
                      </li>
                      : null}
                    </ul>
                    <div className="col-md-12">
                      <div dangerouslySetInnerHTML={{ __html: list.node.introtext }} />
                      <Link to={list.node.tags.itemTags.title}>{list.node.tags.itemTags.title}</Link>
                    </div>
                    <div>
                    {list.node.custom_fields.map( (fields) => (
                      fields.value ? <span>{fields.title} - <span dangerouslySetInnerHTML={{ __html: fields.value }} /> <br/></span> : null
                    ))}
                    </div>
                  </div>
                </div>
            </div>
            ))}
          </div>
        </div>
        <ContactUs/>
      </Layout>
    )
  }

export default IndustriesJoomlaPage;

export const pageQuery = graphql`
  query IndustriesJoomlaPageTemplate {
    list:allJoomlaArticle(filter: {catid: {catid: {eq: "8"}}}){
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
          imageIntro {
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
            id
            label
            rawvalue
            title
            type
            value
          }
          tags {
            itemTags {
              alias
              tag_id
              title
              urls
            }
          }
        }
      }
    }
    bannerData:markdownRemark(frontmatter: { templateKey: { eq: "index-industries" }}) {
      html
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