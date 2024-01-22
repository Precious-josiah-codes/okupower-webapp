import { Button } from "../ui/button";

const AddStaffInvite = () => {
  return (
    <div className="flex-1 bg-white p-6 rounded-xl text-center space-y-6">
      <h1>
        An invitation would be sent to joy via email to join the okupower power
        dashboard team,click on summit to send hem the invite{" "}
      </h1>
      <Button className="bg-primaryColor text-white px-6">Submit</Button>
    </div>
  );
};

export default AddStaffInvite;
