const path = require('path');
const { paginate } = require('gatsby-awesome-pagination');

exports.createPages = async ({ actions: { createPage }, graphql }) => {
  const {
    data: { learningSpaces, blog },
  } = await graphql(`
    {
      learningSpaces: allAirtableLearningSpaces(
        filter: { data: { publish: { eq: true } } }
        sort: { fields: data___name, order: [ASC] }
      ) {
        edges {
          node {
            data {
              slug
            }
          }
        }
      }
      blog: allAirtableBlog(
        filter: { data: { publish: { eq: true } } }
        sort: { fields: data___published, order: DESC }
      ) {
        edges {
          node {
            recordId
            data {
              slug
            }
          }
        }
      }
    }
  `);

  learningSpaces.edges.forEach(({ node }) => {
    const { slug } = node.data;
    createPage({
      path: `/alternative-learning-spaces/${slug}/`,
      component: require.resolve('./src/templates/learning-space.js'),
      context: {
        slug: slug,
      },
    });
  });

  paginate({
    createPage,
    items: blog.edges,
    itemsPerPage: 6,
    pathPrefix: '/blog',
    component: path.resolve('./src/templates/blog.js'),
  });

  blog.edges.forEach(({ node }) => {
    const { slug } = node.data;
    createPage({
      path: `/blog/${slug}/`,
      component: require.resolve('./src/templates/blog-post.js'),
      context: {
        slug: slug,
      },
    });
  });
};
