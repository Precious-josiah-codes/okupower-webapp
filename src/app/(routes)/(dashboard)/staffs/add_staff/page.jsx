"use client";

import AddStaffForm from "@/components/custom/AddStaffForm";
import AddStaffInvite from "@/components/custom/AddStaffInvite";
import { useState } from "react";

const AddStaff = () => {
  const [date, setDate] = useState();
  return (
    <section className="flex justify-between space-x-6 pt-9 h-full">
      {/* staff progress */}
      <div>
        <h1 className="text-primaryColor font-bold text-xl mb-3">
          Staff Registration Form
        </h1>
        <p className="border-b border-black pb-2">
          Fill in your staff details below
        </p>
        <div className="mt-6 space-y-4 border-l-2 border-gray-300">
          <h1 className="border-l-[3px] pl-4 border-primaryColor font-semibold">
            User Profile
          </h1>
          <h1 className="border-l-[3px] pl-4">Invite</h1>
        </div>
      </div>

      {/* form */}
      {false && <AddStaffForm date={date} setDate={setDate} />}

      {/* invite */}
      {true && <AddStaffInvite />}
    </section>
  );
};

export default AddStaff;
