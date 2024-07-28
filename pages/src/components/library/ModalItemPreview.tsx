import {Button} from "@mui/material";
import {Link} from "react-router-dom";
import tempImage from "./assets/library/images/temp-image.jpg";

interface ModalItemPreviewProps {
    articleId?: string;
}



const ModalItemPreview = (props: ModalItemPreviewProps) => {
    return (
        // <Button sx={{ width: "100%" }} component={Link} to={`/library?nav=Articles&article=${props.articleId}`}>
        //     <div style={{ padding: "1rem" }}>
        //         <img src={tempImage} alt="Preview" style={{ width: "90%" }}></img>
        //         <h3 className="modal-item-header">
        //             Demo Article - A Fantastic Search into the World of Web Development
        //         </h3>
        //         <p className="authors">Haile A., Paulson B., et al.</p>
        //     </div>
        // </Button>
        <div className={"pagePreview"}>
            <img src={tempImage} alt="Preview" style={{width: "90%"}}/>
            <h2 className="modal-item-preview">
                Demo Article - A Fantastic Search into the World of Web Development
            </h2>
            <p className="authors">
                Haile A., Paulson B., et al.
            </p>
            <p className="page-length">
                9 Pages
            </p>
            <p className="page-time">
                15 Minute Read
            </p>
            <p className="page-description">
                Lorem Ipsum
            </p>
            <Button sx={{ width: "100%" }} component={Link} to={`/library?nav=Articles&article=${props.articleId}`}>
            </Button>
            <div className={"page-tags"}>

            </div>
        </div>
    );
};

export default ModalItemPreview;