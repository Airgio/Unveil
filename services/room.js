var _ = require('underscore');

module.exports = function(app){

    var model = function (data) {
        this.owner = data.owner;
        this.name = data.name;
        this.attendees = data.attendees;
        this.message = data.message;

        return this;
    };

    return {

        rooms : [],

        create : function(data){
            this.join(data.owner);

            var room = new model(data);
            app.room.rooms.push(room);
            //app.mailing.post(room);
            this.emit('created', room);
        },

        join : function(data){
            var room = _.find(app.room.rooms, function(r){ return r.attendees.indexOf(data.email) !== -1; });


            if(room){
                this.join(room.owner);
                room.attendees.splice(room.attendees.indexOf(data.email), 1);
            }

            this.emit('joined', room ? {success : true, room : room.name} : { success : false });

            // if(room.attendees.length === 0){
            //     app.socket.io.to(room.owner).emit('unveil', room);
            //     app.room.rooms.splice(app.room.rooms.indexOf(room),1);
            // }
 
            app.socket.io.to(room.owner).emit('added', room.attendees);

            if(room.attendees.length === 0){
                app.socket.io.to(room.owner).emit('unveil', room);
                app.room.rooms.splice(app.room.rooms.indexOf(room),1);
            }

        }
    }
}