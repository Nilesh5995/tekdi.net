import React from 'react';
import { Link, graphql, StaticQuery } from 'gatsby';
import Swiper from 'react-id-swiper';
import 'swiper/css/swiper.css';
import './industries-carousel.scss';

class SuccessStoriesCarousel extends React.Component {
    render(){
        const { data } = this.props
        const carousel = this.props.data.carouselList.edges;
        const carouselHeader  = data.carouselHeader
        const params = {
          navigation: {
            nextEl: '.swiper-button-next',
          },
          loop: true,
          breakpoints: {
            1024: {
              slidesPerView: 4,
              spaceBetween: 0
            },
            768: {
              slidesPerView: 3,
              spaceBetween: 0
            },
            640: {
              slidesPerView: 2,
              spaceBetween: 0
            },
            320: {
              slidesPerView: 1,
              spaceBetween: 10
            }
          }
        };

        return (
          <div className="container">
            <div className="com-cover">
              <div className="text-center col-md-6 offset-md-3 mb-4" key={carouselHeader.id}>
                  <h2 className="com-heading text-black">{carouselHeader.frontmatter.title}</h2>
              </div>
              <div className="container">
                  <div className="industries-carousel row">
                      <Swiper {...params}>
                          {carousel &&
                              carousel.map(({ node: post }) => (
                              <div className="item blue-bg" key={post.id}>
                                  <div className="item-inner text-white">
                                    <h3 className="section-title mt-4 mb-2">{post.frontmatter.title}</h3>
                                    <p className="font-weight-normal">
                                    {post.excerpt}
                                      <br/>
                                      <br/>
                                      <Link to={post.fields.slug} className="font-weight-bold">View More </Link>
                                    </p>
                                  </div>
                              </div>
                          ))}
                      </Swiper>
                  </div>
              </div>
          </div>
        </div>
        )
    }
}

export default () => (
    <StaticQuery
      query={graphql`
        query SuccessStoriesQuery {
          carouselList:allMarkdownRemark(
            filter: { frontmatter: { templateKey: { eq: "case-study" } } }, sort: {fields: frontmatter___index}
          ) {
            edges {
              node {
                excerpt(pruneLength: 120)
                id
                fields {
                  slug
                }
                frontmatter {
                  title
                  subTitle
                  description
                  icon {
                    childImageSharp {
                      fluid(maxWidth: 60) {
                        ...GatsbyImageSharpFluid
                      }
                    }
                  }
                  hovericon {
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
          carouselHeader:markdownRemark(frontmatter: { templateKey: { eq: "index-case-study" }}) {
            frontmatter {
              title
            }
          }
        }
      `}
      render={(data) => <SuccessStoriesCarousel data={data} />}
    />
  )