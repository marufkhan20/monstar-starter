import { useSession } from "next-auth/react";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { Droplet, FileText, Settings, Star, User } from "react-feather";
import { MdOutlineGeneratingTokens } from "react-icons/md";
import { TfiPackage } from "react-icons/tfi";
import { DropdownItem } from "reactstrap";
import user1 from "../../assets/images/users/user1.jpg";

const ProfileDD = () => {
  const { data: session } = useSession();
  const { name, image, email } = session?.user || {};

  const [user, setUser] = useState({});

  useEffect(() => {
    async function fetchData() {
      const res = await fetch(`http://localhost:3000/api/users/${email}`);
      const json = await res.json();

      setUser(json);
    }

    fetchData();
  }, [session]);
  return (
    <div>
      <div className="d-flex gap-3 p-3 border-bottom pt-2 align-items-center">
        <Image
          src={image || user1}
          alt="user"
          className="rounded-circle"
          width="60"
          height="60"
        />
        <span>
          <h6 className="mb-0">{name || "John Doe"}</h6>
          <small>{email}</small>
        </span>
      </div>
      <DropdownItem className="px-4 py-3">
        <TfiPackage style={{ fontSize: "18px" }} />
        &nbsp; Package :{" "}
        <span>
          {user?.package === "free"
            ? "Free Trial"
            : user?.package?.toUpperCase()}
        </span>
      </DropdownItem>
      <DropdownItem className="px-4 py-3">
        <MdOutlineGeneratingTokens style={{ fontSize: "20px" }} />
        &nbsp; Tokens :{" "}
        <span>
          {user?.package === "free" ? "Unlimited for 3 days." : user?.tokens}
        </span>
      </DropdownItem>
      <DropdownItem className="px-4 py-3">
        <User size={20} />
        &nbsp; My Profile
      </DropdownItem>
      <DropdownItem className="px-4 py-3">
        <FileText size={20} />
        &nbsp; Edit Profile
      </DropdownItem>
      <DropdownItem className="px-4 py-3">
        <Star size={20} />
        &nbsp; My Balance
      </DropdownItem>
      <DropdownItem className="px-4 py-3">
        <Droplet size={20} />
        &nbsp; Customize
      </DropdownItem>
      <DropdownItem divider />
      <DropdownItem className="px-4 py-3">
        <Settings size={20} />
        &nbsp; Settings
      </DropdownItem>
      <DropdownItem divider />
    </div>
  );
};

export default ProfileDD;
