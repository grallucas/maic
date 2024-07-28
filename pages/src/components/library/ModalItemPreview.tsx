import {Button} from "@mui/material";
import {Link} from "react-router-dom";
import tempImage from "./assets/library/images/temp-image.jpg";
import readNowImage from "./assets/library/images/readNow.png";
import favoriteImage from "./assets/library/images/favorite.png";
interface ModalItemPreviewProps {
    articleId?: string;
}

/* Creates a tag from a string that links to a page referring to all pages containing that tag*/
const createTag = (tags: string[]) => {

    return (
        <div className={"page-tags"}>
            {tags.map(
                    (tag:string) => {
                        return (
                            <Link
                                to={"/library/tags?=" + tag}
                                target="_blank"
                                rel="noopener noreferrer"
                                className={"page-tag"}>
                                {tag}
                            </Link>
                        )
                    }
                )
            }
        </div>
    );
}

const ModalItemPreview = (props: ModalItemPreviewProps) => {
    return (
        <div className={"page-preview"}>
            <img src={tempImage} alt="Preview" style={{width: "80%"}} className="modal-item-preview-image"/>
            <div className="modal-item-preview-header">
                <h2>
                    Demo Article - A Fantastic Search into the World of Web Development
                </h2>
                <div className="like-buttom">
                    <img className="like-image" src={favoriteImage} alt={"Like Button"} />
                </div>
            </div>

            <p className="authors">
                Haile A., Paulson B., et al.
            </p>
            <div className="page-reading-information">
                <p className="page-length">
                    9 Pages
                </p>
                <p className="page-time">
                    15 Minute Read
                </p>
            </div>
            <p className="page-description">
                Lorem ipsum odor amet, consectetuer adipiscing elit. Quis augue non non malesuada aptent leo dolor. Feugiat in quam torquent, ultrices taciti montes. Eu class ullamcorper aenean eleifend donec. Lobortis pretium curabitur elit; faucibus finibus rhoncus vehicula. Amet sit lobortis iaculis amet, orci condimentum netus. Luctus ipsum nibh convallis tristique per diam torquent. Lacus in dis ut adipiscing suspendisse cras aliquet.

                Neque praesent rhoncus ullamcorper mattis sapien etiam vehicula sapien ultrices. Enim netus ornare phasellus cras nunc ridiculus massa. Habitant mauris duis, elit dapibus ad lorem ornare augue. Neque quis aenean condimentum a odio cubilia magnis dictum condimentum. Imperdiet felis luctus montes euismod duis elementum. Turpis integer ut sit non imperdiet molestie augue duis. Dignissim consequat molestie aliquam curae; amet gravida convallis pulvinar? Fames himenaeos vestibulum ullamcorper dolor tempus.
            </p>
            <Button variant="contained" sx={{ width: "100%" }} component={Link} to={`/library?nav=Articles&article=${props.articleId}`}>
                <div className="read-now-button">
                    Read Now
                    <img src={readNowImage} alt={"Read Now Image"}/>
                </div>
            </Button>
            {createTag(["VQ-VAE", "Time Series", "Seq2Seq", "MICS"])}
        </div>
    );
};

export default ModalItemPreview;