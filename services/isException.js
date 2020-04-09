const isException = (link) => {
    if (link.slice(link.length - 4, link.length).toLowerCase() === ".pdf") {
        return true;
    }
    if (link.slice(link.length - 4, link.length).toLowerCase() === ".jpg") {
        return true;
    }
    if (link.slice(link.length - 5, link.length).toLowerCase() === ".docx") {
        return true;
    }
    return false
}

module.exports.isException = isException;