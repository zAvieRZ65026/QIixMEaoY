// 代码生成时间: 2025-10-12 21:23:01
const { ApolloServer, gql } = require('apollo-server');
const { NuxtAxios } = require('@nuxtjs/axios');

// Define the type definitions for the GraphQL schema
const typeDefs = gql"""
  type Campaign {
    id: ID!
    name: String!
    description: String
    startDate: String
    endDate: String
  }

  type Query {
    getCampaigns: [Campaign]
    getCampaignById(id: ID!): Campaign
  }

  type Mutation {
    addCampaign(name: String!, description: String, startDate: String, endDate: String): Campaign
    updateCampaign(id: ID!, name: String, description: String, startDate: String, endDate: String): Campaign
    deleteCampaign(id: ID!): Boolean
  }
""";

// Mock data for campaigns
const campaigns = [
  { id: '1', name: 'Winter Sale', description: 'Holiday sale', startDate: '2023-12-01', endDate: '2024-01-01' },
  // Add more mock campaigns as needed
];

// Resolvers define the technique for fetching the types in the schema
const resolvers = {
  Query: {
    getCampaigns: () => campaigns,
    getCampaignById: (_, { id }) => campaigns.find(campaign => campaign.id === id),
  },
  Mutation: {
    addCampaign: (_, { name, description, startDate, endDate }) => {
      // Error handling for missing fields
      if (!name) {
        throw new Error('Name is required for a campaign');
      }
      // Create and return a new campaign object with a unique ID
      const newCampaign = {
        id: Date.now().toString(),
        name,
        description,
        startDate,
        endDate,
      };
      campaigns.push(newCampaign);
      return newCampaign;
    },
    updateCampaign: (_, { id, name, description, startDate, endDate }) => {
      // Find the campaign to update and return if not found
      const campaign = campaigns.find(c => c.id === id);
      if (!campaign) {
        throw new Error('Campaign not found');
      }
      // Update fields if provided
      const updatedCampaign = {
        ...campaign,
        name: name || campaign.name,
        description: description || campaign.description,
        startDate: startDate || campaign.startDate,
        endDate: endDate || campaign.endDate,
      };
      // Replace old campaign with updated one
      const index = campaigns.indexOf(campaign);
      campaigns[index] = updatedCampaign;
      return updatedCampaign;
    },
    deleteCampaign: (_, { id }) => {
      const originalLength = campaigns.length;
      campaigns = campaigns.filter(c => c.id !== id);
      return campaigns.length < originalLength;
    },
  },
};

// Set up Apollo Server with the GraphQL schema and resolvers
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => {
    // Here you can extract the user from the request
    // and provide it to every resolver in the context object.
    return {
      headers: req.headers,
      // user: req.user, // Uncomment and provide user authentication if needed.
    };
  },
});

// Start the server and listen on a port
async function startApolloServer() {
  try {
    await server.listen({
      port: 4000,
    });
    console.log('🚀 Server ready at http://localhost:4000/');
  } catch (error) {
    console.error('Error starting the server: ', error);
  }
}

// Run the server
startApolloServer();