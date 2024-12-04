import React, { useState } from "react";
import CreateContentModal from "../../components/CreateContentModal";
import Sidebar from "../../components/Sidebar";
import Button from "../../components/Button";
import PlusIcon from "../../Icons/PlusIcon";
import ShareIcon from "../../Icons/ShareIcon";
import Card from "../../components/Card";
import useContent from "../../hooks/useContent";
import axios from "axios";
import BACKEND_URL from "../../../config";
import { toast } from "react-toastify";
import AccountIcon from "../../Icons/AccountIcon";
import { Link } from "react-router-dom";
import ProfileIcon from "../../Icons/ProfileIcon";
import SettingsIcon from "../../Icons/SettingsIcon";
import LogoutIcon from "../../Icons/LogoutIcon";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { LogoutUser } from "../../store/auth-slice";

const Dasboard = () => {
  const { user } = useSelector((state) => state.auth);
  const [modelOpen, setModelOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dispatch = useDispatch();
  const contents = useContent();

  return (
    <div className="flex w-full">
      <Sidebar />
      <div className="p-5 flex-1">
        <CreateContentModal
          open={modelOpen}
          onClose={() => setModelOpen(!open)}
        />

        <div className="flex gap-3 items-center justify-end border-b pb-3">
          <Button
            onClick={() => {
              setModelOpen(true);
            }}
            variant="primary"
            text={"Add Content"}
            startIcon={<PlusIcon />}
          />
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
          <div className="relative">
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
                  className="absolute bottom-[-8rem] flex flex-col items-start gap-y-2 right-0 shadow-lg bg-white rounded-md w-36 py-3"
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
          </div>
        </div>
        <div className=" flex gap-3 flex-wrap mt-10">
          {contents && contents.length === 0 ? (
            <h1 className="text-2xl font-semibold">
              No Content is Available Please Create Content First
            </h1>
          ) : (
            contents.map(({ type, title, link, _id }) => (
              <Card key={_id} type={type} title={title} link={link} />
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Dasboard;
