const itemBackup = $(".item").clone();
$(".item").remove();

$.getJSON("assets/games.json", function(result, status){
    if (status != "success"){return}
    
    $.each(result, function(g_id, g_details){
        let newCard = itemBackup.clone();
        newCard.children(".item-add").attr("onclick", "addToCart(" + g_id + ")");
        newCard.children(".item-logo").attr("src", g_details["logo"]);
        newCard.children("div").children(".item-name").html(g_details["name"]);
        newCard.children("div").children(".item-price").html("£" + g_details["price"]);
        
        $.each(g_details["description"], function(i, txt){
            newCard.children(".item-desc").append("<p>" + txt + "</p>")
        })
        //newCard.children(".item-desc").html(g_details["description"]);
        newCard.children(".item-release").html(g_details["release"]);
        newCard.children(".item-more").attr("href", "webpages/products/" + g_id + ".html");
        
        newCard.appendTo($("#content"));
    });
    
    $("#content").append('<div style="clear: both; height: 1px; width: 100%"></div>');
});