const root = {
  name: "C:",
  children: [
    {
      name: "Folder 1",
      children: [{
        name: "Folder 1.1",
        children: []
      },
      {
        name: "Folder 1.2",
        children: [{
          name: "Folder 1.2.1",
          children: []
        }]
      }]
    },
    {
      name: "Folder 2",
      children: [{
        name: "Folder 2.1",
        children: []
      }]
    }
  ]
};

// C:
// Folder 1
// Fodler 1.1
// ...
const getAllFolders = (folder) => {
  return [folder.name, folder.children.map(subfolder => getAllFolders(subfolder))].flat(Infinity);
}

// C:/
// C:/Folder 1/
// C:/Folder 1/Fodler 1.1/
// ...
/*
const getAllPathes = (folder, parentPath = "") => {
  const path = parentPath + folder.name + "/"; 
  return [path, folder.children.map(subfolder => getAllPathes(subfolder, path))].flat(Infinity);
}
*/
const getAllPathes = (folder, parentPath = "") => {

  const path =  "  " + parentPath + folder.name; 
  return [path, folder.children.map(subfolder => getAllPathes(subfolder, path))].flat(Infinity);
}
console.log(getAllFolders(root));
console.log(getAllPathes(root));
