$(document).ready(function() {
    $("select").niceSelect()
    $(".nav-item .nice-select.form-select").click(function(){
        $(this).toggleClass( "open" )
        $(".nav-item .nice-select.form-select .list .option").click(function() {
            $(".nav-item .nice-select.form-select .list .option").removeClass( "selected" );
            $(this).addClass( "selected" );
            let text = $( this ).html();
            $(".nav-item .nice-select.form-select .current").text( text )
        }) 
    })
})