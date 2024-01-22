import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Terminal } from "lucide-react";

const Alerts = ({ type, title, message }) => {
  return (
    <div className="absolute top-6 w-full flex justify-center animate-in">
      <div>
        <Alert
          className={`${
            type === "error" ? "bg-red-500" : "bg-green-500"
          } text-white w-[30rem]`}
        >
          <Terminal className="h-4 w-4" />
          <AlertTitle>{title}</AlertTitle>
          <AlertDescription>{message}</AlertDescription>
        </Alert>
      </div>
    </div>
  );
};

export default Alerts;
