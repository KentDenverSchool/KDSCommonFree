import { Template } from 'meteor/templating';
import {Events} from "../api/events.js";
import {Meteor} from "meteor/meteor";
import {ReactiveVar} from "meteor/reactive-var";



import './home.html';
import './event.html';


Template.Home_show_page.onCreated(function bodyOnCreated() {
    Meteor.subscribe('events');
    this.num_events = new ReactiveVar(20);

});

Template.Home_show_page.helpers({
    events_today() {
        today_start = moment().startOf('day');
        today_end = moment().endOf('day');
        const num_events = Template.instance().num_events.get();
        return events = Events.find({owner: "server", start: {
                $gte: today_start.toISOString(),
                $lte: today_start.toISOString()
            }}, {limit: num_events});
    },
    events_later() {
        const num_events = Template.instance().num_events.get();
        return events = Events.find({owner: "server"}, {limit: num_events});
    }
});