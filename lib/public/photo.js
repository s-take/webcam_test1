var GUM = {};
$(document).ready(function() {

// getUserMediaでカメラ画像をvideo要素(#video)に表示
// http://i26.jp/html5dev/%E3%80%90html5%E3%80%91getusermedia%E3%81%A7%E3%83%96%E3%83%A9%E3%82%A6%E3%82%B6%E3%81%8B%E3%82%89%E3%82%AB%E3%83%A1%E3%83%A9%E3%82%92%E8%B5%B7%E5%8B%95%E3%81%99%E3%82%8B/
GUM.initCamera = function() {
   if (!navigator.webkitGetUserMedia) {
        alert('webkit系ブラウザでないか、もしくはgetUserMediaがサポートされていません');
    }
    navigator.webkitGetUserMedia({
            video : true
        },
        function(localMediaStream) {
            GUM.video.src = window.URL.createObjectURL(localMediaStream);
            GUM.video.play();
        }, function(err) {
            alert('カメラから映像を取得することができませんでした。');
            console.log(err);
        }
    );
};

GUM.shutter = function() {
    var context2d = GUM.canvas.getContext('2d');
    GUM.video.pause();
    context2d.drawImage(GUM.video, 0, 0, 256, 192);
    try {
        // http://www.html5.jp/canvas/ref/HTMLCanvasElement/toDataURL.html
        // canvas.toDataURL()はChromeではpngのみサポートしてるみたい。2013-05-29
        var imgData = GUM.canvas.toDataURL().replace("data:image/png;base64,", "");
        $.post(
            './photo/create',
            { 'img' : imgData }
            //alert('写真のアップロードが完了しました。')
        );
    } catch (e) {
        console.log(e.message);
    }
    //$('#retryLink').show();
    GUM.video.play();
};

/*
GUM.retry = function() {
    GUM.video.play();
    $('#retryLink').hide();
};
*/
/*
$('#retryLink').hide();
*/
GUM.canvas = $('#canvas').hide()[0];
GUM.video = $('#video')[0];
GUM.initCamera();

});
