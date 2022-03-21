// Scroll Top ---------------------------------------------------------->

function scrollTop(top) {
    let y = $(window).scrollTop()
    if(y<top) {
        $('#scrollUP').css('display','none')
    } else {
        $('#scrollUP').css('display','block')
    }


    $(window).on("scroll",()=>{
        y = $(window).scrollTop()
        if(y<top) {
            $('#scrollUP').css('display','none')
        } else {
            $('#scrollUP').css('display','block')
        }
        
    })
    
    $('#scrollUP').on('click', function() {
        $(window).scrollTop(0);
    });
}

scrollTop(100)

// Scroll Top ----------------------------------------------------------<

// Initialize AOS ------------------------------------------------------>
AOS.init();
// Initialize AOS ------------------------------------------------------<