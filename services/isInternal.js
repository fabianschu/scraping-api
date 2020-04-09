const {extractDomain} = require('./extractDomain');
const {isSubdomain} = require('./isSubdomain');

const isInternal = (domain, link) => {
    if (link[0] === "/") {
        return true;
    }
    if (!isSubdomain(link) && (extractDomain(domain) === extractDomain(link))) {
        return true;
    }
    return false;
}

module.exports.isInternal = isInternal;