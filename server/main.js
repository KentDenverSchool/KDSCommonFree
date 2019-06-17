import { Meteor } from 'meteor/meteor';
import '../imports/api/events.js';
import '../imports/api/teachers.js';
import '../imports/api/clubs.js';
import {fetchEvents} from "../scripts/update_calendar";


Meteor.startup(() => {
  // code to run on server at startup
    setInterval(updateEvents, 30000);
});

function updateEvents() {
    fetchEvents((events) => {
        events.forEach((event) => {
            Meteor.call('events.server_upsert', event);
        });
    });
}
