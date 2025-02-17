const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const schema = require('./schema');
const resolver = require('./resolvers');

//import ApolloServer
const { ApolloServer } = require('apollo-server-express');

//store sensitive information to env variables
const dotenv = require('dotenv');
dotenv.config();

//mongoDB Atlas Connection String
const DB_CONNECTION = `mongodb+srv://${process.env.DB_USER_NAME}:${process.env.DB_PASSWORD}@cluster0.${process.env.CLUSTER_ID}.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority&appName=Cluster0`;
const mongodb_atlas_url = process.env.MONGODB_URL || DB_CONNECTION;

const connectDB = async () => {
  try {
    await mongoose.connect(mongodb_atlas_url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Success Mongodb connection');
  } catch (error) {
    console.log(`Unable to connect to DB : ${error.message}`);
  }
};

//Define Apollo Server
const startServer = async () => {
  const server = new ApolloServer({
    typeDefs: schema,
    resolvers: resolver,
  });

  
  await server.start(); 

  //Define Express Server
  const app = express();
  app.use(express.json());
  app.use('*', cors());

  //Add Express app as middleware to Apollo Server
  server.applyMiddleware({ app });

  const PORT = process.env.PORT || 4000;
  app.listen(PORT, () => {
    console.log(`🚀 Server ready at http://localhost:${PORT}${server.graphqlPath}`);
    connectDB();
  });
};

startServer();