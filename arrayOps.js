/* 
   This is an array operations lib containing utility 
   functions needed for list manipulation.
 */

function ary_deleteElemAtIndex(anArray, elemIndex){
    let slice1 = anArray.slice(0,elemIndex)
    let slice2 = anArray.slice(elemIndex + 1, anArray.length)
    let combinedArray = []
    slice1.forEach(e => combinedArray.push(e))
    slice2.forEach(e => combinedArray.push(e))
    return combinedArray
}

function ary_insertElemBefore(anArray, targetIndex, insertValue){
    let slice1 = anArray.slice(0, targetIndex)
    slice1.push(insertValue)
    let slice2 = anArray.slice(targetIndex, anArray.length)
    let combinedArray = []
    slice1.forEach(e => combinedArray.push(e))
    slice2.forEach(e => combinedArray.push(e))
    return combinedArray
}
