(function(window) {
    'user strict';
    var FORM_SELECTOR = '[data-coffee-order="form"]';
    var CHECKLIST_SELECTOR = '[data-coffee-order="checklist"]';
    var App = window.App;
    var Cafe = App.Cafe;
    var DataStore = App.DataStore;
    var FormHandler = App.FormHandler;
    var CheckList = App.CheckList;
    var myCafe = new Cafe('ncc-1801', new DataStore());
    window.myCafe = myCafe;   
    var checkList = new CheckList(CHECKLIST_SELECTOR);
    var formHandler = new FormHandler(FORM_SELECTOR);

    formHandler.addSubmitHandler(function (data) {
                                    myCafe.createOrder.call(myCafe, data);
                                    checkList.addRow.call(checkList, data);
                                });
})(window);
