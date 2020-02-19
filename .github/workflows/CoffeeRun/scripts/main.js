(function(window) {
    'user strict';
    var App = window.App;
    var Cafe = App.Cafe;
    var DataStore = App.DataStore;
    var myCafe = new Cafe('ncc-1801', new DataStore());
    window.myCafe = myCafe;    
})(window);
