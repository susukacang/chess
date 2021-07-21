// https://stackoverflow.com/questions/1148424/registering-clicks-on-an-element-that-is-under-another-element

$("#topelement").click(function() {
   $("#elementbelow").click();
   return false;
});

$("#topelement").click(function(e) {
    $(".box").each(function() {
       // check if clicked point (taken from event) is inside element
       var mouseX = e.pageX;
       var mouseY = e.pageY;
       var offset = $(this).offset;
       var width = $(this).width();
       var height = $(this).height();

       if (mouseX > offset.left && mouseX < offset.left+width 
           && mouseY > offset.top && mouseY < offset.top+height)
         $(this).click(); // force click event
    });
});
