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

    CheckList.prototype.addClickHandler = function(fn) {
        this.$element.on('click', 'input', function(event) {
            var email = event.target.value;
            this.removeRow(email);
            fn(email);
        }.bind(this));
    };

    CheckList.prototype.addRow = function(coffeeOrder) {
        // Remove any existing rows that match the email address
        this.removeRow(coffeeOrder.emailAddress);

        // Create a new instance of a row, using the coffee order info.
        var rowElement = new Row(coffeeOrder);

        // Add the new row instance's $element property to the checklist
        this.$element.append(rowElement.$element);
    };

    CheckList.prototype.removeRow = function (email) {
        this.$element
            .find('[value="' + email + '"]') // 해당되는 엘리먼트를 찾았을 때(row에 속하는 모든 엘리먼트를 감싸는 <div>임.)
            .closest('[data-coffee-order="checkbox"]') // [data-coffee-order="checkbox"]를 찾을 때까지 상위 DOM을 탐색함.
            .remove(); // DOM에서 엘리먼트를 제거하고, 그 DOM 하위 트리의 엘리먼트에 연결된 모든 이벤트 리스너를 정리함.
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
    }                         // 왜냐하면 Row함수는 생성자이므로 전달받은 coffeeOrder 데이터를 사용하여 위에서 붙이고 붙인 하위
                              // 트리(DOM 객체)를 반환할 수 없기 때문에(생성자에서는 return 명령문으로 값을 반환해서는 안된다. 자바스크립트
                              // 에서는 new 키워드로 생성자가 호출될 때 자동으로 값을 반환한다), 위와 같이 자기자신을 가리키는 this
                              // 키워드를 통해 $element 변수에 $div(체크박스 모듈)를 할당해서 인스턴스의 속성처럼 사용하게 한다. 
                              // $element라는 이름은 단지 다른 생성자에서 사용했던 관습일 뿐, 특별한 의미는 없다.
    
    App.CheckList = CheckList;
    window.App = App;
})(window);