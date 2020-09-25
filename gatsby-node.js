const path = require('path');
const { paginate } = require('gatsby-awesome-pagination');
const slugify = require('./src/utls/slugify');

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
              name
              city
            }
            fields {
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
              title
              author
            }
            fields {
              slug
            }
          }
        }
      }
    }
  `);

  learningSpaces.edges.forEach(({ node }) => {
    const { slug } = node.fields;
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
    const { slug } = node.fields;
    createPage({
      path: `/blog/${slug}/`,
      component: require.resolve('./src/templates/blog-post.js'),
      context: {
        slug: slug,
      },
    });
  });
};

exports.onCreateNode = ({ node, actions }) => {
  const { createNodeField } = actions;
  if (node.internal.type === `AirtableBlog`) {
    let slug = slugify(`${node.data.title} ${node.data.author}`);
    createNodeField({
      node,
      name: `slug`,
      value: slug,
    });
  }
  if (node.internal.type === `AirtableLearningSpaces`) {
    let slug = slugify(`${node.data.name} ${node.data.city}`);
    createNodeField({
      node,
      name: `slug`,
      value: slug,
    });
  }
};

exports.createSchemaCustomization = ({ actions }) => {
  const { createTypes } = actions;
  const typeDefs = `
    type airtableCareers implements Node @dontInfer {
      recordId: ID
      data: Data!
    }
    type Data {
      title: String
      type: String
      website: String
      published: Date! @dateformat
      publish: Boolean
      organisation: String
      location: String
      phone: String
      email: String
      description: AirtableField
    }
    type AirtableField implements Node {
      childMarkdownRemark: MarkdownRemark
    }
    type MarkdownRemark {
      html: String
    }
  `;
  createTypes(typeDefs);
};
