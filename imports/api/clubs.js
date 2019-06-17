import { Mongo } from 'meteor/mongo';
import {Meteor} from "meteor/meteor";

export const Clubs = new Mongo.Collection('clubs');

if (Meteor.isServer) {
    Meteor.publish('clubs', function clubsPublication() {
        return Clubs.find();
    });
}
//
// Clubs.schema = new SimpleSchema({
//     owner: {type: String},
//     title: {type:String},
//     description: {type:String},
//     url: {type:String},
// });
//
// Clubs.attachSchema(Clubs.schema);

Meteor.methods({
    'clubs.insert'(name, url, note) {

        if (! Meteor.userId()) {
            throw new Meteor.Error('not-authorized');
        }

        Clubs.upsert({name: name}, {
            name:name,
            url:url,
            note:note
        });
    },
    'clubs.change'(id, field) {

    }
})