$(".fa-plus").attr("title","Click to add a todo")
$("li").attr("title","Click to strike through todo")
$("li span").attr("title","Click to remove todo")
$(".fa-plus").click(function(){
    $("input").slideToggle();
});

$("ul").on("click","li",function(){
    // if ($(this).css("color")==="rgb(128, 128, 128)"){
    //     $(this).css({color: "black", textDecoration: "none"});
    // }
    // else {
    //     $(this).css({color: "gray", textDecoration: "line-through"});
    // }
    $(this).toggleClass("done");
});

$("ul").on("click","span",function(event){
    $(this).parent().fadeOut(function(){
        $(this).remove();
    });
    event.stopPropagation();
});

$("input").keypress(function(event){
    if (event.which === 13) {
        var inputTodo = $(this).val();
        if (inputTodo === ""){

        }
        else{
            var addTodo = "<li title='Click to strike through todo'><span title='Click to remove todo'><i class='far fa-trash-alt'></i></span>"+" "+inputTodo+"</li>"
            $("ul").append(addTodo);
            // $("ul").append(function(){
            //     $(this).html("<li>"+inputTodo+"</li>");
            // });
            inputTodo = $(this).val("");
        }
    }
});