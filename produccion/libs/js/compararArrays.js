$.extend({
        compare: function (arrayA, arrayB) {
            if (arrayA.length != arrayB.length) { return false; }
            // sort modifies original array
            // (which are passed by reference to our method!)
            // so clone the arrays before sorting
            var a = $.extend(true, [], arrayA);
            var b = $.extend(true, [], arrayB);
            //a.sort(); 
            //b.sort();
            for (var i = 0, l = a.length; i < l; i++) {
                if (a[i] !== b[i]) { 
                    return false;
                }
            }
            return true;
        }
    });