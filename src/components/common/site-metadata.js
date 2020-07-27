import React from 'react';
import { Helmet } from 'react-helmet';
import { useStaticQuery, graphql, withPrefix } from 'gatsby';
import favicon from '../../../static/img/favicon/favicon-32x32.png'
import fontURL from "./fonts/overpass-extralight.woff"

const SEO = (props)  => {
    const { site } = useStaticQuery(detailsQuery);
    const title = props.title || site.siteMetadata.title;
    const metakeywords = props.metakeywords
    const metadescription = props.metadescription
    var ogImage = props.ogimage
    if(ogImage) {
        ogImage = ogImage.childImageSharp.fluid.src;
      } else {
        ogImage = site.siteMetadata.defaultImage;
      }
    var url = process.env.HOST_URL;
    return (
      <Helmet
        htmlAttributes={{
          lang: 'en',
        }}
        title={title}
        titleTemplate={`%s - ${site.siteMetadata.title}`}
        link={[
          { rel: 'shortcut icon', type: 'image/png', href: `${favicon}` },
        ]}
      >
      <html lang="en" />
      <link rel="preload"
          as="font"
          href={fontURL}
          type="font/woff2"
          crossOrigin="anonymous" />
      <link
        rel="apple-touch-icon"
        sizes="180x180"
        href={`${withPrefix('/')}img/favicon/apple-touch-icon.png`}
      />
      <link
        rel="icon"
        type="image/png"
        href={`${withPrefix('/')}img/favicon/favicon-32x32.png`}
        sizes="32x32"
      />
      <link
        rel="icon"
        type="image/png"
        href={`${withPrefix('/')}img/favicon/favicon-16x16.png`}
        sizes="16x16"
      />
      {metadescription ? <meta name="description" content={metadescription} /> : ''}
      {metakeywords ? <meta name="keywords" content={metakeywords} /> : ''}
      <meta name="theme-color" content="#089add" />
      <meta name="twitter:card" content="summary_large_image"/>
      <meta name="twitter:site" content="tekdi.net"/>
      {metadescription ? <meta name="twitter:description" content={metadescription}/> : ''}
      <meta property="og:type" content="website" />
      {title ? <meta property="og:title" content={title} /> : ''}
      {metadescription ? <meta property="og:description" content={metadescription} /> :''}
      {url ? <meta property="og:url" content={url} /> : ''}
      <meta property="og:image" content={process.env.HOST_URL+ogImage} />
      {ogImage ? <meta name="twitter:image" content={process.env.HOST_URL+ogImage} /> : ''}
    </Helmet>
    );
  }

SEO.defaultProps = {
  lang: 'en',
  meta: [],
  keywords: [],
};

export default SEO;

const detailsQuery = graphql`
  query DefaultSEOQuery {
    site {
      siteMetadata {
        title 
        description
        defaultImage
      }
    }
  }
`;