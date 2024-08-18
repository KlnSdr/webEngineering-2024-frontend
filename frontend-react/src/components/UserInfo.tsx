import { useEffect, useState, useRef } from "react";
import Image from "react-bootstrap/Image";
import { Tooltip } from "react-bootstrap";
import { Button } from "react-bootstrap";
import { Overlay } from "react-bootstrap";
import "../style/UserInfo.css";
import { UserService } from "../services/UserService";

const UserInfo = () => {
  const [image, setImage] = useState(
    "https://upload.wikimedia.org/wikipedia/commons/e/ef/Pluto_in_True_Color_-_High-Res.jpg"
  );
  const [displayName, setDisplayName] = useState("...");
  const [showTooltip, setShowTooltip] = useState(false);
  const target = useRef(null);

  useEffect(() => {
    UserService.getUserInfo()
      .then((data: any) => {
        console.log(data);
        setImage(data.principal.attributes.avatar_url);
        setDisplayName(data.principal.attributes.name);
      })
      .catch((_) => {
        // todo
      });
  }, []);

  const handleToggleTooltip = () => setShowTooltip(!showTooltip);
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
