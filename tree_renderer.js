/**
 * Created by anish on 11/20/16.
 */

GLOBAL_SLIDEOFF_DIR = "right";
GLOBAL_WHICH_EVENT = 0;

var deanimate = function() {};
GLOBAL_MOUSE_EVENT_X = 0;

// False for offscreen and true for on

var display_blocks = [];

function is_blocked(layer, start_year, end_year) {
    for (var i = 0; i < display_blocks.length; i++) {
        if (layer === display_blocks[i][0]) {
            var other_start_year = display_blocks[i][1];
            var other_end_year = display_blocks[i][2];
            var other_name = display_blocks[i][3];
            if (other_start_year <= start_year && start_year <= other_end_year) {
                //console.log("Blocked because it starts within " + other_name);
                return true;
            } else if (other_start_year <= end_year && end_year <= other_end_year) {
                //console.log("Blocked because it ends within " + other_name);
                return true;
            } else if (start_year <= other_start_year && end_year >= other_start_year) {
                //console.log("Blocked because it extends past the start of " + other_name);
                return true;
            }
        }
    }
    return false;
}

function draw_tree(tree, context, root_x, root_y, starting_layer) {
    display_blocks = [];
    draw_branches(tree, context, root_x, root_y, starting_layer, undefined);
    display_blocks = [];
    draw_events(tree, context, root_x, root_y, starting_layer);
    display_blocks = [];
    draw_nameboxes(tree, context, root_x, root_y, starting_layer);
}

function draw_branches(tree, context, root_x, root_y, starting_layer, parent) {

    // Branch attributes
    var branch_default_attrs = {"stroke": "#FF0000", "stroke-width": 6};
    var cracked_branch_default_attrs = {"stroke": "#FF0000", "stroke-width": 6, "opacity": .3};
    var background_rectangle_attrs = {"fill": "#000000"};
    var temp_str = 0;

    var temp_namebox_offset_y = -30;

    var temp_namebox_draw_attr = {"fill": "#FFF",
        "font-size": "15px", "font-family": "Arial, Helvetica, sans-serif",
        "text-anchor": "start"};

    var temp_label = [];

    if (tree.crack_year === undefined) {
        tree.crack_year = tree.end_year;
    }
    // Check for blocks, preferring to be drawn at the 0 block
    var draw_layer = starting_layer;
    while (is_blocked(draw_layer, tree.start_year, tree.end_year)) {
        console.log(tree.name + " is blocked at layer " + draw_layer);
        console.log("");
        draw_layer += 1;
    }
    // Block the current branch's area
    var to_append = [draw_layer, tree.start_year, tree.end_year, tree.name];
    display_blocks.push(to_append);

    var y_draw_level = root_y + draw_layer * GLOBAL_PX_PER_BRANCH;

    // Connect the path to its parent
    var is_detached = false;
    if (parent !== undefined) {
        try {
            is_detached = tree.detached;
        } catch (e) {}
        if (!is_detached) {
            var attrs_draw_with = branch_default_attrs;
            if (tree.start_year > parent.crack_year) {
                attrs_draw_with = cracked_branch_default_attrs;
            } else {
                attrs_draw_with = branch_default_attrs;
            }
            context.path("M " + root_x + " " + y_draw_level + " l 0 " +
                ((draw_layer - starting_layer + 1) * -GLOBAL_PX_PER_BRANCH)).attr(attrs_draw_with);
        }
    }

    var uncracked_path = context.path("M " + root_x + " " + y_draw_level + " l " +
        (tree.crack_year - tree.start_year) * GLOBAL_PX_PER_YEAR + " 0").attr(branch_default_attrs);
    uncracked_path.data("event_id", tree.id_);
    uncracked_path.mouseover(function (event) {
        temp_str = tree.name + " (click for details)";
        // Put a little div at the mouse to tell them the branch name
        temp_label = draw_text_with_background_rect(temp_str, event.offsetX,
            event.offsetY + temp_namebox_offset_y,
            temp_namebox_draw_attr, background_rectangle_attrs, context);
    });
    uncracked_path.mousemove(function (event) {
        temp_label[0].remove();
        temp_label[1].remove();
        temp_label = draw_text_with_background_rect(temp_str, event.offsetX,
            event.offsetY + temp_namebox_offset_y,
            temp_namebox_draw_attr, background_rectangle_attrs, context);
    });
    uncracked_path.mouseout(function () {
        temp_label[0].remove();
        temp_label[1].remove();
    });
    uncracked_path.mouseup(function (ev) {
        GLOBAL_MOUSE_EVENT_X = ev.offsetX;
        GLOBAL_KEEP_INFO_BOX = true;
        slide_in_slider(filepath_from_id(this.data("event_id")), this);
    });

    var cracked_path = context.path("M " + (root_x + (tree.crack_year - tree.start_year) * GLOBAL_PX_PER_YEAR)
        + " " + y_draw_level + " l " + ((tree.end_year - tree.crack_year) * GLOBAL_PX_PER_YEAR)
        + " 0").attr(cracked_branch_default_attrs);

    cracked_path.data("event_id", tree.id_);

    cracked_path.mouseover(function (event) {
        temp_str = tree.name + " (cracked)";
        temp_label = draw_text_with_background_rect(temp_str, event.offsetX,
                                                    event.offsetY + temp_namebox_offset_y,
                                                    temp_namebox_draw_attr, background_rectangle_attrs, context);
    });
    cracked_path.mousemove(function (event) {
        temp_label[0].remove();
        temp_label[1].remove();
        temp_label = draw_text_with_background_rect(temp_str, event.offsetX,
                                                    event.offsetY + temp_namebox_offset_y,
                                                    temp_namebox_draw_attr, background_rectangle_attrs, context);
    });
    cracked_path.mouseout(function () {
        temp_label[0].remove();
        temp_label[1].remove();
    });
    cracked_path.mouseup(function (ev) {
        GLOBAL_MOUSE_EVENT_X = ev.offsetX;
        GLOBAL_KEEP_INFO_BOX = true;
        slide_in_slider(filepath_from_id(this.data("event_id")), this);
    });

    for (var qq = 1; qq < tree.children.length + 1; qq++) {
        var curr_branch = tree.children[qq -1];
        draw_branches(curr_branch, context, (root_x + (curr_branch.start_year - tree.start_year)*GLOBAL_PX_PER_YEAR),
            root_y, draw_layer + 1, tree);
    }
}

