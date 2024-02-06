const TableLoader = () => {
  return (
    <div className="bg-white px-6 2xl:px-9 py-9  rounded-xl">
      <div className="animate-pulse space-y-7">
        <div className="grid grid-cols-6 gap-4 items-center">
          <div className="flex items-center space-x-9 col-span-2 h-4">
            <div className="space-y-1 flex flex-col items-end">
              <div className="h-[5px] w-[5px] bg-slate-300 rounded-full" />
              <div className="h-[5px] w-[5px] bg-slate-300 rounded-full" />
              <div className="h-[5px] w-[5px] bg-slate-300 rounded-full" />
            </div>
            <div className="h-[2rem] flex-1 rounded bg-slate-300 " />
          </div>
          <div className="h-[2rem] rounded bg-slate-300" />
          <div className="h-[2rem] rounded bg-slate-300" />
          <div className="h-[2rem] rounded bg-slate-300" />
          <div className="h-[2rem] rounded bg-slate-300" />
        </div>
        <div className="h-14 bg-slate-300 rounded "></div>
        <div className="h-14 bg-slate-300 rounded "></div>
        <div className="h-14 bg-slate-300 rounded "></div>
        <div className="h-14 bg-slate-300 rounded "></div>
        <div className="h-14 bg-slate-300 rounded "></div>
      </div>
    </div>
  );
};

export default TableLoader;
