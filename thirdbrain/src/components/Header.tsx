import { toast } from "react-toastify";
import Button from "./Button";
import LogoutIcon from "../Icons/LogoutIcon";
import { LogoutUser } from "../store/auth-slice";
import ProfileIcon from "../Icons/ProfileIcon";
import { useSelector } from "react-redux";
import axios from "axios";
import ShareIcon from "../Icons/ShareIcon";
import { RootState } from "../store/store";
import { useAppDispatch } from "../hooks/useAppDispatch";

interface AuthResponse {
  success: boolean;
  user?: User;
  message?: string;
}
interface User {
  _id: string;
  username: string;
}

const Header: React.FC = () => {
  const { user } = useSelector((state: RootState) => state.auth);
  const dispatch = useAppDispatch();

  const handleShareBrain = async () => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_BASEURL}/api/v1/content/brain/share`,
        { share: true },
        { withCredentials: true }
      );
      if (!process.env.VITE_FRONTEND_URL) {
        const shareUrl = `${process.env.VITE_FRONTEND_URL}/share/${response.data.hash}`;
        await window.navigator.clipboard.writeText(shareUrl);
        toast.success("Copied the URL");
      } else {
        const shareUrl = `http://localhost:5173/share/${response.data.hash}`;
        await window.navigator.clipboard.writeText(shareUrl);
        toast.success("Copied the URL");
      }
    } catch (error: any) {
      console.error(error);
      toast.error(error?.message || "An error occurred");
    }
  };

  const handleLogout = async () => {
    try {
      const result = await dispatch(LogoutUser());
      const payload = result.payload as AuthResponse; // Type assertion to ensure payload shape

      if (payload.success) {
        toast.success(payload.message || "Logout successful");
      } else {
        toast.error(payload.message || "Logout failed");
      }
    } catch (error) {
      toast.error("An error occurred during logout.");
    }
  };

  return (
    <div className="flex gap-3 items-center justify-end border-b p-3">
      <Button
        onClick={handleShareBrain}
        variant="secondary"
        text="Share Brain"
        startIcon={<ShareIcon />}
      />

      {user && (
        <Button
          startIcon={<ProfileIcon />}
          text={user.username}
          variant="secondary"
        />
      )}

      <div className="px-5">
        <Button
          startIcon={<LogoutIcon />}
          text="Logout"
          variant="primary"
          fullWidth
          onClick={handleLogout}
        />
      </div>
    </div>
  );
};

export default Header;
