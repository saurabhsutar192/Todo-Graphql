const graphql = require("graphql");
const Todo = require("../models/todo");

const User = require("../models/user");

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLSchema,
  GraphQLID,
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull,
} = graphql;

const delType = new GraphQLObjectType({
  name: "delType",
  fields: () => ({
    deletedCount: { type: GraphQLInt },
  }),
});

const todoType = new GraphQLObjectType({
  name: "Todo",
  fields: () => ({
    id: { type: GraphQLID },
    todo: { type: GraphQLString },
    userId: { type: GraphQLString },
    user: {
      type: userType,
      resolve(parent, args) {
        return User.findById(parent.userId);
      },
    },
  }),
});
const userType = new GraphQLObjectType({
  name: "User",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    todos: {
      type: new GraphQLList(todoType),
      resolve(parent, args) {
        return Todo.find({ userId: parent.id });
      },
    },
  }),
});

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    todo: {
      type: todoType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return Todo.findById(args.id);
      },
    },

    todos: {
      type: new GraphQLList(todoType),
      args: { userId: { type: GraphQLString } },
      resolve(parent, args) {
        if (args.userId) {
          return Todo.find({ userId: args.userId });
        } else {
          return Todo.find({});
        }
      },
    },
    user: {
      type: userType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return User.findById(args.id);
      },
    },

    users: {
      type: new GraphQLList(userType),
      resolve(parent, args) {
        return User.find({});
      },
    },
  },
});

const Mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    addTodo: {
      type: todoType,
      args: {
        todo: { type: new GraphQLNonNull(GraphQLString) },
        userId: { type: new GraphQLNonNull(GraphQLString) },
      },
      resolve(parent, args) {
        let todo = new Todo({
          todo: args.todo,
          userId: args.userId,
        });
        return todo.save();
      },
    },
    deleteTodo: {
      type: todoType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) },
      },
      resolve(parent, args) {
        return Todo.deleteOne({ _id: args.id });
      },
    },
    deleteTodos: {
      type: delType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) },
      },
      resolve(parent, args) {
        return Todo.deleteMany({ userId: args.id });
      },
    },
    updateTodo: {
      type: todoType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) },
        todo: { type: new GraphQLNonNull(GraphQLString) },
      },
      resolve(parent, args) {
        return Todo.updateOne({ _id: args.id }, { todo: args.todo });
      },
    },
    addUser: {
      type: userType,
      args: {
        name: { type: new GraphQLNonNull(GraphQLString) },
      },
      resolve(parent, args) {
        let user = new User({
          name: args.name,
        });
        return user.save();
      },
    },
    deleteUser: {
      type: userType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) },
      },
      resolve(parent, args) {
        return User.deleteOne({ _id: args.id });
      },
    },
  },
});

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation,
});
