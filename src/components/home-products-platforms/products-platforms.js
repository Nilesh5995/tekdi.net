import React from "react";
import { graphql, StaticQuery } from 'gatsby';
import PreviewCompatibleImage from '../common/preview-compatible-image';
import Swiper from 'react-id-swiper';
import 'swiper/css/swiper.css';
import "./product-platform.scss"

class ProductsPlatforms extends React.Component {
    render() {
      const { data } = this.props
      const carousel = this.props.data.carouselList.edges;
      const carouselHeader  = data.carouselHeader
      const params = {
        breakpoints: {
          1024: {
            slidesPerView: 4,
            spaceBetween: 0
          },
          992: {
            loop: true,
            slidesPerView: 3,
            spaceBetween: 0,
            centeredSlides: true
          },
          640: {
            loop: true,
            slidesPerView: 2,
            spaceBetween: 0,
            centeredSlides: true
          },
          320: {
            loop: true,
            slidesPerView: 1,
            spaceBetween: 0,
            centeredSlides: true
          }
        }
      }
        return (
          <div className="container">
           <div className="com-cover">
              <div className="text-center col-md-6 offset-md-3 mb-5" key={carouselHeader.id}>
                <h2 className="com-heading text-black">{carouselHeader.frontmatter.title}</h2>
              </div>
              <div className="products-carousel">
                <Swiper {...params}>
                  {carousel &&
                  carousel.map(({ node: post }) => (
                      <div className="p-1" key={post.id}>
                          <div className="prod-item px-4 py-5">
                            <div className="icon">
                                <PreviewCompatibleImage
                                  imageInfo={{
                                    image: post.frontmatter.icon,
                                    alt: `icon for ${post.frontmatter.title}`,
                                  }}
                                />
                              </div>
                            <h3 className="section-title text-black mb-4">
                                {post.frontmatter.title}
                            </h3>
                            <p className="mb-0 font-weight-normal">
                            {post.frontmatter.description.substring(0,130)+"..."}
                            </p>
                          </div>
                      </div>
                  ))}
                  </Swiper>
              </div>
            </div>
          </div>
        )
    }
}

  export default () => (
    <StaticQuery
      query={graphql`
        query ProductsPlatformsGridQuery {
          carouselList:allMarkdownRemark(
            filter: { frontmatter: { templateKey: { eq: "platforms" } } }
          ) {
            edges {
              node {
                excerpt(pruneLength: 150)
                id
                fields {
                  slug
                }
                frontmatter {
                  title
                  templateKey
                  description
                  icon {
                    childImageSharp {
                      fluid(maxWidth: 60) {
                        ...GatsbyImageSharpFluid
                      }
                    }
                  }
                }
              }
            }
          }
          carouselHeader:markdownRemark(frontmatter: { templateKey: { eq: "index-platforms" }}) {
            frontmatter {
              title
            }
          }
        }
      `}
      render={(data, count) => <ProductsPlatforms data={data}/>}
    />
  )
