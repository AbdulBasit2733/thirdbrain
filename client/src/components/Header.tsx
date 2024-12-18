import Button from "./Button";
import ShareIcon from "./Icons/ShareIcon";
import ProfileIcon from "./Icons/ProfileIcon";
import LogoutIcon from "./Icons/LogoutIcon";
import { useAppDispatch, useAppSelector } from "../hooks/hooks";
import { logoutUser } from "../store/auth-slice";
import { toast } from "react-toastify";
import { createShareLink } from "../store/content-slice";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const { username } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  return (
    <div className="flex gap-3 items-center justify-end border-b border-slate-100 p-3">
      <Button
        variant="secondary"
        text={"Share Brain"}
        startIcon={<ShareIcon />}
        onClick={() => {
          dispatch(createShareLink())
            .then(async (data) => {
              if (data.payload.success) {
                const shareLink =
                  data.payload.link || `/share/${data.payload.hash}`;
                await window.navigator.clipboard.writeText(
                  `http://localhost:5173/share-content${shareLink}`
                );
                toast.success("Share link copied to clipboard!");
                // navigate('/share-content')
              } else {
                toast.error(
                  data.payload.message || "Failed to create share link."
                );
              }
            })
            .catch(() => {
              toast.error("An unexpected error occurred.");
            });
        }}
      />
      <Button
        startIcon={<ProfileIcon />}
        text={username ? username : "null"}
        variant="secondary"
      />

      <div className="px-5">
        <Button
          onClick={() => {
            dispatch(logoutUser()).then((data) => {
              if (data.payload.success) {
                toast.success(data.payload.message);
              } else {
                toast.error("Logout Failed");
              }
            });
          }}
          startIcon={<LogoutIcon />}
          text={"Logout"}
          variant="primary"
          fullWidth={true}
        />
      </div>
      {/* <div className="relative">
        <button
          onMouseEnter={() => setDropdownOpen(!dropdownOpen)}
          onMouseLeave={() => setDropdownOpen(!dropdownOpen)}
          className=""
        >
          <AccountIcon />
          {dropdownOpen && (
            <div
              onMouseEnter={() => setDropdownOpen(true)}
              onMouseLeave={() => setDropdownOpen(false)}
              className="absolute bottom-[-2rem] flex flex-col items-start gap-y-2 right-0 shadow-lg bg-white rounded-md w-36 py-3"
            >
              <Link
                to={"/profile"}
                className="flex items-center gap-x-2 hover:bg-indigo-50 px-2 w-full py-1"
              >
                <ProfileIcon />
                <h1
                  className="text-sm
                "
                >
                  {user.username}
                </h1>
              </Link>
              <Link
                to={"/profile"}
                className="flex items-center gap-x-2 hover:bg-indigo-50 px-2 w-full py-1"
              >
                <SettingsIcon /> <h1 className="text-sm ">Settings</h1>
              </Link>
              <div className="px-5">
                <Button
                  startIcon={<LogoutIcon />}
                  text={"Logout"}
                  variant="primary"
                  fullWidth={true}
                  onClick={() =>
                    dispatch(LogoutUser()).then((data) => {
                      if (data.payload.success) {
                        toast.success(data.payload.message);
                      } else {
                        toast.error(data.payload.message);
                      }
                    })
                  }
                />
              </div>
            </div>
          )}
        </button>
      </div> */}
    </div>
  );
};

export default Header;
