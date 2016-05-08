$(document).ready(function () {
    var tData = ($('#msg').html()) ? JSON.parse($('#msg').html().split(',')) : ""
        , height = 205;
    if (tData.msg) {
        height = 205;
        $('#type').html(tData.msg);
    }
    (tData.textColor) ? $('#type').css('color', tData.textColor): '';
    (tData.bgColor) ? $('body').css('background-color', tData.bgColor): '';
    $("#menu-scroll").height($(document).height() - height);
    $('#dd').css('width', $(document).width() - 365)
    $(window).resize(function () {
        $("#menu-scroll").height($(document).height() - height);
        $('#dd').css('width', $(document).width() - 365);
    });
});