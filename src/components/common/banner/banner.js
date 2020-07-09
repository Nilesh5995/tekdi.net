import React from 'react';
import './banner.scss';
import BackgroundImage from 'gatsby-background-image'
import { graphql, useStaticQuery } from 'gatsby'

const Banner = props => {
    const {  defaultImage } = useStaticQuery(
      graphql`
        query {
          defaultImage: file(relativePath: { eq: "banner/default-banner.jpg" }) {
            childImageSharp {
              fluid {
                ...GatsbyImageSharpFluid
              }
            }
          }
        }
      `
    )
  const backgroundImage = props.image ? props.image.childImageSharp.fluid : defaultImage.childImageSharp.fluid;
    return(
      <BackgroundImage fluid={backgroundImage}
      backgroundColor={`#040e18`}
      >
        <div className="banner">
          <div className="container">
            <div className="banner-text">
                <p className="text-white font-weight-normal">{props.bannerSubTitle}</p>
                <h1 className="text-white">{props.bannerTitle}</h1>
            </div>
          </div>
      </div>
    </BackgroundImage>
    );
}
export default Banner;