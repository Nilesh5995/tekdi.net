import React from 'react';
import { graphql, StaticQuery } from 'gatsby';
import PreviewCompatibleImage from '../common/preview-compatible-image';
import Swiper from 'react-id-swiper';
import 'swiper/css/swiper.css';
import './clients.scss';

class Clients extends React.Component {
    render() {
      const { data } = this.props
      const { edges: posts } = data.allMarkdownRemark

      const params = {
        breakpoints: {
          1024: {
            slidesPerView: 6,
            spaceBetween: 30
          },
          768: {
            loop:true,
            slidesPerView: 4,
            spaceBetween: 30,
            centeredSlides: true
          },
          640: {
            loop:true,
            slidesPerView: 3,
            spaceBetween: 30,
            centeredSlides: true
          },
          360: {
            loop:true,
            slidesPerView: 2,
            spaceBetween: 30,
            centeredSlides: true
          },
          320: {
            loop:true,
            slidesPerView: 1,
            spaceBetween: 30,
            centeredSlides: true
          }
        }
      };
      return ( 
          <div className="container client-wrap mb-5">
            <Swiper {...params}>
                {posts &&
                posts.map(({ node: post }) => (
                    <div className="text-center" key={post.id}>
                        <PreviewCompatibleImage
                            imageInfo={{
                            image: post.frontmatter.img,
                            alt: `image for ${post.frontmatter.alt}`,
                            }}
                        />
                    </div>
                ))}
            </Swiper>
        </div>
    )
  }
}


export default () => (
  <StaticQuery
    query={graphql`
      query ClientsQuery {
        allMarkdownRemark(
          filter: { frontmatter: { templateKey: { eq: "clients-page" } } }
        ) {
          edges {
            node {
              id
              fields {
                slug
              }
              frontmatter {
                img {
                    childImageSharp {
                        fluid {
                        ...GatsbyImageSharpFluid
                        }
                    }
                }
                alt
              }
            }
          }
        }
      }
    `}
    render={(data, count) => <Clients data={data} count={count} />}
  />
)
