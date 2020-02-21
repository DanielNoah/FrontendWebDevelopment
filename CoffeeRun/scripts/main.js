(function(window) {
    'user strict';
    var FORM_SELECTOR = '[data-coffee-order="form"]';
    var App = window.App;
    var Cafe = App.Cafe;
    var DataStore = App.DataStore;
    var FormHandler = App.FormHandler;
    var myCafe = new Cafe('ncc-1801', new DataStore());
    window.myCafe = myCafe;   
    var formHandler = new FormHandler(FORM_SELECTOR);

    formHandler.addSubmitHandler(myCafe.createOrder.bind(myCafe));
    console.log(formHandler);
})(window);
