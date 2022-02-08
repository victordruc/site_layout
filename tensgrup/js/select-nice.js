$(document).ready(function() {
    $("select").niceSelect()

    $(".list").click(function(e) {
        if($(e.target).is(".option.disabled")) return
        $(this).parent().attr("data-enable","true")
    })
    countryChange()
})