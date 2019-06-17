import { Accounts } from 'meteor/accounts-base';
import { Meteor } from 'meteor/meteor';

Accounts.ui.config({requestPermissions: {
        google: [
            'https://www.googleapis.com/auth/userinfo.email',
            'https://www.googleapis.com/auth/userinfo.profile',
            'https://www.googleapis.com/auth/calendar',
            'https://www.googleapis.com/auth/calendar.events'
        ]
    },
    requestOfflineToken: {
        google: true
    },
    forceApprovalPrompt: {
        google: true
    },
    // requestOfflineToken: true,
    // forceApprovalPrompt: true,
});
