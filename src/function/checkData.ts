// return true if data is ok
export function CheckData(value, minL, maxL, regexPattern, errorRegex, mail= false) {
    // build regex
    const regex = new RegExp(regexPattern, 'gm')
    // check
    if (regex.exec(value)) {
        return {status: false, cause: 'regex'};
    } else if (value.length < minL) {
        return {status: false, cause: 'minL'};
    } else if (value.length > maxL) {
        return {status: false, cause: 'maxL'};
    } else if ((mail && !value.match(/[\S]+[@][a-z]+[.][a-z]+/gm))) {
        return {status: false, cause: 'notMail'};
    } else {
        return {status: true};
    }
}
