require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`,
})
module.exports = {
    siteMetadata: {
      title: 'Tekdi Technologies pvt. ltd.',
      description: 'Tekdi was founded in 2006 with an aim to use technology to make a positive impact to society. Since then, we have empowered 100+ organisations with the technology solutions across verticals',
  },
  plugins: [
    {
      resolve: 'gatsby-plugin-sharp',
      options: {
        useMozJpeg: false,
        stripMetadata: true,
        defaultQuality: 75,
      }
    },
    'gatsby-transformer-sharp',
    {
      resolve: 'gatsby-transformer-remark',
      options: {
        plugins: [
          {
            resolve: 'gatsby-remark-relative-images',
            options: {
              name: 'uploads',
            },
          },
          {
            resolve: 'gatsby-remark-images',
            options: {
              // It's important to specify the maxWidth (in pixels) of
              // the content container as this plugin uses this as the
              // base for generating different widths of each image.
              maxWidth: 2048,
            },
          },
          {
            resolve: 'gatsby-remark-copy-linked-files',
            options: {
              destinationDir: 'static',
            },
          },
        ],
      },
    },
    'gatsby-plugin-sass',
    {
      // keep as first gatsby-source-filesystem plugin for gatsby image support
      resolve: 'gatsby-source-filesystem',
      options: {
        path: `${__dirname}/static/img`,
        name: 'uploads',
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: `${__dirname}/src/pages`,
        name: 'pages',
      },
    },
    'gatsby-plugin-react-helmet',
    {
      resolve: 'gatsby-plugin-purgecss', // purges all unused/unreferenced css rules
      options: {
        develop: true, // Activates purging in npm run develop
        purgeOnly: ['/all.sass'], // applies purging only on the bulma css file
      },
    }, // must be after other CSS plugins
    {
      resolve: `gatsby-plugin-styled-components`,
      options: {
        // Add any options here
      },
    },
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        // The property ID; the tracking code won't be generated without it
        trackingId: "UA-277023-6",
        anonymize: true,
      }
    },
  //   {
  //     resolve: `gatsby-plugin-recaptcha`,
  //     options: {
  //        async: false,
  //        defer: false,
  //        args: `?onload=onloadCallback&render=explicit`,
  //     },
  //  },
    {
      resolve: "gatsby-plugin-anchor-links",
      options: {
        offset: -100
      }
    },
    {
      resolve: `gatsby-plugin-s3`,
      options: {
          bucketName: "tekdi.net",
          protocol: "https",
          hostname: "www.tekdi.net",
      },
    },
    `gatsby-plugin-client-side-redirect` // keep it in last in list
  ],
}
