export function fromHexToColorDB(hex) {
    return hex.substring(1).toUpperCase();
}

export function fromColorDBToHex(colorDB) {
    var color = "#" + colorDB
    return color.toUpperCase();
}
