import { Button } from "@mui/material";
import "./assets/library/css/modal.css";
import tempImage from "./assets/library/images/temp-image.jpg";
import { useNavigate } from "react-router-dom";

interface ModalItemProps {
  articleId?: string;
  openPreview?: (articleId: string) => boolean;
}

const ModalItem = (props: ModalItemProps) => {
  const navigate = useNavigate();

  function handleRedict() {
    if (props.openPreview && props.articleId) {
      if (props.openPreview(props.articleId)) {
        navigate(`/library?nav=Articles&article=${props.articleId}`);
      }
    }
  }

  return (
    <Button sx={{ width: "100%" }} onClick={() => handleRedict()}>
      <div style={{ padding: "1rem" }}>
        <img src={tempImage} alt="Preview" style={{ width: "90%" }}></img>
        <h3 className="modal-item-header">
          Demo Article - A Fantastic Search into the World of Web Development
        </h3>
        <p className="authors">Haile A., Paulson B., et al.</p>
      </div>
    </Button>
  );
};

export default ModalItem;
