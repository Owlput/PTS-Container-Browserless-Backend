import { readdir } from 'fs/promises';

let fileNameRaw = []
let fileNameProcessed = []
try {
  const files = await readdir("./tools");
  for (const file of files)
       fileNameRaw.push(file)
} catch (err) {
  console.error(err);
}
for(filename of fileNameRaw){
    fileNameProcessed.push(
        ()=>{}
    )
}