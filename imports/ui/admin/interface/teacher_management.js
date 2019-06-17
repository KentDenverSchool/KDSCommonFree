import { Template } from 'meteor/templating';
import { Meteor } from 'meteor/meteor';
import { Teachers } from '../../../api/teachers.js';

import './teacher_management.html';

Template.Teacher_mgmt_page.onCreated(function bodyOnCreated() {
    Meteor.subscribe('teachers');
});

Template.Teacher_mgmt_page.helpers({
    teachers() {
        return Teachers.find({});
    }
});

Template.Teacher_mgmt_page.events({
    'submit .new-teacher'(event) {
        event.preventDefault();

        const target = event.target;
        console.log(target);
        const name = target.name.value;
        const url = target.url.value;
        const note = target.note.value;

        Meteor.call('teachers.insert', name, url, note);
    },
    'change .teacher-field'(event) {
        const target = event.target;
        const id = target.parentNode.id;
        const field = target.name;
        console.log(target);
        console.log(id);
        console.log(field);
        //Meteor.call('teachers.update')
    }
});