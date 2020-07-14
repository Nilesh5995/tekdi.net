import React from 'react';
import { graphql, StaticQuery, Link } from 'gatsby';
import PreviewCompatibleImage from '../common/preview-compatible-image';
import Swiper from 'react-id-swiper';
import 'swiper/css/swiper.css';
import './carousel.scss';

class Blogs extends React.Component {
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
                      {post.frontmatter.featuredimage ? (
                        <div className="">
                          <PreviewCompatibleImage
                            imageInfo={{
                              image: post.frontmatter.featuredimage,
                              alt: `image thumbnail for post ${post.frontmatter.title}`,
                            }}
                          />
                        </div>
                      ) : null}
                    </div>
                    <div className="col-md-7">
                      <h3 className="text-black font-weight-bold section-title">{post.frontmatter.title}</h3>
                      <p className="font-weight-normal">
                      {post.excerpt}
                      </p>
                      <p>
                        <Link className="read-more font-weight-normal" to={post.fields.slug}>View More</Link>
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
      query BlogsCarouselQuery {
        carouselList:allMarkdownRemark(
          sort: { order: DESC, fields: [frontmatter___date] }
          filter: { frontmatter: { templateKey: { eq: "blog-post" } } }
        ) {
          edges {
            node {
              excerpt(pruneLength: 130)
              id
              fields {
                slug
              }
              frontmatter {
                title
                featuredimage {
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
        carouselHeader:markdownRemark(frontmatter: { templateKey: { eq: "index-blog" }}) {
          frontmatter {
            title
            homePageDescription
          }
        }
      }
    `}
    render={(data) => <Blogs data={data}/>}
  />
)
