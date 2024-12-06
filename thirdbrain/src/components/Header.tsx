import React, { useState } from "react";
import { toast } from "react-toastify";
import Button from "./Button";
import LogoutIcon from "../Icons/LogoutIcon";
import { LogoutUser } from "../store/auth-slice";
import { Link } from "react-router-dom";
import SettingsIcon from "../Icons/SettingsIcon";
import ProfileIcon from "../Icons/ProfileIcon";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import BACKEND_URL from "../../config";
import axios from "axios";
import AccountIcon from "../Icons/AccountIcon";
import ShareIcon from "../Icons/ShareIcon";

const Header = () => {
  const { user } = useSelector((state) => state.auth);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dispatch = useDispatch();
  return (
    <div className="flex gap-3 items-center justify-end border-b p-3">
      <Button
        onClick={async () => {
          try {
            const response = await axios.post(
              `${BACKEND_URL}/api/v1/content/brain/share`,
              {
                share: true,
              },
              { withCredentials: true }
            );
            console.log(response);

            const shareUrl = `http://localhost:5173/share/${response.data.hash}`;
            await window.navigator.clipboard.writeText(shareUrl);
            toast.success("Copied The Url");
          } catch (error) {
            console.log(error);
            toast.error(error?.message);
          }
        }}
        variant="secondary"
        text={"Share Brain"}
        startIcon={<ShareIcon />}
      />
      <Button
        startIcon={<ProfileIcon />}
        text={user.username}
        variant="secondary"
      />

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
