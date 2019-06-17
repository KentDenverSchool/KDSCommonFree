import { Template } from 'meteor/templating';
import { Meteor } from 'meteor/meteor';
import { Events } from '../api/events.js';

import './cal_sync.html';
//import './event.html';

Template.Sync_show_page.onCreated(function bodyOnCreated() {
    Meteor.subscribe('events');
});


Template.Sync_show_page.helpers({
    cal_events() {
        return Events.find({});
    }
});

Template.Sync_show_page.events({
    'submit .new-event'(event) {
        event.preventDefault();

        const target = event.target;
        const title = target.title.value;
        const start = target.start_time.value;
        const end = target.end_time.value;
        const description = target.description.value;

        Meteor.call('events.insert', title, start, end, description);
    },
    'click .get_events_button'(event) {
        Meteor.call('events.fetch.google');
    }
});