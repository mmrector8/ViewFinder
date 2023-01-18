
function standardizeData(queryArr) {
    const parentObj = { };
    for (let obj of queryArr) {
        parentObj[obj._id] = obj
    }
    return parentObj
}

module.exports = standardizeData
