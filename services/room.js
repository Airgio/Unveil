module.exports = function(app){

    var model = function (data) {
        this.owner = data.owner;
        this.name = data.name;
        this.attendees = JSON.parse(data.attendees);
        this.message = data.message;

        return this;
    };

    return {
        rooms : [],

        create : function(data){
            this.join(data.owner);

            var room = new model(data);
            app.room.rooms.push(room);

            this.emit('created', room);
        },

        join : function(email){
            var room = _.find(app.room.rooms, function(r){ return r.attendees.indexOf(email) !== -1; });

            this.emit('joined', room);
        }


    }
}