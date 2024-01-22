import { SortableContext, useSortable } from "@dnd-kit/sortable";

import { CSS } from "@dnd-kit/utilities";
import { useMemo, useState } from "react";
import PlusIcon from "@/icons/PlusIcon";
import TrashIcon from "@/icons/TrashIcon";
import TaskCard from "./TaskCard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisVertical, faPlus } from "@fortawesome/free-solid-svg-icons";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import GiveBonusModal from "./GiveBonusModal";
import ConfirmDelete from "./ConfirmDelete";

function ColumnContainer({
  column,
  deleteColumn,
  updateColumn,
  createTask,
  tasks,
  deleteTask,
  updateTask,
}) {
  const [editMode, setEditMode] = useState(false);
  console.log(tasks, "this is the task");

  const tasksIds = useMemo(() => {
    return tasks.map((task) => task.id);
  }, [tasks]);

  const {
    setNodeRef,
    attributes,
    listeners,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: column.id,
    data: {
      type: "Column",
      column,
    },
    disabled: editMode,
  });

  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  };

  if (isDragging) {
    return (
      <div
        ref={setNodeRef}
        style={style}
        className="
        bg-red-900
        opacity-40
        border-2
        border-pink-500
        w-[350px]
        h-[500px]
        max-h-[500px]
        rounded-md
        flex
        flex-col
        "
      ></div>
    );
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="
      w-[350px] 2xl:w-[400px]
      h-[500px]
      max-h-[500px]
      rounded-md
      flex
      flex-col
      "
    >
      {/* Column title */}
      <div
        {...attributes}
        {...listeners}
        className="
      text-md
      h-[60px]
      cursor-grab
      rounded-md
      rounded-b-none
      font-bold
      border-columnBackgroundColor
      flex
      items-center
      justify-between
      bg-white border-4 border-b-[#0A8C55] py-3 px-4
      "
      >
        <div className="flex justify-between w-full">
          <div className="flex space-x-3">
            <h1 className="">
              Band <span className="uppercase">{column.id}</span>
            </h1>
            <div
              className="
            flex
            justify-center
            items-center
            bg-primaryColor
            px-3
            text-white
            text-[0.70rem]
            rounded-full
            "
            >
              {column.totalBand}
            </div>
          </div>
          <Popover>
            <PopoverTrigger>
              <FontAwesomeIcon icon={faEllipsisVertical} />
            </PopoverTrigger>
            <PopoverContent className="px-0 w-[11.5rem] text-sm">
              <ul>
                <li className="hover:bg-nurseryColor py-3 px-6 cursor-pointer">
                  <GiveBonusModal />
                </li>
                <li className="hover:bg-nurseryColor py-3 px-6 cursor-pointer">
                  <ConfirmDelete
                    headerTitle="Delete All"
                    description="Are you sure you want to delete all device"
                  />
                </li>
                <li className="hover:bg-nurseryColor py-3 px-6 cursor-pointer">
                  <ConfirmDelete
                    headerTitle="Delete Band"
                    description="Are you sure you want to delete band"
                  />
                </li>
              </ul>
            </PopoverContent>
          </Popover>
        </div>
      </div>

      {/* Column task container */}
      <div className="flex flex-grow flex-col gap-[6rem]  overflow-x-hidden overflow-y-auto pt-[3.5rem]">
        <SortableContext items={tasksIds}>
          {tasks.map((task) => (
            <TaskCard task={task} />
          ))}
        </SortableContext>
      </div>
    </div>
  );
}

export default ColumnContainer;
