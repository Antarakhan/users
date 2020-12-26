const graphql = require('graphql');
const {GraphQLObjectType,
    GraphQLString,
    GraphQLInt,
    GraphQLSchema
} = graphql;
const _ = require('lodash');

const user = [
    {id: '23', firstName:'Bill', age: 20},
    {id: '47', firstName:'Samantha', age: 21}
]


const UserType = new GraphQLObjectType({
    name: "User",
    fields:{
        id: { type: GraphQLString},
        firstName: { type: GraphQLString},
        age: { type: GraphQLInt}
    }
});

//Given the id, the UserType is returned
//Resolve: actually get the real data from DB. args: the id passed earlier
const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields:{
        user: {
            type: UserType,
            args: {id: {type: GraphQLString}},
            resolve(parentValue, args){
                return _.find(user, {id: args.id});
            }
        }
    }
});

module.exports = new GraphQLSchema({
    query:RootQuery
});