/*
在这个拓展后的节流函数升级版，我们可以设置第三个参数，即必然触发执行的时间间隔。如果用下面的方法调用
window.onresize = throttleV2(myFunc, 50, 100);
则意味着，50ms的间隔内连续触发的调用，后一个调用会把前一个调用的等待处理掉，但每隔100ms至少执行一次。原理也很简单，打时间tag，
一开始记录第一次调用的时间戳，然后每次调用函数都去拿最新的时间跟记录时间比，超出给定的时间就执行一次，更新记录时间。
*/

var throttleV2 = function(fn, delay, mustRunDelay){
    var timer = null;
    var t_start;
    return function(){
        var context = this, args = arguments, t_curr = +new Date();
        clearTimeout(timer);
        if(!t_start){
            t_start = t_curr;
        }
        if(t_curr - t_start >= mustRunDelay){
            fn.apply(context, args);
            t_start = t_curr;
        }
        else {
            timer = setTimeout(function(){
                fn.apply(context, args);
            }, delay);
        }
    };
};


window.onresize = throttleV2(myFunc, 50, 100);
