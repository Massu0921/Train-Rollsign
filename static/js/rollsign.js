function scroll() {
    var id = $(this).attr("id")
    alert(id)
    //$("#type").animate({ top: "-=" + (64) + "px" }, { duration: 400 }, { complete: function(){} });
}

$('.btn').on('click',scroll)