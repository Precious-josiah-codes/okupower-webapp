const BranchLoader = () => {
  return (
    <div className="bg-white px-6 2xl:px-9 py-9  rounded-xl">
      <div className="animate-pulse space-y-7">
        <div className="grid grid-cols-3 gap-4 items-center">
          <div className="h-[2rem] bg-slate-300 rounded col-span-2"></div>
          <div className="space-y-1 flex flex-col items-end">
            <div className="h-[5px] w-[5px] bg-slate-300 rounded-full" />
            <div className="h-[5px] w-[5px] bg-slate-300 rounded-full" />
            <div className="h-[5px] w-[5px] bg-slate-300 rounded-full" />
          </div>
        </div>
        <div className="grid grid-cols-3 gap-4">
          <div className="h-4 bg-slate-300 rounded col-span-2"></div>
          <div className="h-4 bg-slate-300 rounded col-span-1"></div>
        </div>
        <div className="grid grid-cols-3 gap-4">
          <div className="h-4 bg-slate-300 rounded col-span-1"></div>
          <div className="h-4 bg-slate-300 rounded col-span-2"></div>
        </div>
        <div className="grid grid-cols-3 gap-4">
          <div className="h-4 bg-slate-300 rounded col-span-2"></div>
          <div className="h-4 bg-slate-300 rounded col-span-1"></div>
        </div>
      </div>
    </div>
  );
};

export default BranchLoader;
