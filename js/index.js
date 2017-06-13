var loadingFn=function(){
    var ary=['arrow-left.png','arrow-right.png','bg.png','coin.jpg','cube1.png','cube2.png','cube3.png','cube4.png','cube5.png','cube6.png','cubeBg.jpg','cubeTip.png','head.jpg','keyboard.png','keyboard-btn.png','return.png','js.jpg'];
    var $loading=$('.loading');
    var $progressBar=$('.progress-bar');
    var num=0;
    $.each(ary,function(index,item){
        var reg=/\.([a-zA-Z1-9]+)/i;
        //debugger;
        var type=reg.exec(item)[1];
        if(type=='mp3'){
            var oAudio=new Audio;
            oAudio.src='audio/'+item;
            oAudio.onLoadedMetadata=load;
        }else{
            var oImg=new Image;
            oImg.src='images/'+item;
            oImg.onload=load;
        }
    });
    function load(){
        num++;
        $progressBar.css('width',num/ary.length*100+'%');
        if(num==ary.length){
            window.setTimeout(function(){
                $loading.remove();
            },2000)
        }
    }
};
//loadingFn();
var messageFn=(function(){
    var $msg=$('.message'),
        $msgUl=$('.message').children('ul'),
        $oLis=$msgUl.children('li');
    var h=0, num=0, timer=null;
    function init() {
        move();
    }
    function move(){
        timer=window.setInterval(function(){
            var $oLi=$oLis.eq(num);
            if(!$oLi.hasClass('btnMsg')){
                //如果不存在，自动发送信息
                $oLi.css({
                    'opacity':1,
                    'transform':'translate(0,0)'
                })
            }else{
                //如果存在，模拟信息输入发送
                clearInterval(timer);
            }
        },1000)
    }
    return {init:init}
});