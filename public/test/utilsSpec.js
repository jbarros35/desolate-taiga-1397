/**
 * Created by jose on 7/12/2015.
 */
/*global module, inject */

define(['utils/utils', 'angularMocks',], function(app) {
    'use strict';
    describe('Directive: myMaxlength', function () {
        var element, scope;

        beforeEach(module('myapp.utils'));

        beforeEach(inject(function($rootScope, $compile) {
            element = angular.element('<textarea class="form-control vresize" rows="5" ' +
                'placeholder="Update your status" ng-model="description" required my-maxlength="1024">{{text}}</textarea>');

            scope = $rootScope;

            scope.text = 'Memoirs of the Elephant Man';
            scope.text = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. In sapien nibh, finibus et ' +
                'dignissim quis, congue at sapien. Nunc luctus nulla vehicula, commodo elit et, fringilla libero. ' +
                'Sed at turpis eget purus congue rhoncus et sed mi. Maecenas ipsum libero, tristique consequat consectetur ' +
                'sit amet, lobortis in ipsum. Nam tincidunt semper lectus ut sodales. Pellentesque imperdiet ' +
                'ante libero, eu volutpat mauris ultricies id. Sed cursus, risus a pulvinar eleifend, ' +
                'nisi nisi semper elit, sit amet lobortis ex mi non metus. Nullam ex libero, viverra in mauris id, ' +
                'vestibulum vulputate neque. Morbi in sem malesuada turpis tincidunt eleifend. In elit ligula, ' +
                'aliquam et lorem quis, aliquet blandit justo. Proin nec diam eget ipsum fringilla ornare eu a nulla. ' +
                'Morbi vel eleifend nisi. Vivamus pretium egestas tortor, ut fermentum ex porttitor at. ' +
                'Vestibulum venenatis arcu ut leo posuere, non placerat sapien molestie. Lorem ipsum dolor sit amet, ' +
                'consectetur adipiscing elit. Fusce arcu diam, condimentum non bibendum non, gravvida imperdiet sem. ' +
                'Donec sed convallis nunc. Proin dictum et metus eget vulputate. Suspendisse massa purus, condimentum ' +
                'eu elit non, iaculis eleifend sapien. Aliquam erat volutpat. Pellentesque habitant morbi tristique senectus ' +
                'et netus et malesuada fames ac turpis egestas. Nunc vestibulum consequat porta. Maecenas ut rutrum ante, ' +
                'non blandit nunc. Donec a leo et velit congue finibus. Morbi nec feugiat lacus. Nullam cursus, nunc id ' +
                'porttitor placerat, ex ante aliquet elit, sit amet gravida mauris velit et mi. Praesent aliquam convallis ' +
                'dui, non euismod arcu sagittis ac. Nam maximus sagittis lorem, eget auctor odio rhoncus a. Integer vehicula ' +
                'mollis dolor quis vehicula. Ut tempor ac orci faucibus lacinia. Aliquam fringilla elementum dolor in facilisis. ' +
                'Ut euismod massa sed purus tempus bibendum.';
            $compile(element)(scope);
            scope.$digest();
        }));

        it("test if its not greater than maxlength", function() {
            var text = element.find('textarea');
            //console.log(element[0].attributes['my-maxlength'].value);
            //console.log(scope.text.length);
            expect(scope.text.length >= element[0].attributes['my-maxlength'].value).toBeTruthy();
        });

    });

});
