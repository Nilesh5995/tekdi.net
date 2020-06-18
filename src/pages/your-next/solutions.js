import React from 'react';
import { graphql } from 'gatsby';
import Banner from '../../components/common/banner/banner';
import Layout from '.././../components/layout/baselayout';
import renderList from '../../components/list-view/list-view';

const SolutionPage  =  ({data}) =>  {
  const lists = data.allMarkdownRemark.edges;
    return (
      <Layout>
        <Banner
            bannerTitle= 'Solutions'
            bannerSubTitle = 'Solutions'
          />
        <div className="container py-5">
          <div className="col-md-12">
            {lists.map(renderList)}
          </div>
        </div>
      </Layout>
    )
  }

export default SolutionPage;

export const pageQuery = graphql`
  query SolutionPageTemplate {
    allMarkdownRemark(filter: { frontmatter: { templateKey: { eq: "solutions" } } }) {
      edges {
        node {
          excerpt(pruneLength: 200)
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
  }
`