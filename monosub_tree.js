/**
 * Created by anish on 11/13/16.
 */

/*
 * {
 "name": "";
 "start_year": 0;
 "end_year": 0;
 "description": "";
 "events": [];
 "children": [];
 }
 * */

function draw_tree(tree, context, root_x = 100, root_y = 100) {
    var px_per_year = .6;
    var px_per_branch = 25;
    var default_fill_opacity = .4;
    var hover_fill_opacity = .75;

    console.log("Drawing "+tree.name);

    context.path("M " + root_x + " " + root_y + " l " +
        (tree.end_year - tree.start_year) * px_per_year + " 0").attr({"stroke": "#FF0000", "stroke-width": 6});

    for (var ee = 0; ee < tree.events.length; ee++) {
        var curr_event = tree.events[ee];
        var draw_x = 0;

        if (curr_event.name === "start") {
            draw_x = (tree.start_year * px_per_year);
            draw_x = root_x;
        } else if (curr_event.name === "end") {
            draw_x = root_x + (tree.end_year - tree.start_year) * px_per_year;
        } else {
            draw_x = root_x + (curr_event.year - tree.start_year) * px_per_year;
        }
        var event_circle = context.circle(draw_x, root_y, 10).attr(
            {stroke: "#00FF00", fill: "#00FF00","fill-opacity": .4});
        event_circle.mouseover(function () {
            this.animate({"fill-opacity": hover_fill_opacity}, 500)
        });
        event_circle.mouseout(function () {
            this.animate({"fill-opacity": default_fill_opacity}, 500)
        });
    }

    for (var qq = 1; qq < tree.children.length + 1; qq++) {
        var curr_branch = tree.children[qq -1];
        context.path("M " + (root_x + (curr_branch.start_year - tree.start_year)*px_per_year)+" "+root_y+" l 0 "+
                    qq * px_per_branch).attr({"stroke": "#FF0000", "stroke-width": 6});
        draw_tree(curr_branch, context, (root_x + (curr_branch.start_year - tree.start_year)*px_per_year),
                    root_y + qq * px_per_branch);
    }
}
function sort_tree(tree) {
    console.log("Sorting the " + tree.name);
    if (tree.children.length > 1) {
        tree.children.sort(compare_by_children);
        for (var ii = 0; ii < tree.children.length; ii++) {
            sort_tree(tree.children[ii]);
        }
    }
}
function compare_by_children(a, b) {
    if (get_leaves(a) > get_leaves(b)) {
        return 1;
    } else if (get_leaves(a) < get_leaves(b)) {
        return -1
    } else {
        return 0;
    }
}
function get_leaves(tree) {
    var total_leaves = 0;
    if (tree.children.length === 0) {
        return 1;
    } else {
        // This random +1 is to account for the fact that the current node itself is a leaf
        total_leaves += 1;
        for (var patch = 0; patch < tree.children.length; patch++) {
            total_leaves += get_leaves(tree.children[patch]);
        }
    }
    return total_leaves;
}

var monosub_tree = {
"name": "Monosubstitution Cipher",
    "start_year": 20,
    "end_year": 1600,
    "description": "Example dexcription",
    "events":
    [
        {
            "name": "start",
            "description": "It got invented!"
        },
        {
            "name": "Frequency Analysis Invented",
            "description": "Freq Analysis Invention placeholder",
            "year": 800
        },
        {
            "name": "end",
            "description": "Talk about the end of freq anal"
        }
    ],
    "children":
    [
        {
            "name": "Caesar Cipher",
            "start_year": 30,
            "end_year": 50,
            "description": "The description for Caesar Ciphers",
            "events":
                [
                    {
                        "name": "start",
                        "description": "Some description for Caesar Ciphers"
                    },
                    {
                        "name": "end",
                        "description": "The end of the Caesar Cipher?"
                    }
                ],
            "children": []
        },
        {
            "name": "Nomenclators",
            "start_year": 1500,
            "end_year": 1600,
            "description": "Placeholder desc for nomenclators",
            "events":
            [
                {
                    "name": "start",
                    "description": "The invention of nomenclators"
                },
                {
                    "name": "end",
                    "description": "The end of nomenclators"
                }
            ],
            "children": []
        },
        {
            "name": "Null Ciphers",
            "start_year": 1500,
            "end_year": 1800,
            "description": "Placeholder for null cipher",
            "events":
            [
                {
                    "name": "start",
                    "description": "Null ciphers were invented!"
                },
                {
                    "name": "end",
                    "description": "These never really ended..."
                }
            ],
            "children": []
        },
        {
            "name": "Vigne're Cipher",
            "start_year": 1400,
            "end_year": 1920,
            "description": "Placeholder desc for Vignere cipher",
            "events":
            [
                {
                    "name": "start",
                    "description": "Invention of the Vigne're Cipher"
                },
                {
                    "name": "end",
                    "description": "The breaking of the Vigne're Cipher"
                }
            ],
            "children":
            [
                {
                    "name": "Engima",
                    "start_year": 1700,
                    "end_year": 1945,
                    "description": "Description for Enigma",
                    "events":
                    [
                        {
                            "name": "start",
                            "description": "The invention of the Enigma"
                        },
                        {
                            "name": "end",
                            "description": "The end of the Enigma"
                        }
                    ],
                    "children":
                    [
                        {
                            "name": "Lorenz Encryption",
                            "start_year": 1800,
                            "end_year": 1945,
                            "description": "Description for Lorenz Crypto",
                            "events":
                            [
                                {
                                    "name": "start",
                                    "description": "Invention!"
                                },
                                {
                                    "name": "end",
                                    "description": "The fall of the Lorenz Cipher"
                                }
                            ],
                            "children": []
                        }
                    ]
                },
                {
                    "name": "Purple",
                    "start_year": 1875,
                    "end_year": 1946,
                    "description": "Description for Purple",
                    "events":
                    [
                        {
                            "name": "start",
                            "description": "The invention of Purple"

                        },
                        {
                            "name": "end",
                            "description": "The end of the Purple"
                        }
                    ],
                    "children": []
                }
            ]
        }
    ]
};