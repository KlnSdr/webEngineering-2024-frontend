import { useEffect, useState, useRef } from "react";
import Image from "react-bootstrap/Image";
import { Tooltip } from "react-bootstrap";
import { Button } from "react-bootstrap";
import { Overlay } from "react-bootstrap";
import "../style/UserInfo.css";
import { UserService } from "../services/UserService";
import { CurrentUser } from "../types/Users";

/**
 * UserInfo component displays user information including profile image and username.
 * It also provides a tooltip with a logout button.
 * @returns {JSX.Element} The rendered UserInfo component.
 */
const UserInfo = () => {
  const [image, setImage] = useState(process.env.REACT_APP_USER_DEFAULT_IMAGE);
  const [displayName, setDisplayName] = useState("...");
  const [showTooltip, setShowTooltip] = useState(false);
  const target = useRef(null);

  useEffect(() => {
    UserService.getUserInfo()
      .then((data: CurrentUser) => {
        if (data.profileImage !== null) {
          setImage(data.profileImage);
        }
        setDisplayName(data.username);
      })
      .catch((_) => {
        // todo: handle error
      });
  }, []);

  /**
   * Toggles the visibility of the tooltip.
   */
  const handleToggleTooltip = () => setShowTooltip(!showTooltip);

  /**
   * Handles the logout action.
   */
  const handleLogout = () => {
    UserService.doLogout(); // Replace this with the actual logout function
  };

  return (
    <div>
      <span
        ref={target}
        onClick={handleToggleTooltip}
        style={{ cursor: "pointer" }}
      >
        {displayName}
      </span>
      <Image
        src={image}
        className="avatar"
        onClick={handleToggleTooltip}
        style={{ cursor: "pointer", marginLeft: "10px" }}
        ref={target}
      />

      <Overlay target={target.current} show={showTooltip} placement="bottom">
        {(props) => (
          <Tooltip id="overlay-tooltip" {...props}>
            <Button onClick={handleLogout}>
              Abmelden
            </Button>
          </Tooltip>
        )}
      </Overlay>
    </div>
  );
};

export default UserInfo;