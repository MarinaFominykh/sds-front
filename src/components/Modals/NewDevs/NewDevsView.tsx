import { FC } from "react";
import { DragDropFileUpload } from "./components/DragDropFileUpload/DragDropFileUpload";
interface Props {
  message: string;
  validDevsNumbers: string[];
  inValidDevsNumbers: string[];
  duplicatesDevsNumbers: string[];
  isSuccessSave: boolean;
  isErrorSave: boolean;
  isLoading: boolean;
}
export const NewDevsView: FC<Props> = (props) => {
  const { ...other } = props;
  return (
    <div style={{ padding: 50 }}>
      <DragDropFileUpload {...other} />
    </div>
  );
};
