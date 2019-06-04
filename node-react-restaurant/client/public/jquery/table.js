$(document).ready(function () {
    $("#list-header").on({
        mouseenter: function () {
            $(this).css("background-color", "lightgray");
        },
        mouseleave: function () {
            $(this).css("background-color", "lightblue");
        },
    });
    $("#btnReloadData").on("click", function () {
        table.ajax.reload();
    });
});