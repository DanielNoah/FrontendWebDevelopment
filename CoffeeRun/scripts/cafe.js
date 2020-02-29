(function (window) {
    'use strict';
    // Code Will go here
    var App = window.App || {};

    function Cafe(cafeId, db) {
        this.cafeId = cafeId;
        this.db = db;
    }

    Cafe.prototype.createOrder = function(order) {
        console.log('Adding order for ' + order.emailAddress);
        return this.db.add(order.emailAddress, order);
    };

    Cafe.prototype.deliverOrder = function(customerId) {
        console.log('Delivering order for ' + customerId);
        return this.db.remove(customerId);
    };

    Cafe.prototype.printOrders = function() {
        var customerIdArray = Object.keys(this.db.getAll());

        console.log('Cafe #' + this.cafeId + ' has pending orders:');
        customerIdArray.forEach(function(id) {
            console.log(this.db.get(id));
        }.bind(this));
    };

    App.Cafe = Cafe;
    window.App = App;

})(window);