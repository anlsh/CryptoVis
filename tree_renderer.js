/**
 * Created by anish on 11/20/16.
 */

GLOBAL_SLIDEOFF_DIR = "right";
GLOBAL_WHICH_EVENT = 0;
var must_refresh_slider = false;
var filepath_ = "";
var mouse_event_offset_x;

// I assign to these variables down in slide_in_slider()
var canvas_left_offset = 0;
var resting_left = 0;
var resting_right = 0;

var deanimate = function() {};


function draw_timeline(context, root_x = 100, root_y = 25) {

    // How many years BC do we want to go?
    // If you ever change that starting year... well, you'd better update the random offsets in this function
    var number_of_years = GLOBAL_TIMELINE_END - GLOBAL_TIMELINE_START;

    // Styles
    var major_tick_height = 30;
    var main_line_attr = {"stroke": "#FF0000", "stroke-width": 6};
    var major_tick_attr = {"stroke": "#FF0000", "stroke-width": 6};

    var year_label_offset_y = 30;
    var year_label_attr = {"fill": "#000",
        "font-size": "16px", "font-family": "Arial, Helvetica, sans-serif",
        "text-anchor": "middle"};

    var line = context.path("M " + root_x + " " + root_y + " l " + GLOBAL_PX_PER_YEAR * number_of_years + " 0");
    line.attr(main_line_attr);

    for (var qqq = 0; qqq < number_of_years; qqq++) {
        if (qqq % 100 === 0) {
            context.path("M " + (root_x + (qqq * GLOBAL_PX_PER_YEAR))+ " " +
                (root_y - (major_tick_height / 2)) + " l 0 " + major_tick_height).attr(major_tick_attr);
            context.text((root_x + (qqq * GLOBAL_PX_PER_YEAR)), root_y + year_label_offset_y,
                qqq + GLOBAL_TIMELINE_START).attr(year_label_attr);
        }
    }
}

function draw_tree(tree, context, root_x = 100, root_y = 100) {
    draw_branches(tree, context, root_x, root_y);
    draw_events(tree, context, root_x, root_y);
    draw_nameboxes(tree, context, root_x, root_y);
}

function draw_branches(tree, context, root_x = 100, root_y = 100) {

    // Branch attributes
    var branch_default_attrs = {"stroke": "#FF0000", "stroke-width": 6};

    var temp_namebox_div;
    var namebox_offset_y = -30;
    var namebox_draw_attr = {"fill": "#000",
        "font-size": "10px", "font-family": "Arial, Helvetica, sans-serif",
        "text-anchor": "middle"};

    var path_ = context.path("M " + root_x + " " + root_y + " l " +
        (tree.end_year - tree.start_year) * GLOBAL_PX_PER_YEAR + " 0").attr(branch_default_attrs);
    path_.data("event_id", tree.id_);

    path_.mouseover(function (event) {
        // Put a little div at the mouse to tell them the branch name
        temp_namebox_div = context.text(event.offsetX, event.offsetY + namebox_offset_y,
            tree.name + "(click for details)").attr(namebox_draw_attr);
    });
    path_.mousemove(function (event) {
        temp_namebox_div.remove();
        temp_namebox_div = context.text(event.offsetX, event.offsetY + namebox_offset_y,
            tree.name + "(click for details)").attr(namebox_draw_attr);
    });
    path_.mouseout(function () {
        temp_namebox_div.remove();
    });
    path_.mouseup(function (ev) {
        mouse_event_offset_x = ev.offsetX;
        GLOBAL_KEEP_INFO_BOX = true;
        slide_in_slider(filepath_from_id(this.data("event_id")), this);
    });

    for (var qq = 1; qq < tree.children.length + 1; qq++) {
        var curr_branch = tree.children[qq -1];
        context.path("M " + (root_x + (curr_branch.start_year - tree.start_year)*GLOBAL_PX_PER_YEAR)+" "+root_y+" l 0 "+
            qq * GLOBAL_PX_PER_BRANCH).attr(branch_default_attrs);
        draw_branches(curr_branch, context, (root_x + (curr_branch.start_year - tree.start_year)*GLOBAL_PX_PER_YEAR),
            root_y + qq * GLOBAL_PX_PER_BRANCH);
    }
}

// False for offscreen and true for on
var slider_state = false;

