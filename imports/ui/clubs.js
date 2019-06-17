import { Template } from 'meteor/templating';
import { Meteor } from 'meteor/meteor';
import { Teachers } from '../api/teachers.js';
import { ReactiveVar } from 'meteor/reactive-var';

import './office_hours.html';

Template.OH_show_page.onCreated(function bodyOnCreated() {
    Meteor.subscribe('teachers');
    this.filter = new ReactiveVar("");
});

Template.OH_show_page.helpers({
    teachers() {
        const filter = Template.instance().filter.get();
        if(!filter) {
            return Teachers.find({});
        } else {
            const filterRegex = new RegExp(`.*${filter}.*`, 'i');
            return Teachers.find({name: {$regex: filterRegex}});
        }
    }
});

Template.OH_show_page.events({
   'input .teacher_search'(event) {
       const target = event.target;
       Template.instance().filter.set(target.value);
   }
});


