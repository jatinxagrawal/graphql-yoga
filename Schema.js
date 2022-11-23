import { createSchema, createYoga } from "graphql-yoga";
import { createServer } from "node:http";
import { fetch } from "@whatwg-node/fetch";

// const yoga = createYoga({
//   schema: createSchema({
//     typeDefs: /* GraphQL */ `
//       type Query {
//         hello: String
//       }
//     `,
//     resolvers: {
//       Query: {
//         hello: () => "Hello from Yoga!",
//       },
//     },
//   }),
// });

// const yoga = createYoga({
//   schema: createSchema({
//     typeDefs: /* GraphQL */ `
//       type Query {
//         hello: String
//       }

//       type Subscription {
//         countdown(from: Int!): Int!
//       }
//     `,
//     resolvers: {
//       Query: {
//         hello: () => "world",
//       },
//       Subscription: {
//         countdown: {
//           // This will return the value on every 1 sec until it reaches 0
//           subscribe: async function* (_, { from }) {
//             for (let i = from; i >= 0; i--) {
//               await new Promise((resolve) => setTimeout(resolve, 1000));
//               yield { countdown: i };
//             }
//           },
//         },
//       },
//     },
//   }),
// });


const yoga = createYoga({
  schema: createSchema({
    typeDefs: /* GraphQL */ `
      type Query {
        greeting: String!
      }
    `,
    resolvers: {
      Query: {
        greeting: async () => {
          // This service does not exist
          const greeting = await fetch("http://localhost:9876/greeting").then(
            (res) => res.text()
          );

          return greeting;
        },
      },
    },
  }),
});

const server = createServer(yoga);

server.listen(4000, () => {
  console.info("Server is running on http://localhost:4000/graphql");
});