function draw_events(tree, context, root_x = 100, root_y = 100) {

    // Event circle attributes
    var event_circle_radius = 10;
    var event_circle_default_attrs = {stroke: "#00FF00", fill: "#00FF00","fill-opacity": .4};
    var event_circle_animation_attrs = {stroke: "#00FF00", fill: "#FFFFFF","fill-opacity": 1};


    for (var ee = 0; ee < tree.events.length; ee++) {
        var curr_event = tree.events[ee];
        var draw_x = 0;

        if (curr_event.name === "start") {
            draw_x = (tree.start_year * GLOBAL_PX_PER_YEAR);
            draw_x = root_x;
        } else if (curr_event.name === "end") {
            draw_x = root_x + (tree.end_year - tree.start_year) * GLOBAL_PX_PER_YEAR;
        } else {
            draw_x = root_x + (curr_event.year - tree.start_year) * GLOBAL_PX_PER_YEAR;
        }

        // Draw event circle
        context.circle(draw_x, root_y, event_circle_radius).attr(event_circle_animation_attrs);
        var event_circle = context.circle(draw_x, root_y, event_circle_radius).attr(event_circle_default_attrs);

        event_circle.data("event_id", curr_event.id_);

        // Set event handlers
        event_circle.mouseover(function (ev) {

            mouse_event_offset_x = ev.offsetX;

            if (GLOBAL_WHICH_EVENT !== this) {
                GLOBAL_KEEP_INFO_BOX = false;
            }

            try {
                GLOBAL_WHICH_EVENT.animate(event_circle_default_attrs);
            } catch (e) {}

            this.animate(event_circle_animation_attrs);
            var event_path = filepath_from_id(this.data("event_id"));

            slide_in_slider(event_path, this);
            GLOBAL_WHICH_EVENT = this;
        });

        event_circle.mouseup(function () {
            GLOBAL_KEEP_INFO_BOX = true;
        });

        event_circle.mouseout(function () {
            if (!GLOBAL_KEEP_INFO_BOX) {
                this.animate(event_circle_default_attrs);
                slide_out_slider();
            } else {
                deanimate = function () {
                    GLOBAL_WHICH_EVENT.animate(event_circle_default_attrs);
                }
            }
        });
    }

    for (var qq = 1; qq < tree.children.length + 1; qq++) {
        var curr_branch = tree.children[qq -1];
        draw_events(curr_branch, context, (root_x + (curr_branch.start_year - tree.start_year)*GLOBAL_PX_PER_YEAR),
            root_y + qq * GLOBAL_PX_PER_BRANCH);
    }
}

function draw_nameboxes(tree, context, root_x = 100, root_y = 100) {

    var branch_name_offset_x = 5;
    var branch_name_offset_y = 20;
    var branch_name_attr = {"fill": "#000",
        "font-size": "32px", "font-family": "Arial, Helvetica, sans-serif",
        "text-anchor": "start"};
    var branch_name_attr_animation = {"fill": "#000"};

    for (var qq = 1; qq < tree.children.length + 1; qq++) {
        var curr_branch = tree.children[qq -1];
        draw_nameboxes(curr_branch, context, (root_x + (curr_branch.start_year - tree.start_year)*GLOBAL_PX_PER_YEAR),
            root_y + qq * GLOBAL_PX_PER_BRANCH);
    }

    var branch_namebox = context.text(root_x + branch_name_offset_x, root_y + branch_name_offset_y, tree.name);
    branch_namebox.attr(branch_name_attr);
}

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

    if (mouse_event_offset_x < ($("#canvas").width() / 2)) {

        console.log("Moving the div to the right of the canvas!");
        GLOBAL_SLIDEOFF_DIR = "right";
        $("#slider_container").animate({left: resting_right}, 0);
        $("#slider_container").animate({left: resting_right - GLOBAL_INFO_BOX_WIDTH});
    } else {
        // The box should slide in from the left of the screen
        console.log("Moving the div to the left of the canvas!");
        GLOBAL_SLIDEOFF_DIR = "left";
        $("#slider_container").animate({left: resting_left}, 0);
        $("#slider_container").animate({left: resting_left + GLOBAL_INFO_BOX_WIDTH});
    }

    slider_state = true;
}
function slide_in_slider(filepath, event_trigger) {

    if (event_trigger === GLOBAL_WHICH_EVENT && slider_state) {return 0;}
    if (event_trigger !== GLOBAL_WHICH_EVENT && slider_state) {
        console.log("A different event has been passed in, refreshing slider");
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
            console.log("Bringing in the slider right away!");
            slide_in_slider_(filepath_);
            must_refresh_slider = false;
        }
    });
}

function filepath_from_id(str) {
    return ("infofiles/" + str +".html");
}