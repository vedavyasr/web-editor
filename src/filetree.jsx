import { FaFolder, FaFile } from "react-icons/fa";
import FolderTree, { testData } from "react-folder-tree";

// import { SiJavascript as FileIcon } from "react-icons";

const FileTree = ({ data, onNameClick }) => {
  const FileIcon = ({ onClick: defaultOnClick, nodeData }) => {
    const { path, name, checked, isOpen, ...restData } = nodeData;

    // custom event handler
    const handleClick = () => {
      defaultOnClick();
    };

    // custom Style
    return <FaFile  onClick={handleClick} />;
  };
  const FolderIcon = ({ onClick: defaultOnClick }) => {
    // custom event handler
    const handleClick = () => {
      defaultOnClick();
    };

    return <FaFolder   onClick={handleClick} />;
  };
  const FolderOpenIcon= FolderIcon
  return (
    <FolderTree
      data={data}
      showCheckbox={false}
      onNameClick={onNameClick}
      readOnly
      iconComponents={{
        FileIcon,
        FolderIcon,
        FolderOpenIcon
      }}
    />
  );
};
export default FileTree;
