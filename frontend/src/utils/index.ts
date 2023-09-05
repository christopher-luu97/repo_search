import { TreeNode, DataObject } from "../common/types";

export function convertListFileToObjectParentTree(list: File[]): TreeNode {
    const obj: TreeNode = {};
    
    list.forEach((item: { webkitRelativePath: string; }) => {
      const splitPath = item.webkitRelativePath.split('/');
          
      if (splitPath.length === 1) {
        obj[splitPath[0]] = null; // Assign to null for leaf nodes (files)
      } else {
        let tempPointer: TreeNode = obj;
        let i = 0;
        while (i < splitPath.length - 1) {
          if (!tempPointer[splitPath[i]]) {
            tempPointer[splitPath[i]] = {};
          }
          tempPointer = tempPointer[splitPath[i]] as TreeNode;
          i++;
        }
        tempPointer[splitPath[i]] = null; // Assign to null for leaf nodes (files)
      }
    });
    return obj;
  };
  
  
  export const readTemplate = (template: TreeNode, data: DataObject): DataObject => {
    for (const [key, value] of Object.entries(template)) {
      data[key] = {
        index: key,
        canMove: true,
        isFolder: value !== null,
        children: value !== null ? Object.keys(value || {}) : undefined,
        data: key,
        canRename: true
      };
  
      if (value !== null) {
        readTemplate(value, data);
      }
    }
    return data;
  };