import React from "react"
import { graphql, StaticQuery } from 'gatsby';
import PropTypes from 'prop-types';
import PreviewCompatibleImage from '../common/preview-compatible-image';
import BackgroundImage from 'gatsby-background-image'
import Swiper from 'react-id-swiper';
import 'swiper/css/swiper.css';
import "./slideshow.scss";

class Slideshow extends React.Component {

    render(){
      
        const { data } = this.props
        const { edges: posts } = data.slideShowData
        const backgroundImage = data.bgImage.frontmatter.image.childImageSharp.fluid
        let params;
      if (posts.length > 1) {
         params = {
            pagination: {
                el: '.swiper-pagination',
                clickable: true,
                bullets: true,
            },
            grabCursor: true,
            loop:true
        }
      }
        return (
          <BackgroundImage fluid={backgroundImage}>
            <div className="slideshow">
                <div className="container"> 
                    <Swiper {...params}> 
                        {posts &&
                        posts.map(({ node: post }) => (
                        <div className="carousel-items" key={post.id}>
                            <div className="row">
                                <h1 className="col-sm-7 col-xs-12 carousel-desc">
                                    {post.frontmatter.heading}
                                </h1>
                                <div className="col-sm-5 col-xs-12">
                                <PreviewCompatibleImage
                                  imageInfo={{
                                    image: post.frontmatter.img,
                                    alt: `featured image thumbnail for post ${post.frontmatter.alt}`,
                                  }}
                                />
                                </div>
                            </div>
                        </div>
                        ))}
                    </Swiper>
                </div>
            </div>
          </BackgroundImage>
        )
    }
};

Slideshow.propTypes = {
  data: PropTypes.shape({
    allMarkdownRemark: PropTypes.shape({
      edges: PropTypes.array,
    }),
  }),
}

export default () => (
    <StaticQuery
      query={graphql`
        query SlideshowQuery {
          slideShowData:allMarkdownRemark(
            filter: { frontmatter: { templateKey: { eq: "slideshow" } } }
          ) {
            edges {
              node {
                id
                frontmatter {
                  heading
                  alt
                  img {
                    childImageSharp {
                      fluid {
                        ...GatsbyImageSharpFluid
                      }
                    }
                  }
                }
              }
            }
          }
          bgImage:markdownRemark(frontmatter: { templateKey: { eq: "index-page" } }) {
            frontmatter {
              title
              metakeywords
              metadescription
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
      `}
      render={(data) => <Slideshow data={data}/>}
    />
  )