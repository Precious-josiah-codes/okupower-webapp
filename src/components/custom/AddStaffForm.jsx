import { format } from "date-fns";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendar } from "@fortawesome/free-solid-svg-icons";

const AddStaffForm = ({ date, setDate }) => {
  return (
    <div className="flex-1 bg-white p-6 rounded-xl">
      <div className="grid grid-cols-2 gap-4 py-4">
        {/* first column */}
        <div className="space-y-6">
          {/* full name */}
          <div>
            <Label htmlFor="fullName">Full Name</Label>
            <Input
              id="fullName"
              defaultValue="Pedro Duarte"
              className="mt-3 border-black"
              placeholder="Enter amount"
            />
          </div>

          {/* Email Address */}
          <div>
            <Label htmlFor="emailAddress">Email Address</Label>
            <Input
              id="emailAddress"
              defaultValue="Pedro Duarte"
              className="mt-3 border-black"
              placeholder="Enter amount"
            />
          </div>

          {/* Phone Number */}
          <div>
            <Label htmlFor="phoneNumber">Phone Number</Label>
            <Input
              id="phoneNumber"
              defaultValue="Pedro Duarte"
              className="mt-3 border-black"
              placeholder="Enter amount"
            />
          </div>

          {/* Position */}
          <div>
            <Label htmlFor="position">Position</Label>
            <Input
              id="position"
              defaultValue="Pedro Duarte"
              className="mt-3 border-black"
              placeholder="Enter amount"
            />
          </div>
        </div>

        {/* second column */}
        <div className="space-y-6">
          {/* Branch */}
          <div>
            <Label htmlFor="branch">Branch</Label>
            <Input
              id="branch"
              defaultValue="Pedro Duarte"
              className="mt-3 border-black"
              placeholder="Enter amount"
            />
          </div>

          {/* Address */}
          <div>
            <Label htmlFor="address">Address</Label>
            <Input
              id="address"
              defaultValue="Pedro Duarte"
              className="mt-3 border-black"
              placeholder="Enter amount"
            />
          </div>

          {/* Date of birth */}
          <div>
            <Label className="block ">Date of Birth</Label>
            <div className="mt-3">
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={"outline"}
                    className={cn(
                      " justify-start text-left font-normal border-black w-full",
                      !date && "text-muted-foreground"
                    )}
                  >
                    <FontAwesomeIcon icon={faCalendar} className="mr-6" />
                    {date ? format(date, "PPP") : <span>Pick a date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-between mt-6">
        <Button className="px-6 bg-transparent border border-black text-black hover:bg-transparent">
          Back
        </Button>
        <Button className="px-6 bg-primaryColor hover:bg-primaryColor">
          Next
        </Button>
      </div>
    </div>
  );
};

export default AddStaffForm;
