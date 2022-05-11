module.exports = {
  recursionDataTree(dataList, pid) {
    let resultList = []
    if (!dataList) return null
    for (const item of dataList) {
      let bmid_new = item["id"]
      let parentId = item["parentId"]
      if (pid == parentId) {
        const data = item
        let childrenList = this.recursionDataTree(dataList, bmid_new)
        if (childrenList) data["children"] = childrenList
        resultList.push(data)
      }
    }
    return resultList
  },
}