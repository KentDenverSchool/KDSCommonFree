import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';
import { Meteor } from 'meteor/meteor';

export const Events = new Mongo.Collection('events');

if (Meteor.isServer) {
    // This code only runs on the server
    Meteor.publish('events', function eventsPublication() {
        return Events.find();
    });
}

// const Schema = {};
//
// Schema.Events = new SimpleSchema({
//    owner: {type: String},
//    title: {type:String},
//     start_time: {type:Date},
//     end_time: {type:Date},
//     description: {type: String}
// });
//
// Events.attachSchema(Schema.Events);

Meteor.methods({
    'events.insert'(title, start, end, description) {
        check(title, String);
        check(description, String);
        let start_time = new Date(start);
        let end_time = new Date(end);
        check(start_time, Date);
        check(end_time, Date);

        // Make sure the user is logged in before inserting a task
        if (! Meteor.userId()) {
            throw new Meteor.Error('not-authorized');
        }

        Events.insert({
            owner: Meteor.userId,
            title: title,
            start_time: start_time,
            end_time: end_time,
            description: description
        });
    },
    'events.fetch.google'() {
        listEvents(Meteor.user().services.google.email);
    },
    'events.server_upsert'(event) {
        Events.upsert({
           event_id: event.id
        }, {
            event_id: event.id,
            owner: "server",
            start: Date(event.start.dateTime),
            end: Date(event.end.dateTime),
            raw_event: event
        });
    }

});


function listEvents(email) {
    console.log(Meteor.user());
    // GoogleApi.get(`calendar/v3/calendars/${email}/events`, {maxResults: 20} , function(data) {
    //     console.log(data);
    // });
    let user = Meteor.user();
    GoogleApi.get('calendar/v3/calendars/primary/events', {
        user: user,
        params: {
            'calendarId': 'primary',
            'timeMin': new Date().toISOString(),
            // 'timeMax': new Date(new Date().setFullYear(new Date().getFullYear() + 1)).toISOString(),
            'showDeleted': false,
            'singleEvents': true,
            'orderBy': 'startTime',
            'access_type': 'offline'
        }
    }, function (error, result) {
        if (result && result.items && result.items.length > 0) {
            console.log(result.items.length);
        }
        if(error){
            console.error(error);
        }
    });
}