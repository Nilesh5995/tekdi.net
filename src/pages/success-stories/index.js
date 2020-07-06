import React from 'react';
import { graphql, Link } from 'gatsby';
import Banner from '../../components/common/banner/banner';
import Layout from '.././../components/layout/baselayout';
import SEO from '../../components/common/site-metadata';
import PreviewCompatibleImage from '../../components/common/preview-compatible-image'
import ContactUs from '../../components/common/contact/contact';

const CaseStudyPage  =  ({data}) =>  {
  const lists = data.list.edges;
  const bannerData = data.bannerData.frontmatter
    return (
      <Layout>
        <Banner
            bannerTitle= {bannerData.title}
            bannerSubTitle = {bannerData.subTitle}
            image = {bannerData.image}
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
          {lists && lists.map(list => (
            <div className="blog-list mb-5 pb-5" key={list.node.id}>
              <div className="row">
              {list.node.frontmatter.image && list.node.frontmatter.image != null ? (
                <div className="col-md-3 col-sm-4 col-xs-12">
                    <div className="featured-thumbnail">
                      <PreviewCompatibleImage
                        imageInfo={{
                          image: list.node.frontmatter.image,
                          alt: `featured image thumbnail for post ${list.node.frontmatter.title}`,
                        }}
                      />
                    </div>
                   </div>
                  ) : null}
                  <div className={list.node.frontmatter.image && list.node.frontmatter.image != null ? `col-md-9 col-sm-8 col-xs-12 blog-info` : `col-md-12 col-sm-8 col-xs-12 blog-info` }>
                    <h3 className="blog-title">
                      <Link to={list.node.fields.slug} >
                        {list.node.frontmatter.title}
                      </Link>
                    </h3>
                    {list.node.frontmatter.subTitle ? (
                    <ul className="unstyled mb-4">
                      <li className="blog-category">
                      <Link to={list.node.fields.slug}>{list.node.frontmatter.subTitle}</Link>
                      </li>
                    </ul>  ) : null}
                    <p>
                      {list.node.excerpt}
                    </p>
                    <Link className="read-more" to={list.node.fields.slug}>
                       Keep Reading
                     </Link>
                  </div>
                </div>
            </div>
            ))
          }
          </div>
        </div>
        <ContactUs/>
      </Layout>
    )
  }

export default CaseStudyPage;

export const pageQuery = graphql`
  query CaseStudyPageTemplate {
    list:allMarkdownRemark(filter: { frontmatter: { templateKey: { eq: "case-study" } } }, sort: {fields: frontmatter___index}) {
      edges {
        node {
          html
          excerpt(pruneLength: 250)
          id
          fields {
            slug
          }
          frontmatter {
            title
            templateKey
            subTitle
            description
            image  {
              childImageSharp {
                fluid(maxWidth: 200, quality: 100) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
          }
        }
      }
    }
    bannerData:markdownRemark(frontmatter: { templateKey: { eq: "index-case-study" }}) {
      html
      frontmatter {
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
        image {
          childImageSharp {
            fluid(quality: 100) {
              ...GatsbyImageSharpFluid
            }
          }
        }
        subTitle
        description
      }
    }
  }
`