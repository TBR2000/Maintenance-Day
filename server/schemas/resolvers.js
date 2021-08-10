const { AuthenticationError } = require('apollo-server-express');
const { User, Assets, InstalledParts, Responses, Clients, Parts } = require('../models');
const { signToken } = require('../utils/auth');
const { getServers, getVavs } = require('../utils/querybuilder');

const resolvers = {
  Query: {
      // Find all assets and installed parts
      Assets: async () => {
        return await Assets.find({}).populate('InstalledParts').populate({
          path: 'InstalledParts'
        });
      },

      Asset: async (parent, { assetId }) => {
        return Assets.findOne({ _id: assetId });
      },

      // find all installed parts 
      InstalledParts: async () => {
          return await InstalledParts.find({});
      },
    
      //find all respones
      Responses: async () => {
      return await Responses.find({});
      },

      //find all clients
      Clients: async () => {
        return await Clients.find({})
      },

      //find all parts
      Parts: async () => {
        return await Parts.find({})
      },

      //find all Servers
      getServers: async (parent, {path}) => {
        //console.log(path)
       const servers = await getServers(path)
       //console.log('gql',servers)
       return servers
      },

      //find all vavs
      getVavs: async (parent, {path}) => {
        const vavs = await getVavs(path)
        //console.log(vavs)
        return vavs
      },

      getValues: async () => {
        await getVavs()
      }
  },  

  Mutation: {
    addUser: async (parent, { username, email, password }) => {
      console.log("resolver")
      const user = await User.create({ username, email, password });
      console.log("user", user)
      const token = signToken(user);
      return { token, user };
    },

    login: async (parent, { email, password }) => {
      console.log("login")
      const user = await User.findOne({ email });
      if (!user) {
        throw new AuthenticationError('No user found with this email address');
      }
      const correctPw = await user.isCorrectPassword(password);
      if (!correctPw) {
        throw new AuthenticationError('Incorrect credentials');
      }
      const token = signToken(user);
      return { token, user };
    },
    
    //Add a new asset
    addAsset: async (parent, {name, type, parts, month}) => {
      const asset = await Assets.create({name, type, parts, month});
      return asset
    },

    //Add a new part
    addParts: async (parent, {partname, partNum}) => {
      const part = await Parts.create({partname, partNum});
      return part
    },

    //Add a part to and asset
    addPartToAsset: async (parent, {partId, assetId}) => {
      return Assets.findOneAndUpdate(
        { _id: assetId },
        {
          $addToSet: { _id: partId },
        },
        {
          new: true,
          runValidators: true,
        }
      );
    },

    //Add a Question and Answer to an asset
    addResponse: async (parent, {question, answer, asset}) => {
      const assetQuestions = await Assets.create({question, answer, asset});
      return assetQuestions
    },

    //Delete and asset
    removeAsset: async (parent, {}) => {
      return Assets.findOneAndDelete({ _id: assetId });
    },

    removeResponse: async (parent, {}) => {
      return Response.findOneAndDelete({ _id: reponseId });
    },   
  },
};

module.exports = resolvers;
