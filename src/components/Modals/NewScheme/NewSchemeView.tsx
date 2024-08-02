import { FC } from "react";
import { DragDropFileUpload } from "./components/DragDropFileUpload/DragDropFileUpload";

interface Props {
  message: string;
  isSuccessSave: boolean;
  isErrorSave: boolean;
}
export const NewSchemeView: FC<Props> = (props) => {
  const { ...other } = props;
  return (
    <div style={{ padding: 50 }}>
      <DragDropFileUpload {...other} />
    </div>
  );
};
