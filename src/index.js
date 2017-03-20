import path from 'path'
import fs from 'fs-extra'
import strftime from 'strftime'

import { movieFileExtensions, imageFileExtensions} from './constants'
import { getFileListRecursive } from './helpers'

const targetPath = process.argv[2] || '../testDir'
const fullPath = path.resolve(__dirname,targetPath)

const fileList = getFileListRecursive(fullPath)

fileList.map((filePath)=>{
  const stats = fs.lstatSync(filePath)
  // references the older time
  const creationTime = stats.birthtime < stats.mtime ? stats.birthtime : stats.mtime
  const fileName = filePath.replace(/^.*[\\\/]/,'')
  const extension = path.extname(fileName).toLowerCase().substring(1)

  if(movieFileExtensions.includes(extension)){
    // THIS IS A MOVIE
    const newPath = `${fullPath}/video/${strftime('%Y/%y%m%d',creationTime)}/${fileName}`
    fs.copySync(filePath,newPath,{preserveTimestamps:true}) 

  }else if(imageFileExtensions.includes(extension)){
    // THIS IS A IMAGE
    const newPath = `${fullPath}/image/${strftime('%Y/%y%m%d',creationTime)}/${fileName}`
    fs.copySync(filePath,newPath,{preserveTimestamps:true}) 

  }else{
    console.log(`ignored:${extension} @ ${filePath}`)
    console.log(' ')
    
  }
})

console.log('***done***')


