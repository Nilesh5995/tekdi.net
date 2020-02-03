
exports.onCreateWebpackConfig = ({ actions, loaders, getConfig }) => {
  const config = getConfig()
  var webpack = require('webpack');
  plugins: [
    // other plugins,
    new webpack.ProvidePlugin({
        $: 'jquery',
        jQuery: 'jquery',
        'window.jQuery': 'jquery'
    }),
  ]
  // This will completely replace the webpack config with the modified object.
  actions.replaceWebpackConfig(config)
}

const _ = require('lodash')
const path = require('path')
const { createFilePath } = require('gatsby-source-filesystem')
const { fmImagesToRelative } = require('gatsby-remark-relative-images')

exports.createPages = ({ actions, graphql }) => {
  const { createPage } = actions

  return graphql(`
  query {
      allMarkdownRemark(limit: 1000, filter: {frontmatter: {templateKey: { in: ["digital-evolution", "industries-page","products-platforms", "positions", "blog-post"]}}}) {
        edges {
          node {
            id
            fields {
              slug
            }
            frontmatter {
              templateKey
            }
          }
        }
      }
  }
  `).then(result => {
    if (result.errors) {
      result.errors.forEach(e => console.error(e.toString()))
      return Promise.reject(result.errors)
    }
    const posts = result.data.allMarkdownRemark.edges  
    posts.forEach(({edge,postsPerPage,numPages }) => {
    const id = edge.node.id
      createPage({
        path: edge.node.fields.slug,
        tags: edge.node.frontmatter.tags,
        component: path.resolve(
          `src/templates/${String(edge.node.frontmatter.templateKey)}.js`
        ),
        // additional data can be passed via context
        context: {
          id,
        },
      })
    
    })    
  })
}
  

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions
  fmImagesToRelative(node) // convert image paths for gatsby images

  if (node.internal.type === `MarkdownRemark`) {
    const value = createFilePath({ node, getNode })
    createNodeField({
      name: `slug`,
      node,
      value,
    })
  }
}


//for the blog pagination and blog categories and Tags
const categories = []
const tags = []
exports.createPages = ({ actions, graphql }) => {
  const { createPage } = actions

  return graphql(`
  query {
      allMarkdownRemark(limit: 1000, filter: {frontmatter: {templateKey: { in: ["blog-post"]}}}) {
        edges {
          node {
            id
            fields {
              slug
            }
            frontmatter {
              templateKey
              category
              tags
            }
          }
        }
      }
  }
  `).then(result => {
    if (result.errors) {
      result.errors.forEach(e => console.error(e.toString()))
      return Promise.reject(result.errors)
    }
    const posts = result.data.allMarkdownRemark.edges  
    const postsPerPage = 1
    const numPages = Math.ceil(posts.length / postsPerPage)
    posts.forEach(edge => {
    edge.node.frontmatter.category.forEach(cat => categories.push(cat))
    edge.node.frontmatter.tags.forEach(tag => tags.push(tag))
    const id = edge.node.id
      createPage({
        path: edge.node.fields.slug,
        tags: edge.node.frontmatter.tags,
        component: path.resolve(
          `src/templates/${String(edge.node.frontmatter.templateKey)}.js`
        ),
        // additional data can be passed via context
        context: {
          id,
        },
      })
            
      Array.from({ length: numPages }).forEach((_, i) => {
        createPage({
          path: i === 0 ? `/blog` : `/blog/${i + 1}`,
          component: path.resolve("./src/templates/blog-list.js"),
          context: {
            id,
            limit: postsPerPage,
            skip: i * postsPerPage,
            numPages,
            currentPage: i + 1,
          },
        })
      }) 
      
    })
    

    // blog categories 

    const countCategories = categories.reduce((prev, curr) => {
      prev[curr] = (prev[curr] || 0) + 1
      return prev
    }, {})
    const allCategories = Object.keys(countCategories)
    allCategories.forEach((cat, i) => {
      const link = `/blog/${_.kebabCase(cat)}`
      Array.from({
        length: Math.ceil(countCategories[cat] / postsPerPage),
      }).forEach((_, i) => {
        createPage({
          path: i === 0 ? link : `${link}/${i + 1}`,
          component: path.resolve("./src/templates/blogcategory.js"),
          context: {
            allCategories: allCategories,
            category: cat,
            limit: postsPerPage,
            skip: i * postsPerPage,
            currentPage: i + 1,
            numPages: Math.ceil(countCategories[cat] / postsPerPage),
          },
        })
      })
    })

  
  // Make tag pages
  const countTags = tags.reduce((prev, curr) => {
    prev[curr] = (prev[curr] || 0) + 1
    return prev
  }, {})
  const allTags = Object.keys(countTags)
  allTags.forEach((tag, i) => {
    const tagLink = `/blog/tags/${_.kebabCase(tag)}`
    Array.from({
      length: Math.ceil(countTags[tag] / postsPerPage),
    }).forEach((_, i) => {
      createPage({
        path: i === 0 ? tagLink  : `${tagLink}/${i + 1}`,
        component: path.resolve("./src/templates/blog-tag.js"),
        context: {
          allTags: allTags,
          tag: tag,
          limit: postsPerPage,
          skip: i * postsPerPage,
          currentPage: i + 1,
          numPages: Math.ceil(countTags[tag] / postsPerPage),
        },
      })
    })
  })


  })
}