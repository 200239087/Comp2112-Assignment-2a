var app = new Vue({
    el: '#app',
    mounted: function() {
        fetch("https://my.api.mockaroo.com/emails.json?key=e16d8bd0")
        .then(res => res.json())
        .then(emails => {
            this.emails = emails;
            this.selectedEmail = this.emails[0];
            console.log(emails[0].name);
        })
        .catch(err => console.log(err));
    },

    data: {
        emails: [],
        selectedEmail: "",
        view: "index"
    },

    methods: {

        // getPic: function(emailObj) {
        //     return emailObj.picture.thumbnail;
        // },
      
        // getAlt(emailObj) {
        //   return `${emailObj.name.first} ${emailObj.name.last}'s avatar`;
        // },

        clickedEmail: function(emailObj) {
            this.selectedEmail = emailObj;
        },

        isSelected: function(emailObj) {
            return emailObj == this.selectedEmail;
        },

        incomingEmail() {
            fetch("https://my.api.mockaroo.com/emails.json?key=01c118d0")
            .then(res => res.json())
            .then(emails => {
                this.emails.unshift(emails[0]);
            })
            .catch(err => console.log(err));
        },

        currentView() {
            switch (this.view) {
              case "inbox":
                return this.emails.filter(email => !email.deleted);
                break;
              case "trash":
                return this.emails.filter(email => email.deleted);
                break;
            }
        },

        setView(clickedView) {
            this.view = clickedView;
        },

        deleteEmail() {
            this.$set(this.selectedEmail, "deleted", true);
        }
    }
});