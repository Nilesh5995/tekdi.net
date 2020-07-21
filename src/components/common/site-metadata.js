import React from 'react';
import { Helmet } from 'react-helmet';
import { StaticQuery, graphql, withPrefix } from 'gatsby';
import favicon from '../../../static/img/favicon/favicon-32x32.png'
import fontURL from "./fonts/overpass-extralight.woff"

const SEO = props => (
  <StaticQuery
    query={detailsQuery}
    render={(data) => {
      const title = props.title || data.site.siteMetadata.title;
      const metakeywords = props.metakeywords
      const metadescription = props.metadescription
      var ogImage = props.ogimage
      console.log(ogImage);
      if(ogImage) {
         ogImage = ogImage.childImageSharp.fluid.src;
        } else {
          ogImage = data.site.siteMetadata.defaultImage;
        }
        
      var url =  typeof window !== 'undefined' ? window.location.href : '';
      if(url) {
        var arr = url.split("/");
        var ogImageUrl = arr[0] + "//" + arr[2]
      }
      //var ogImageUrl =  typeof window !== 'undefined' ? window.location.hostname : '';
      return (
        <Helmet
          htmlAttributes={{
            lang: 'en',
          }}
          title={title}
          titleTemplate={`%s - ${data.site.siteMetadata.title}`}
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
        <meta property="og:image" content={ogImageUrl+ogImage} />
        {ogImageUrl && ogImage ? <meta name="twitter:image" content={ogImageUrl+ogImage} /> : ''}
      </Helmet>
      );
    }}
  />
);

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