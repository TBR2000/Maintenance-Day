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
      // First we create the user
      const user = await User.create({ username, email, password });
      // To reduce friction for the user, we immediately sign a JSON Web Token and log the user in after they are created
      const token = signToken(user);
      // Return an `Auth` object that consists of the signed token and user's information
      return { token, user };
    },
    login: async (parent, { email, password }) => {
      // Look up the user by the provided email address. Since the `email` field is unique, we know that only one person will exist with that email
      const user = await User.findOne({ email });

      // If there is no user with that email address, return an Authentication error stating so
      if (!user) {
        throw new AuthenticationError('No user found with this email address');
      }

      // If there is a user found, execute the `isCorrectPassword` instance method and check if the correct password was provided
      const correctPw = await user.isCorrectPassword(password);

      // If the password is incorrect, return an Authentication error stating so
      if (!correctPw) {
        throw new AuthenticationError('Incorrect credentials');
      }

      // If email and password are correct, sign user into the application with a JWT
      const token = signToken(user);

      // Return an `Auth` object that consists of the signed token and user's information
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

    getAllServers: async (parent, {path}) => {
      const servers = await getServers(path);
      console.log(servers)
      return servers
    },

    getTodaysVavs: async (parent, {response}) => {
      const vavs = await GetVavs.create({response});
      return vavs
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
