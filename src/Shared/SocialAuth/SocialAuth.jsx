import "./SocialAuth.css";
import { FcGoogle } from "react-icons/fc";
import { FiGithub } from "react-icons/fi";

const SocialAuth = ({ mt = 0 }) => {
    return (
        <div className="socialAuthWrapper" style={{ marginTop: `${mt}px` }}>

            <h1>Or login with</h1>
            <div className="authentications">
                <div className="socialBox">
                    <FcGoogle />
                </div>
                <div className="socialBox">
                    <FiGithub />
                </div>
            </div>
        </div>
    );
};

export default SocialAuth;