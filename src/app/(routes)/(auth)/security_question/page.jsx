import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

const SecurityQuestion = () => {
  return (
    <main className="bg-[#0000000a] h-screen flex justify-center items-center space-y-6">
      <section className="flex flex-col justify-center items-center sm:w-[40rem] h-[28rem] ">
        {/* text content */}
        <div className="space-y-3 text-center capitalize mb-12">
          <h1 className="text-xl font-semibold ">choose a security question</h1>
          <p className="text-primaryColor">
            pick one question for security purposes
          </p>
        </div>

        {/* radio button field */}
        <div className="w-full bg-transparent rounded-md mb-12">
          <RadioGroup
            defaultValue="option-one"
            className="flex sm:flex-row flex-col justify-between"
          >
            <div className="space-y-9">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="option-one" id="option-one" />
                <Label htmlFor="option-one" className="cursor-pointer">
                  what is your best color
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="option-two" id="option-two" />
                <Label htmlFor="option-two" className="cursor-pointer">
                  what state were your born in?
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="option-three" id="option-three" />
                <Label htmlFor="option-three" className="cursor-pointer">
                  what month were you born?
                </Label>
              </div>
            </div>
            <div className="space-y-9 sm:mt-0 mt-6">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="option-four" id="option-four" />
                <Label htmlFor="option-four" className="cursor-pointer">
                  what is your best food
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="option-five" id="option-five" />
                <Label htmlFor="option-five" className="cursor-pointer">
                  what is your fathers name?
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="option-six" id="option-six" />
                <Label htmlFor="option-six" className="cursor-pointer">
                  when is your birthday?
                </Label>
              </div>
            </div>
          </RadioGroup>
        </div>

        {/* input fields */}
        <div className="flex w-full items-center space-x-2 mb-6">
          <Input
            type="text"
            placeholder="Enter your answer"
            className="sm:w-[40rem] w-full bg-transparent rounded-md border border-green-800 ring-1 ring-black "
          />
        </div>

        {/* submit otp button */}
        <Button
          type="submit"
          className="sm:w-[40rem] w-full bg-primaryColor hover:bg-primaryColor"
        >
          Send
        </Button>
      </section>
    </main>
  );
};

export default SecurityQuestion;
