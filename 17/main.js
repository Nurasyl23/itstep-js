/*
Используя дерево папок с урока, вывести в консоль а. с отступами
С:
  Folder 1 
    Folder 1.1 
    Folder 1.2 
      Folder 1.2.1
  Fodler 2
    Folder 2.1

б*. с "иконками" С: +-Folder 1 | +-Folder 1.1 | +-Folder 1.2 | +-Folder 1.21 +-Fodler 2 Folder 2.1

C яблоками + файл events.js с занятия:
Перевести все логирование внутри while на систему событий - подписчиков
Добавить подписчика, который будет накапливать массив транзакций, который дальше передастся в log.statistics(transactions);
*/
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
const getAllPathes = (folder, parentPath = "") => {
  const path = parentPath + folder.name + "/"; 
  return [path, folder.children.map(subfolder => getAllPathes(subfolder, path))].flat(Infinity);
}

const getAllGaps = (folder, parentGap = "  ") => {
  arr = [folder.name, folder.children.map(subfolder => parentGap + getAllGaps(subfolder))].flat(Infinity);
  return '\n' + arr
}

console.log(getAllFolders(root));
console.log(getAllPathes(root));
console.log(getAllGaps(root));
