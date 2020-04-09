const isSubdomain = (link) => {
    let tmp;
    if (link.split('/')[0].includes("http")) {
        tmp = link.split('/')[2];
    } else {
        tmp = link.split('/')[0];
    }
    if (tmp.indexOf('.') !== tmp.lastIndexOf('.') && !tmp.includes('www'.toLowerCase())) {
        return true;
    }
    return false;
}

module.exports.isSubdomain = isSubdomain;