import React from 'react';
import { graphql, StaticQuery, Link } from 'gatsby';
import PreviewCompatibleImage from '../common/preview-compatible-image';
import Swiper from 'react-id-swiper';
import 'swiper/css/swiper.css';
import './carousel.scss';

class DigitalTransformation extends React.Component {
    render() {
      const { data } = this.props
      const carousel = this.props.data.carouselList.edges;
      const carouselHeader  = data.carouselHeader

      const params = {
        navigation: {
          nextEl: '.swiper-button-next',
        },
        loop:true,
        //slidesPerColumn: 2,
        breakpoints: {
          1024: {
            slidesPerView: 2,
            spaceBetween: 30
          },
          768: {
            slidesPerView: 2,
            spaceBetween: 30
          },
          640: {
            slidesPerView: 2,
            spaceBetween: 30
          },
          320: {
            slidesPerView: 1,
            spaceBetween: 30
          }
        }
      };

      return (
        <div className="bg-lightgrey container-fluid"> 
          <div className="com-cover">
            <div className="container">
              <div key={carouselHeader.id} className="row mb-5 pt-5 digital-evolution">
                <div className="col-md-5 offset-md-1">
                  <h2 className="com-heading text-black">
                    {carouselHeader.frontmatter.title}
                  </h2>
                  <p>
                    {carouselHeader.frontmatter.homePageDescription}
                  </p>
                </div>
              </div>
            </div>
          <div className="digital-evolution-carousel">
            <Swiper {...params}>
              {carousel &&
              carousel.map(({ node: post }) => (
                <div key={post.id}>
                  <div className="row">
                    <div className="col-md-5">
                      {post.frontmatter.image ? (
                        <div className="">
                          <PreviewCompatibleImage
                            imageInfo={{
                              image: post.frontmatter.image,
                              alt: `image thumbnail for post ${post.frontmatter.title}`,
                            }}
                          />
                        </div>
                      ) : null}
                    </div>
                    <div className="col-md-7">
                      <h3 className="text-black font-weight-bold section-title">{post.frontmatter.title}</h3>
                      <p className="font-weight-normal">
                      {post.frontmatter.description.substring(0,130)+"..."}
                      </p>
                      <p>
                        <Link className="read-more font-weight-normal" to={"your-next/digital-transformation"}>View More</Link>
                      </p>
                    </div>
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
      query DigitalTransFormationCarouselQuery {
        carouselList:allMarkdownRemark(
          sort: { fields: [frontmatter___index] }
          filter: { frontmatter: { templateKey: { eq: "digital-transformation" } } }
        ) {
          edges {
            node {
              excerpt(pruneLength: 130)
              id
              fields {
                slug
              }
              frontmatter {
                date(formatString: "DD MMMM YYYY")
                title
                description
                index
                image {
                  childImageSharp {
                    fluid(maxWidth: 250) {
                      ...GatsbyImageSharpFluid
                    }
                  }
                }
              }
            }
          }
        }
        carouselHeader:markdownRemark(frontmatter: { templateKey: { eq: "index-digital-transformation" }}) {
          frontmatter {
            title
            homePageDescription
          }
        }
      }
    `}
    render={(data) => <DigitalTransformation data={data}/>}
  />
)
