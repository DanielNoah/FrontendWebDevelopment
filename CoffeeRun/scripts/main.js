(function(window) {
    'user strict';
    var FORM_SELECTOR = '[data-coffee-order="form"]';
    var CHECKLIST_SELECTOR = '[data-coffee-order="checklist"]';
    var SERVER_URL = "http://coffeerun-v2-rest-api.herokuapp.com/api/coffeeorders";
    var App = window.App;
    var Cafe = App.Cafe;
    var DataStore = App.DataStore;
    var RemoteDataStore = App.RemoteDataStore;
    var FormHandler = App.FormHandler;
    var Validation = App.Validation;
    var CheckList = App.CheckList;
    var remoteDS = new RemoteDataStore(SERVER_URL);
    var webshim = window.webshim;
    var myCafe = new Cafe('ncc-1801', remoteDS);
    window.myCafe = myCafe;   
    // 여기서부터 폼(사용자 주문 정보)을 제출할 때 실행될 두 콜백(CheckList와 FormHandler)을 등록하는 코드인데,
    var checkList = new CheckList(CHECKLIST_SELECTOR);
    checkList.addClickHandler(myCafe.deliveryOrder.bind(myCafe));
    var formHandler = new FormHandler(FORM_SELECTOR);
/*  formHandler.addSubmitHandler(myCafe.createOrder.bind(myCafe)); 첫 submit 핸들러(myCafe.createOrder)가 호출된 후, 폼은 초기화 됨. 
    formHandler.addSubmitHandler(checkList.addRow.bind(checkList)); 두 번째 submit 핸들러(checkList.addRow)가 호출될 때, 폼에는 더 이상 남아있는
                                                                    정보가 없으므로(이미 호출되어었기 때문에), 결과적으로 DataStore에 추가되지만, 
                                                                    페이지의 체크리스트 박스에는 추가되지 않는다. */
    formHandler.addSubmitHandler(function (data) {
                                    myCafe.createOrder.call(myCafe, data); // 위의 문제점을 처리하기 위해 formHandler.addSubmitHandler에 하나의
                                    checkList.addRow.call(checkList, data); // 익명함수(function)를 전달하고 익명 함수에서 위의 두 submit 핸들러
                                }); // 모두를 호출하게 하였다. 각각의 메서드를 특정 인스턴스로            
                                
                                formHandler.addInputHandler(Validation.isCompanyEmail);

                               /* webshim.polyfill('forms forms-ext'); 
                                webshim.setOptions('forms', { addValidators: true, lazyCustomeMessages: true }); */ // Safari polyfill 기능 사용 시 + webshim/polyfiller.js 편집해야함.
                                
})(window);                                                                 //
