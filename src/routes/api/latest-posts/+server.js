import { json } from '@sveltejs/kit';

const HASHNODE_GQL_ENDPOINT = 'https://gql.hashnode.com';

const GET_POSTS_QUERY = `
  query Publication($host: String!, $first: Int!) {
    publication(host: $host) {
      posts(first: $first) {
        edges {
          node {
            id
            title
            brief
            url
            publishedAt
            content {
              html
            }
          }
        }
      }
    }
  }
`;

export async function GET({ fetch }) {
    try {
        const response = await fetch(HASHNODE_GQL_ENDPOINT, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                query: GET_POSTS_QUERY,
                variables: { host: 'dozie.dev', first: 10 }
            })
        });

        const result = await response.json();

        if (result.errors) {
            throw new Error(result.errors[0].message);
        }

        const posts = result.data.publication.posts.edges.map(edge => ({
            title: edge.node.title,
            link: edge.node.url,
            date: edge.node.publishedAt,
            content: edge.node.content?.html || edge.node.brief
        }));

        return json(posts, {
            headers: {
                'Cache-Control': 'public, max-age=3600'
            }
        });
    } catch (error) {
        console.error('Error fetching posts:', error);
        return new Response(
            JSON.stringify({ error: error.message }),
            {
                status: 500,
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        );
    }
}