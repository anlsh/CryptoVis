function rstring(length) {
    console.log("generating random background string");
    var ret = 0.0;
    do {
        ret = Math.random();
    } while(ret === 0.0);
    ret = 1 / ret;
    ret = ret.toString(36);
    var a = 0.0;
    while(ret.length < length) {
        do {
            a = Math.random();
        } while(a === 0.0);
        ret += (1 / a).toString(36);
    }
    return ret;
}
console.log("beginning background");
$("#background").text(rstring(10000));
console.log("background complete");
