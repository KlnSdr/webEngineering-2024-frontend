import { useEffect } from "react";
import "../style/CreateRecipeView.css";
import {UserService} from "../services/UserService";
import {useNavigate} from "react-router-dom";

function CreateSurveyView() {
  const navigate = useNavigate();
  useEffect(() => {
      UserService.isLoggedIn().then((isLoggedIn: boolean) => {
          if (!isLoggedIn) {
              navigate("/login");
          }
      });
  }, [navigate]);

  return (
    <div>
    </div>
  );
}

export default CreateSurveyView;
