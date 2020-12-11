'use strict';

/**
 * @ngdoc service
 * @name vasaApp.otherservice
 * @description
 * # otherservice
 * Service in the vasaApp.
 */
angular.module('vasaApp')
.filter('cut', function () {
   return function (value, wordwise, max, tail) {
      if (!value) return '';

      max = parseInt(max, 10);
      if (!max) return value;
      if (value.length <= max) return value;

      value = value.substr(0, max);
      if (wordwise) {
         var lastspace = value.lastIndexOf(' ');
         if (lastspace != -1) {
            if (value.charAt(lastspace-1) == '.' || value.charAt(lastspace-1) == ',') {
               lastspace = lastspace - 1;
            }
            value = value.substr(0, lastspace);
         }
      }

      return value + (tail || ' …');
   };
})
.filter("timeago", function () {
   return function (time, local, raw) {
      if (!time) return "never";

      if (!local) {
        (local = Date.now())
      }

      if (angular.isDate(time)) {
         time = time.getTime();
      } else if (typeof time === "string") {
         time = new Date(time).getTime();
      }

      if (angular.isDate(local)) {
         local = local.getTime();
      }else if (typeof local === "string") {
         local = new Date(local).getTime();
      }

      if (typeof time !== 'number' || typeof local !== 'number') {
         return;
      }

      var
         offset = Math.abs((local - time) / 1000),
         span = [],
         MINUTE = 60,
         HOUR = 3600,
         DAY = 86400,
         WEEK = 604800,
         MONTH = 2629744,
         YEAR = 31556926,
         DECADE = 315569260;
      if (offset < MINUTE)               span = [ '', raw ? 'hari ini' : 'kurang dari satu menit' ];
      else if (offset < (MINUTE * 60))   span = [ Math.round(Math.abs(offset / MINUTE)), 'menit' ];
      else if (offset < (HOUR * 24))     span = [ Math.round(Math.abs(offset / HOUR)), 'jam' ];
      else if (offset < (DAY * 7))       span = [ Math.round(Math.abs(offset / DAY)), 'hari' ];
      else if (offset < (WEEK * 52))     span = [ Math.round(Math.abs(offset / WEEK)), 'minggu' ];
      else if (offset < (YEAR * 10))     span = [ Math.round(Math.abs(offset / YEAR)), 'tahun' ];
      else if (offset < (DECADE * 100))  span = [ Math.round(Math.abs(offset / DECADE)), 'dekade' ];
      else                               span = [ '', '0' ];

      span[1] += (span[0] === 0 || span[0] > 1) ? '' : '';
      span = span.join(' ');

      if (raw === true) {
         return span;
      }
      return (time <= local) ? span + ' yang lalu' : '' + span;

      /*if (offset <= MINUTE)              span = [ '', raw ? 'now' : 'less than a minute' ];
      else if (offset < (MINUTE * 60))   span = [ Math.round(Math.abs(offset / MINUTE)), 'min' ];
      else if (offset < (HOUR * 24))     span = [ Math.round(Math.abs(offset / HOUR)), 'hr' ];
      else if (offset < (DAY * 7))       span = [ Math.round(Math.abs(offset / DAY)), 'day' ];
      else if (offset < (WEEK * 52))     span = [ Math.round(Math.abs(offset / WEEK)), 'week' ];
      else if (offset < (YEAR * 10))     span = [ Math.round(Math.abs(offset / YEAR)), 'year' ];
      else if (offset < (DECADE * 100))  span = [ Math.round(Math.abs(offset / DECADE)), 'decade' ];
      else                               span = [ '', 'a long time' ];

      span[1] += (span[0] === 0 || span[0] > 1) ? 's' : '';
      span = span.join(' ');

      if (raw === true) {
          return span;
      }
      return (time <= local) ? span + ' ago' : 'in ' + span;*/
   }
})
.filter('formatCurr', ['$filter', function($filter) {
    return function(input) {
       	input = parseFloat(input);
        input = input.toFixed(input % 1 === 0 ? 0 : 4);
        var str = '' + input.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
		var res = str.split(".");
		var value = "";
		if(res.length===2){
			var mystring = res[1];
			var res2 = mystring.replace(",", "");
			value = res[0]+'.'+res2;
		}else{
			value = str;
		}
        return value;
    };
}]);

