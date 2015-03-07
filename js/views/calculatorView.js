define(
    ['jquery', 'underscore', 'backbone'],
    function($, _, Backbone) {
        var calculatorView = Backbone.View.extend({
            el: '#wrapper',
            events: {
                'click button': 'buttonClicked'
            },
            buttonClicked: function(e) {
                var val = this.$('#screen').val();
                var operators = ['/', '*', '-', '+'];
                var opsWithoutMinus = ['/', '*', '+'];
                if (e.target.id !== '=') {
                    this.$('#screen').val(val + e.target.id);
                    var val = this.$('#screen').val();
                    if ((operators.indexOf(val[val.length - 2]) >= 0 && opsWithoutMinus.indexOf(val[val.length - 1]) >= 0) ||
                        (val[0] === '-' && val[1] === '-')) {
                        this.$('#screen').val('');
                    }
                }
                if (e.target.id == 'C') {
                    this.$('#screen').val('')
                }
                if (e.target.id == '=') {
                    var val = this.$('#screen').val();
                    var resultArr = val.split('');
                    for (var i = 1; i < resultArr.length; i++) {
                        if (resultArr[i] == '-' && resultArr[i+1] == '-') { //this block allows negative numbers to be subtracted. (Two minus signs in a row.)
                            resultArr.splice(i + 1, 0, '(');
                            for (var j = i + 3; j < resultArr.length; j++) {
                                if (resultArr[j] == '/' || resultArr[j] == '*' || resultArr[j] == '-' ||
                                    resultArr[j] == '+' || (j == resultArr.length - 1)) {
                                    resultArr.splice(j + 1, 0, ')');
                                    break;
                                }
                            }
                        }
                    }
                    val = resultArr.join('');
                    try {
                        var result = eval(val);
                        this.$('#screen').val(result);
                    } catch (e) {
                        this.$('#screen').val('');
                    }
                }
            }
        })
        return calculatorView;
    }
)
