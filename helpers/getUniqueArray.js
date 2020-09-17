module.exports = (arr, key,key1)=>{
    return [...new Map(arr.map(item => [item[key]+"-"+item[key1], item])).values()]
};