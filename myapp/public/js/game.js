var cards = new Array();
cards.push({type:0,paired:false,selected:false});
cards.push({type:1,paired:false,selected:false});
cards.push({type:1,paired:false,selected:false});
cards.push({type:0,paired:false,selected:false});

var firstSelectedCard;

$(document).ready(function() {

    $(".card").click(function () {
        var BACK = 0;
        var FRONT = 1;

        var cardno = $(this).attr("data-cardno");
        var side = $(this).attr("data-side");
        var type = cards[cardno].type;
        var paired = cards[cardno].paired;
        var selected = cards[cardno].selected;

        if (paired == true) {
            console.log("already paired card");
            return;
        }

        if (selected == true) {
            console.log("already selected card");
            return;
        }
        cards[cardno].selected = true;

        if (side == BACK) {
            $(this).addClass("front");
            $(this).removeClass("back");
            $(this).attr("data-side", FRONT);
            $(this).text(type);
        } else {
            // flip to back
            $(this).addClass("back");
            $(this).removeClass("front");
            $(this).attr("data-side", BACK);
            $(this).text("");
        }

        if (firstSelectedCard) {
            // is paired?
            if (cards[firstSelectedCard.cardno].type == type) {
                console.log("paired!");

                cards[firstSelectedCard.cardno].paired = true;
                cards[cardno].paired = true;

                // is clear?
                if (is_cleared()) {
                    alert("congratulations!");
                }
            } else {
                console.log("not paired!");

                // flip to back first selected card
                var firstSelectedCardDom = document.getElementById("card" + firstSelectedCard.cardno);
                $(firstSelectedCardDom).addClass("back");
                $(firstSelectedCardDom).removeClass("front");
                $(firstSelectedCardDom).attr("data-side", BACK);
                $(firstSelectedCardDom).text("");

                // flip to back
                $(this).addClass("back");
                $(this).removeClass("front");
                $(this).attr("data-side", BACK);
                $(this).text("");

                // unselect both card
                cards[firstSelectedCard.cardno].selected = false;
                cards[cardno].selected = false;
            }
            firstSelectedCard = null;
        } else {
            firstSelectedCard = {cardno:cardno};
        }
    });
});

function is_cleared() {
    var length = cards.length;
    for (var i=0; i<length; i++) {
        if (cards[i].paired == false) {
            return false;
        }
    }
    return true;
}