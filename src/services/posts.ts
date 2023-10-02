import ky from "ky";

import { env } from "~/constants/env";

const api = ky.create({
  prefixUrl: env.HYGRAPH_ENDPOINT,
});

export class PostService {
  static async getPosts() {
    const { data } = await api
      .post("master", {
        json: {
          query: `
          query {
            posts(orderBy: createdAt_DESC) {
              title
              slug
              excerpt
              createdAt
              coverImage {
                url(
                  transformation: {
                    image: {
                      resize: { width: 400 }
                    }
                  }
                )
              }
            }
          }
        `,
        },
      })
      .json<{
        data: {
          posts: {
            title: string;
            slug: string;
            excerpt: string;
            createdAt: string;
            coverImage: {
              url: string;
            };
          }[];
        };
      }>();

    return data.posts;
  }

  static async getPostBySlug(slug: string) {
    const { data } = await api
      .post("master", {
        json: {
          query: `
          query {
            post(
              where: {
                slug: "${slug}"
              }
            ) {
              title
              content {
                html
              }
              coverImage {
                url(
                  transformation: {
                    image: {
                      resize: {
                        width: 1400, 
                        height: 600, 
                        fit: crop
                      }
                    }
                  }
                )
              }
            }
          }
        `,
        },
      })
      .json<{
        data: {
          post: {
            title: string;
            content: {
              html: string;
            };
            coverImage: {
              url: string;
            };
          };
        };
      }>();

    return data.post;
  }

  static async getPostsPaths() {
    const { data } = await api
      .post("master", {
        json: {
          query: `
          query {
            posts {
              slug
            }
          }
        `,
        },
      })
      .json<{
        data: {
          posts: {
            slug: string;
          }[];
        };
      }>();

    return data.posts;
  }
}
