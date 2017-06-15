var loadingFn = function () {
    var ary = ['arrow-left.png', 'arrow-right.png', 'bg.png', 'coin.jpg', 'cube1.png', 'cube2.png', 'cube3.png', 'cube4.png', 'cube5.png', 'cube6.png', 'cubeBg.jpg', 'cubeTip.png', 'head.jpg', 'keyboard.png', 'keyboard-btn.png', 'return.png', 'js.jpg','skill.png','skill1.png','skill2.png','skill3.png','skill4.png','skill5.png','skill6.png','skill7.png','product.jpg','MainCard_Logo.png','gift_down_pic.jpg','mainpic_shoutou.png','top_logo.png','menu-icon.png','me.jpg','info.png','judge.png','concatPhone.png'];
    var $loading = $('.loading');
    var $progressBar = $('.progress-bar');
    var num = 0;
    $.each(ary, function (index, item) {
        var reg = /\.([a-zA-Z1-9]+)/i;
        //debugger;
        var type = reg.exec(item)[1];
        if (type == 'mp3') {
            var oAudio = new Audio;
            oAudio.src = 'audio/' + item;
            oAudio.onLoadedMetadata = load;
        } else {
            var oImg = new Image;
            oImg.src = 'images/' + item;
            oImg.onload = load;
        }
    });
    function load() {
        num++;
        $progressBar.css('width', num / ary.length * 100 + '%');
        if (num == ary.length) {
            window.setTimeout(function () {
                $loading.remove();
                messageFn.init();
            }, 2000)
        }
    }
};
loadingFn();
var messageFn = (function () {
    var $msg = $('.message'),
        $msgUl = $msg.children('ul'),
        $oLis = $msgUl.children('li');
    var h = 0,//累加已经显示的li的高度之和
        num = 0, //li索引,默认从第一条信息开始发送
        timer = null;

    function init() {
        move();
    }

    function move() {
        timer = window.setInterval(function () {
            var $oLi = $oLis.eq(num);//获取当前发送的信息
            if (!$oLi.hasClass('btnMsg')) {
                //如果不存在，自动发送信息
                $oLi.css({
                    'opacity': 1,
                    'transform': 'translate(0,0)'
                })
            } else {
                //如果存在，模拟信息输入发送
                clearInterval(timer);
                keyboardFn($oLi);
            }
            //如果是最后一条信息，清掉定时器
            if (num == $oLis.length) {
                window.clearInterval(timer);
                $msg.remove();
                cubeFn.init();
            } else {
                //如果发送的信息超过3条，再发送信息时，把下面发送信息的高度累加起来保存在h里面
                if (num >= 3) {
                    h += $oLis[num].offsetHeight;
                    $msgUl.css({
                        'transform': 'translate(0,' + (-h) + 'px)',
                        'transition': '1s'
                    })
                }
                num++;
            }
        }, 1000);
        function keyboardFn(ele) {
            var $keyboard = $('.keyboard');
            var $keyboardText = $('.keyboard-text');
            var $keyboardBtn = $('.keyboard-btn');
            var str = '请问贵公司有什么要求吗？';
            str = str.split('');
            var num = 0,//数组str里面的每一项的索引
                keytimer = null,
                content = '';//累加显示的内容
            $keyboard.css('transform', 'translate(0,0)');
            keytimer = window.setInterval(function () {
                content += str[num];
                $keyboardText.html(content);
                num++;
                if (num == str.length) {
                    clearInterval(keytimer);
                    $keyboardBtn.css('opacity', 1);
                    $keyboardBtn.singleTap(function () {//给按钮绑定点击事件
                        $(ele).css({
                            'opacity': 1,
                            'transform': 'translate(0,0)'
                        });
                        $keyboardText.html('');
                        $keyboard.css({
                            'transform': 'translate(0,4.16rem)',
                            'transition': '1s'
                        });
                        move();
                    })
                }
            }, 200)
        }
    }

    return {init: init}
})();
var cubeFn = (function () {
    var $cube = $('.cube'),
        $cubeBox = $cube.children('ul'),
        $cubeList = $cubeBox.children('li');

    function init() {
        $cubeBox.css('transform', 'scale(0.5) rotateX(-45deg) rotateY(45deg)');
        $cubeBox.on('transitionEnd webkitTransitionEnd', function () {
            $(this).css('transition', '');
        });
        bind();
        $cubeList.singleTap(function(){
            $cube.hide();
            details.init($(this).index());
        });
    }

    function bind() {
        var startX = -45,//初始X的翻转角度
            startY = 45,//初始Y的翻转角度
            x = 0,//上下翻转的角度
            y = 0,//左右翻转的角度
            downX = 0,//按下时 X的坐标
            downY = 0;//按下时 Y的坐标
        var flag = false;
        $(document).on('touchstart', function (e) {
            downX = e.touches[0].pageX;
            downY = e.touches[0].pageY;
        }, false);
        $(document).on('touchmove', function (e) {
            flag = true;
            e.preventDefault();
            var moveX = e.touches[0].pageX;
            var moveY = e.touches[0].pageY;
            x = (downY - moveY) * 1 / 2;
            y = (moveX - downX) * 1 / 2;
            if (x + startX > 70) {
                x = -startX + 70;
            } else if (x + startX < -70) {
                x = -startX - 70;
            }
            $cubeBox.css('transform', 'scale(0.6) rotateX(' + (x + startX) + 'deg) rotateY(' + (y + startY) + 'deg)')
        }, false);
        $(document).on('touchend', function (e) {
            if (flag) {
                startX += x;
                startY += y;
            }
        }, false);
    }

    return {init: init};
})();
var details = (function () {
    var $maki=$('.maki');
    var $detailsReturn=$('.detailsReturn');
    var $details=$('.details');
    var $cube=$('.cube');
    function init(index) {
        $details.show();
        bind(index);
        $detailsReturn.singleTap(function(){
            $details.hide();
            $cube.show();
        })
    }
    function bind(index){
        var mySwiper=new Swiper('.swiper-container',{
            direction:'horizontal',//滑动方向
            loop:false,//是否为循环模式
            effect:'coverflow',//3d切换
            initialSlide:index,//初始滑块的索引
            onTransitionEnd:change,//滑动结束触发change方法
            onInit:change//初始化方法
        });
        function change(swiper){
            var slides=swiper.slides;
            var curIndex=swiper.activeIndex;
            curIndex==0?open():close();
            $.each(slides,function(index,item){
                if(index==curIndex){
                    item.id='slide'+(curIndex+1);
                    return;
                }
                item.id='';
            })
        }
        function open(){
            //展开3d折叠菜单
            $maki.makisu({
                seletor:'dd',
                overlap:0.6,
                speed:0.8
            });
            $maki.makisu('open');
        }
        function close(){
            //隐藏3d折叠菜单
            $maki.makisu({
                seletor:'dd',
                overlap:0.6,
                speed:0
            });
            $maki.makisu('close');
        }
    }
    return {init: init}
})();
