export interface FolderItem {
    name: string;
    type: string;
    path:string;
    items: [];
  }


export interface TreeNode {
    [key: string]: TreeNode | null;
  }
  

export interface DataObject {
    [key: string]: {
      index: string;
      canMove: boolean;
      isFolder: boolean;
      children?: string[];
      data: string;
      canRename: boolean;
    };
  }