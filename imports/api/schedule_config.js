import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';
import { Meteor } from 'meteor/meteor';
import {Days} from "./days";

export const ScheduleConfig = new Mongo.Collection('schedule_config');

if (Meteor.isServer) {
    // This code only runs on the server
    Meteor.publish('schedule_config', function daysPub() {
        return ScheduleConfig.find();
    });
}


Meteor.methods({
    'schedule_config.update'(start, end) {
        let start_date = new Date(start);
        let end_date = new Date(end);
        check(start_date, Date);
        check(end_date, Date);

        // Make sure the user is logged in before inserting a task
        if (! Meteor.userId()) {
            throw new Meteor.Error('not-authorized');
        }

        ScheduleConfig.upsert({
            start_date: start_date,
            end_date: end_date,
        });
    },
    'schedule_config.remove_day'(date) {

    },
    'schedule_config.add_day'(date) {

    },
    'schedule_config.rebuild'() {

    },
});