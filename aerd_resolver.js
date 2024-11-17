import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient({
    log: ['query'],
  });

// resolvers
export const resolvers = {
  Query: {
    async users(_,args) {    
        const { skip = 0, take = 10 } = args || {};
        return await prisma.users.findMany({
            take: +take,
            skip: +skip
        });
    },
    async user(_, args) {
        console.log(args);
        return await prisma.users.findUnique({
            where: { user_id: +(args['user_id']) }
        });
    },
  },
};

// export default {resolvers};
/*
const resolvers = {
    Query: {
      games() {
        (async()=>{
          const games = await prisma.users.findMany({
            include: {
              reviews: true
            }
          })
          games.forEach(game => {
            console.log(game.email);
          });
        })();
        return db.games
      },
      game(_, args) {
        return db.games.find((game) => game.id === args.id)
      },
      authors() {
        return db.authors
      },
      author(_, args) {
        return db.authors.find((author) => author.id === args.id)
      },
      reviews() {
        return db.reviews
      },
      review(_, args) {
        return db.reviews.find((review) => review.id === args.id)
      }
    },
    Game: {
      reviews(parent) {
        return db.reviews.filter((r) => r.game_id === parent.id)
      }
    },
    Review: {
      author(parent) {
        return db.authors.find((a) => a.id === parent.author_id)
      },
      game(parent) {
        return db.games.find((g) => g.id === parent.game_id)
      }
    },
    Author: {
      reviews(parent) {
        return db.reviews.filter((r) => r.author_id === parent.id)
      }
    },
  }

*/
