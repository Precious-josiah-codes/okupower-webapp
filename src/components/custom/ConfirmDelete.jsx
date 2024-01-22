import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "../ui/button";
import Loader from "./Loader";

const ConfirmDelete = ({
  headerTitle,
  description,
  handleDeleteFn,
  loader,
  itemToDelete,
}) => {
  return (
    <Dialog className="bg-black/80 ">
      <DialogTrigger asChild>
        <span>{headerTitle}</span>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] max-w-[90%]">
        <DialogHeader>
          <DialogDescription className="text-center">
            {description}
          </DialogDescription>
        </DialogHeader>

        <DialogFooter>
          <DialogClose asChild>
            <Button
              type="submit"
              className="w-full bg-nurseryColor text-black hover:bg-nurseryColor"
            >
              Cancel
            </Button>
          </DialogClose>

          <Button
            type="submit"
            className="w-full bg-primaryColor"
            onClick={() => handleDeleteFn(itemToDelete)}
          >
            {loader ? <Loader /> : "Delete"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ConfirmDelete;
