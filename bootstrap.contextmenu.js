// HTML class style relys on bootstrap
define(function (require, exports, module) {
    angular.module('ui.bootstrap.contextMenu', [])

    .directive('contextMenu', [function () {

        return {
            restrict: 'A',
            link: function (scope, element, attr) {
                function renderer (e) {                    
                    var $body = $('body'),
                        $window = $(window);

                    var defaultOptions = {
                        appender: $body,
                        items: []
                    };

                    $body.on('keyup', function (event) {
                        if (event.keyCode == 27) {
                            $menu.remove();
                        }
                    });

                    $.extend(true, defaultOptions, scope.$eval(attr.contextMenu));

                    // 显示菜单
                    var $ul = $('<ul />', {
                        class: 'context-menu-dropdown dropdown-menu',
                        role: 'menu'
                    })
                    .css({
                        display: 'block',
                        left: e.pageX + 'px',
                        top: e.pageY + 'px'
                    });

                    angular.forEach(defaultOptions.items, function (item, index) {

                        var shouldShow = function (when) {
                            if (typeof when === 'function') {
                                return when();
                            }

                            if (typeof when === 'boolean') {
                                return when;
                            }

                            return true;
                        };
                        
                        if (shouldShow(item.when)) {
                            var $$li = function () {
                                $('<li class="divider" />').appendTo($ul);
                            };

                            if (item == '-') {
                                $$li();
                            }

                            if (typeof item === 'object') {
                                if (item.text === '-') {
                                    $$li();
                                } else {
                                    var classList = [
                                        'fa',
                                        'fa-fw',
                                        'fa-' + item.icon
                                    ];

                                    var icon = item.icon ? '<i class="' + classList.join(' ') + '"></i>' : '';

                                    $('<li />').append($('<a />', {
                                        class: item.className,
                                        tabindex: index,
                                        href: 'javascript:;',
                                        html: icon + item.text
                                    })).on('click', function (event) {
                                        event.preventDefault();
                                        item.click.call(event, event, scope);
                                        $ul.remove();
                                    }).appendTo($ul);                                  
                                }
                            }
                        }
                        
                    });

                    $('.dropdown-menu').remove();

                    $ul.appendTo(defaultOptions.appender);

                    element.on('click', function (event) {
                        event.stopPropagation();

                        $ul.remove();
                    });
                }

                element.on('contextmenu', function (event) {
                    event.preventDefault();

                    renderer(event);
                });
            }
        };
    }]);
});