function draw_events(tree, context, root_x = 100, root_y = 100, starting_layer) {

    // Event circle attributes
    var event_circle_radius = 10;
    var event_circle_default_attrs = {stroke: "#00FF00", fill: "#00FF00","fill-opacity": .4};
    var event_circle_animation_attrs = {stroke: "#00FF00", fill: "#FFFFFF","fill-opacity": 1};

    var draw_layer = starting_layer;
    while (is_blocked(draw_layer, tree.start_year, tree.end_year)) {
        console.log(tree.name + " is blocked at layer " + draw_layer);
        console.log("");
        draw_layer += 1;
    }
    var to_append = [draw_layer, tree.start_year, tree.end_year, tree.name];
    display_blocks.push(to_append);

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
        var y_draw_level = root_y + draw_layer * GLOBAL_PX_PER_BRANCH;
        context.circle(draw_x, y_draw_level, event_circle_radius).attr(event_circle_animation_attrs);
        var event_circle = context.circle(draw_x, y_draw_level, event_circle_radius).attr(event_circle_default_attrs);

        event_circle.data("event_id", curr_event.id_);

        // Set event handlers
        event_circle.mouseover(function (ev) {

            GLOBAL_MOUSE_EVENT_X = ev.offsetX;

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
            root_y, draw_layer + 1);
    }
}

function draw_nameboxes(tree, context, root_x = 100, root_y = 100, starting_layer) {

    var branch_name_offset_x = 5;
    var branch_name_offset_y = 27;
    var branch_name_attr = {"fill": "#000",
        "font-size": "32px", "font-family": "Arial, Helvetica, sans-serif",
        "text-anchor": "start"};
    var name_bounding_box_attr ={"stroke-opacity": .5, "fill": "#FFF8DC"};
    var name_bounding_box_corner_rad = 10;
    var name_bounding_box_yoffset = -15;
    var name_bounding_box_xpadding = 7;

    var draw_layer = starting_layer;
    while (is_blocked(draw_layer, tree.start_year, tree.end_year)) {
        console.log(tree.name + " is blocked at layer " + draw_layer);
        console.log("");
        draw_layer += 1;
    }
    // Block the current branch's area
    var to_append = [draw_layer, tree.start_year, tree.end_year, tree.name];
    display_blocks.push(to_append);

    var y_draw_level = root_y + draw_layer * GLOBAL_PX_PER_BRANCH;

    for (var qq = 1; qq < tree.children.length + 1; qq++) {
        var curr_branch = tree.children[qq -1];
        draw_nameboxes(curr_branch, context, (root_x + (curr_branch.start_year - tree.start_year)*GLOBAL_PX_PER_YEAR),
            root_y, draw_layer + 1);
    }

    draw_text_with_background_rect(tree.name, root_x + branch_name_offset_x, y_draw_level + branch_name_offset_y,
                                    branch_name_attr, name_bounding_box_attr, context, true);
}

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

    for (var qqq = 0; qqq <= number_of_years; qqq++) {
        if (qqq % 100 === 0) {
            context.path("M " + (root_x + (qqq * GLOBAL_PX_PER_YEAR))+ " " +
                (root_y - (major_tick_height / 2)) + " l 0 " + major_tick_height).attr(major_tick_attr);
            context.text((root_x + (qqq * GLOBAL_PX_PER_YEAR)), root_y + year_label_offset_y,
                qqq + GLOBAL_TIMELINE_START).attr(year_label_attr);
        }
    }
}

function draw_text_with_background_rect(str, x, y, str_attrs, rect_attrs, context, fug_y = false) {
    var fug_factor = -7;
    var x_padding = 10;
    var y_padding = 7;

    var draw_txt = context.text(x, y, str).attr(str_attrs);
    var y_level = y - y_padding + (fug_y ? fug_factor : 0);
    var backgrnd_rect = context.rect(x - x_padding, y_level,
        draw_txt.getBBox().width + 2 * x_padding, draw_txt.getBBox().height, 3).attr(rect_attrs);
    draw_txt.remove();

    draw_txt = context.text(x, y, str).attr(str_attrs);

    return [draw_txt, backgrnd_rect];
}
