FlowRouter.route('/', {
    name: 'Home',
    action() {
        BlazeLayout.render("App_body", {main: 'Home_show_page'});
    }
});


FlowRouter.route('/office_hours', {
    name: 'Office hours',
    action() {
        BlazeLayout.render("App_body", {main: 'OH_show_page'});
    }
});


FlowRouter.route('/submit', {
    name: 'Schedule an event',
    action() {
        BlazeLayout.render("App_body", {main: 'Submit_show_page'});
    }
});


FlowRouter.route('/cal', {
    name: 'Calendar',
    action() {
        BlazeLayout.render("App_body", {main: 'Sync_show_page'});
    }
});

FlowRouter.route('/admin/teachers', {
    name: 'Manage Teachers',
    action() {
        BlazeLayout.render("App_body", {main: 'Teacher_mgmt_page'});
    }
});

