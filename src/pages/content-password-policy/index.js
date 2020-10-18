import React from 'react';
import SEO from '../../components/common/site-metadata';
import Layout from '../../components/layout/baselayout';
import Banner from '../../components/common/banner/banner';
import ContactUs from '../../components/common/contact/contact';
import { graphql, Link} from 'gatsby'
import './content-password.scss';

const ContentPasswordPolicyPage =  ({data}) => {
    const { frontmatter } = data.bannerData
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
          <div className="i-frame">
              <iframe src="https://h5p.org/h5p/embed/266645" width="1278" height="780" frameborder="0" allowfullscreen="allowfullscreen" allow="geolocation *; microphone *; camera *; midi *; encrypted-media *"></iframe><script src="https://h5p.org/sites/all/modules/h5p/library/js/h5p-resizer.js" charset="UTF-8"></script>

          </div>
          <ContactUs />
      </div>
  </Layout>
)}

export default ContentPasswordPolicyPage;

export const pageQuery = graphql`
  query ContentPasswordPolicyBanner {
  bannerData:markdownRemark(frontmatter: { templateKey: { eq: "index-content-password-policy" }}) {
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