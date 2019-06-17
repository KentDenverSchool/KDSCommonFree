import { Mongo } from 'meteor/mongo';
import {Meteor} from "meteor/meteor";

export const Teachers = new Mongo.Collection('teachers');

if (Meteor.isServer) {
    // This code only runs on the server
    Meteor.publish('teachers', function teachersPublication() {
        return Teachers.find();
    });
}

Meteor.methods({
    'teachers.insert'(name, url, note) {

        if (! Meteor.userId()) {
            throw new Meteor.Error('not-authorized');
        }

        Teachers.upsert({name: name}, {
            name:name,
            url:url,
            note:note
        });
    },
    'teachers.change'(id, field) {

    }
})