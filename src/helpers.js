import fs from 'fs-extra'

export function getFileListRecursive(directory, _array=[]){
  let filesList = []
  const fList = fs.readdirSync(directory) 
  fList.map((element)=>{
    const fullPath = `${directory}/${element}`
    if(fs.lstatSync(fullPath).isDirectory()){
      filesList = getFileListRecursive(fullPath,filesList)
    }else{
      filesList.push(fullPath)
    }
  })
  return filesList
}

