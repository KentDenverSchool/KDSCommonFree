import { Template } from 'meteor/templating';
import { Meteor } from 'meteor/meteor';
import { Clubs } from '../api/clubs.js';
import { ReactiveVar } from 'meteor/reactive-var';

import './office_hours.html';

Template.Clubs_show_page.onCreated(function bodyOnCreated() {
    Meteor.subscribe('clubs');
    this.filter = new ReactiveVar("");
});

Template.Clubs_show_page.helpers({
    clubs() {
        const filter = Template.instance().filter.get();
        if(!filter) {
            return Clubs.find({});
        } else {
            const filterRegex = new RegExp(`.*${filter}.*`, 'i');
            return Teachers.find({name: {$regex: filterRegex}});
        }
    }
});

Template.Clubs_show_page.events({
   'input .teacher_search'(event) {
       const target = event.target;
       Template.instance().filter.set(target.value);
   }
});


