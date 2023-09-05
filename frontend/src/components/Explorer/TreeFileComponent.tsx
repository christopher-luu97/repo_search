import {
    UncontrolledTreeEnvironment,
    Tree,
    StaticTreeDataProvider,
    TreeItemIndex,
    TreeItem
  } from "react-complex-tree";
  import "react-complex-tree/lib/style-modern.css";
  
export interface TreeFileComponentProps {
    data: Record<TreeItemIndex, TreeItem>;
    root: string;
    onSelectItems: (items: TreeItemIndex[], treeId: string) => void;
  }
  
  export function TreeFileComponent(props: TreeFileComponentProps) {
    const { data, root, onSelectItems } = props;
  
    return (
      <UncontrolledTreeEnvironment
        dataProvider={
          new StaticTreeDataProvider(data, (item, data) => ({
            ...item,
            data
          }))
        }
        getItemTitle={(item) => {
          const splitPath = item.data.split("/");
          return splitPath[splitPath.length - 1];
        }}
        viewState={{}}
        onSelectItems={onSelectItems}
      >
        <Tree treeId={root} rootItem={root} treeLabel={root} />
      </UncontrolledTreeEnvironment>
    );
  }