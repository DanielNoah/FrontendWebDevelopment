(function(window) {
    'use strict';

    var App = window.App || {};
    var $ = window.jQuery;

    function CheckList(selector) {
        if (!selector) {
            throw new Error('No selector provided');
        }

        this.$element = $(selector);
        if (this.$element.length === 0) {
            throw new Error('Could not find element with selector: ' + selector);
        }
    }

    CheckList.prototype.addRow = function(coffeeOrder) {
        // Create a new instance of a row, using the coffee order info.
        var rowElement = new Row(coffeeOrder);

        // Add the new row instance's $element property to the checklist
        this.$element.append(rowElement.$element);
    };

    function Row(coffeeOrder) {
        var $div = $('<div></div>', {
            'data-coffee-order': 'checkbox',
            'class': 'checkbox'
        });

        var $label = $('<label></label>');

        var $checkbox = $('<input></input>', {
            type: 'checkbox',
            value: coffeeOrder.emailAddress
        });

        var description = coffeeOrder.size + ' ';
        if (coffeeOrder.flavor) {
            description += coffeeOrder.flavor + ' ';
        }

        description += coffeeOrder.coffee + ', ';
        description += ' (' + coffeeOrder.emailAddress + ')';
        description += ' [' + coffeeOrder.strength + 'x]';
        
        $label.append($checkbox); // $checkbox를 $label에 붙인다.
        $label.append(description); // description을 $label에 붙인다.
        $div.append($label); // $lable을 $div에 붙인다.

        this.$element = $div; // 하위트리를 this.$element에 할당하여 인스턴스의 속성처럼 사용 가능
    }                         // 왜냐하면 Row함수는 생성자이므로 전달받은 coffeeOrder 데이터를 사용하여 위의 붙이고 붙인 하위
                              // 트리를 반환할 수 없기 때문에(생성자에서는 return 명령문으로 값을 반환해서는 안된다. 자바스크립트
                              // 에서는 new 키워드로 생성자가 호출될 때 자동으로 값을 반환한다), 위와 같이 자기자신을 가리키는 this
                              // 키워드를 통해 $element 변수에 $div(체크박스 모듈)를 할당해서 인스턴스의 속성처럼 사용하게 한다. 
                              // $element라는 이름은 단지 다른 생성자에서 사용했던 관습일 뿐, 특별한 의미는 없다.
    
    App.CheckList = CheckList;
    window.App = App;
})(window);