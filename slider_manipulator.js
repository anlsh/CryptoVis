/**
 * Created by anish on 11/22/16.
 */

var must_refresh_slider = false;
var slider_state = false;
// I assign to these variables down in slide_in_slider()
var resting_left = 0;
var resting_right = 0;
var canvas_left_offset = 0;
var filepath_ = "";

function slide_in_slider_(filepath) {

    // This does that actual moving of the slider

    canvas_left_offset = $("#canvas").css('margin-left');
    canvas_left_offset.replace('px', '');
    canvas_left_offset = parseInt(canvas_left_offset) + 7;

    resting_left = canvas_left_offset - GLOBAL_INFO_BOX_WIDTH;
    // Where the left side rests when it is on the right side
    resting_right = canvas_left_offset + $("#canvas").width();

    $("#slider_container").removeAttr("right left");
    $("#infobox_container").load(filepath, function() {
        $("#infobox_container").prepend('<button id="xbox">Close</button>');
        document.getElementById("xbox").onclick = function () {

            GLOBAL_KEEP_INFO_BOX = false;

            slide_out_slider();
        }
    });

    if ((GLOBAL_MOUSE_EVENT_X - document.getElementById("canvas").scrollLeft) < ($("#canvas").width() / 2)) {
        GLOBAL_SLIDEOFF_DIR = "right";
        $("#slider_container").animate({left: resting_right}, 0);
        $("#slider_container").animate({left: resting_right - GLOBAL_INFO_BOX_WIDTH});
    } else {
        // The box should slide in from the left of the screen
        GLOBAL_SLIDEOFF_DIR = "left";
        $("#slider_container").animate({left: resting_left}, 0);
        $("#slider_container").animate({left: resting_left + GLOBAL_INFO_BOX_WIDTH});
    }

    slider_state = true;
}

function slide_in_slider(filepath, event_trigger) {

    if (event_trigger === GLOBAL_WHICH_EVENT && slider_state) {return 0;}
    if (event_trigger !== GLOBAL_WHICH_EVENT && slider_state) {
        //console.log("A different event has been passed in, refreshing slider");
        filepath_ = filepath;
        must_refresh_slider = true;
        slide_out_slider();
    } else {
        slide_in_slider_(filepath);
    }
}

function slide_out_slider() {
    deanimate();
    var goto;
    if (GLOBAL_SLIDEOFF_DIR === "right") {
        goto = resting_right;
    } else {
        goto = resting_left
    }
    $("#slider_container").animate({left: goto}, function () {
        slider_state = false;
        if (must_refresh_slider) {
            //console.log("Bringing in the slider right away!");
            slide_in_slider_(filepath_);
            must_refresh_slider = false;
        }
    });
}

function filepath_from_id(str) {
    return ("infofiles/" + str +".html");
}