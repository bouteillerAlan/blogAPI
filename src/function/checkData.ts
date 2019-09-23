// return true if data is ok
export function CheckData(stateName, value, minL, maxL, regexPattern, errorRegex, mail= false) {
    // build regex
    const regex = new RegExp(regexPattern, 'gm')
    // check
    if (regex.exec(value)) {
        return false;
    } else if (value.length < minL) {
        return false;
    } else if (value.length > maxL) {
        return false;
    } else {
        return !(mail && !value.match(/[\S]+[@][a-z]+[.][a-z]+/gm));
    }
}
