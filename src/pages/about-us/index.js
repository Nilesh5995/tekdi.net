import React from 'react';
import PropTypes from 'prop-types';
import { graphql} from 'gatsby';
import SEO from '../../components/common/site-metadata';
import Layout from '../../components/layout/baselayout';
import Banner from '../../components/common/banner/banner';
import CompanyInfo from '../../components/company/company-info';
import CorePurpose from '../../components/company/core-purpose';
import CoreValuesCarousel from '../../components/company/core-values-carousel';
import CompanyJourney from '../../components/company/company-journey';
import LifeAtTekdiInfo from '../../components/company/life-at-tekdi';

const AboutUsTemplate = ({ data }) => {
  const { markdownRemark: post } = data

  return (
    <Layout>
      <SEO 
        title={post.frontmatter.title}
        metakeywords= {post.frontmatter.metakeywords}
        metadescription={post.frontmatter.metadescription}
        ogimage={post.frontmatter.ogimage}
      />
      <Banner 
          bannerTitle = {post.frontmatter.title} 
          image = {post.frontmatter.bgimage}
      />
      <CompanyInfo 
        companyInfo={post.frontmatter.companyInfo}
        companyImg={post.frontmatter.companyImg}
        projectInfo={post.frontmatter.projectInfo}
      />
      <CorePurpose 
        corePurposeHeading={post.frontmatter.corePurposeHeading}
        corePurposeDesc={post.frontmatter.corePurposeDesc}
        corePurposeImg={post.frontmatter.corePurposeImg}
      />
      <div id="vision">
        <CoreValuesCarousel />
      </div>
      
      <CompanyJourney 
        journeyInfo={post.frontmatter.journeyinfo}
      />
      <div id="team">
          <LifeAtTekdiInfo 
            lifeAtTekdiImg={post.frontmatter.lifeattekdiimg}
          />
      </div>
    </Layout>
  )
}

AboutUsTemplate.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.shape({
      frontmatter: PropTypes.object,
    }),
  }),
}

export default AboutUsTemplate;

export const pageQuery = graphql`
  query CompanyTemplate {
    markdownRemark(frontmatter: { templateKey: { eq: "about-us" } }) {
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
        bgimage {
          childImageSharp {
            fluid {
              ...GatsbyImageSharpFluid
            }
          }
        }
        companyInfo
        companyImg {
          childImageSharp {
            fluid(maxWidth: 350, quality: 100) {
              ...GatsbyImageSharpFluid
            }
          }
        }
        projectInfo {
          title
          description   
        }
        corePurposeHeading
        corePurposeDesc
        corePurposeImg {
          childImageSharp {
            fluid {
              ...GatsbyImageSharpFluid
            }
          }
        }
        journeyinfo {
          title
          description
          icon {
            childImageSharp {
              fluid(maxWidth: 90, quality: 100) {
                ...GatsbyImageSharpFluid
              }
            }
          }
        }
        lifeattekdiimg {
          img {
            childImageSharp {
              fluid(maxHeight: 260, quality: 100) {
                ...GatsbyImageSharpFluid
              }
            }
          }
        }
      }
    }
  }
`
