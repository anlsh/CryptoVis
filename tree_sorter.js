/**
 * Created by anish on 11/20/16.
 */

function sort_tree(tree) {
    tree.children.sort(compare_by_children);
    for (var ii = 0; ii < tree.children.length; ii++) {
        sort_tree(tree.children[ii]);
    }
}

function compare_by_children(a, b) {
    if (get_leaves(a) > get_leaves(b)) {
        return -1;
    } else if (get_leaves(a) < get_leaves(b)) {
        return 1
    } else {
        return -1 * (a.start_year - b.start_year);
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