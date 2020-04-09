const cleanLink = (domain, link) => {
    if (link[0] === "/") {
        if (domain[domain.length - 1] === "/") {
            domain = domain.slice(0, domain.length - 1);
        }
        return domain + link;
    }
    return link;
}

module.exports.cleanLink = cleanLink;