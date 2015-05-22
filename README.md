# READ ME or NOT

---
This is a hight custom contextmenu directive, made for angular *(actually you can just cap the core code to anywhere you want)*.

**Require**

 - Bootstrap(for the best visual effect)
 - Fontawesome(if you need the font icons)
 - Angular(MUST)

----------

##Usage
(you sure you need this?)


At first, you need add the module name to your app:

    var app = angular.module('TopoApp', [
        'ui.bootstrap', // Notice: this directive's HTML DOM class relys on the bootstrap
        'ui.bootstrap.contextMenu'
    ]);

Second, you need put the options to your controller:

    $scope.menuOptions = {
      appender: $('body'), // maybe you can ignore it.
      items: [
        // your first option item
        {
          // text is must...i guess...
          text: 'hello world'
        },
    
        // a divider line.
        {
          text: '-',
          when: function () {
            // always visible.
            return true;
          }
        },
    
        // 
        {
          // it's fontawesome, but not include the 'fa-' stuff.
          icon: 'expand',
          text: 'last item',
          className: '',// you can add your own class name.
          click: function (event, itemScope) {
            // when you click this item.
            console.log('WTF! I have been clicked!!!');
          }
        }
      ]
    };

Remember, everything is optional.

----------

##Changelog
Nothing's changed yet.

----------

Write me an letter maybe: `math.lee@qq.com` or buy me a red bull(paypal): wod8@163.com .