const extractDomain = (link) => {
    let tmp;
    if (link.split('/')[0].includes("http")) {
        tmp = link.split('/')[2];
    } else {
        tmp = link.split('/')[0];
    }
    while (tmp.indexOf('.') !== tmp.lastIndexOf('.')) {
        const idx = tmp.indexOf('.');
        tmp = tmp.slice(idx + 1, tmp.length);
    }
    return tmp;
}

module.exports.extractDomain = extractDomain;