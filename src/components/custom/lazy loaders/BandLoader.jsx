const BandLoader = () => {
  return (
    <div className=" sm:flex-1 sm:min-w-0 min-w-[70%] rounded-md px-4 py-6 bg-white h-[14rem]">
      <div className="animate-pulse">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-5">
            <div className="rounded-lg bg-slate-300 h-10 w-10" />
            <div className="h-4 w-20 bg-slate-300 rounded"></div>
          </div>
          <div className="space-y-1 flex flex-col items-end">
            <div className="h-[5px] w-[5px] bg-slate-300 rounded-full" />
            <div className="h-[5px] w-[5px] bg-slate-300 rounded-full" />
            <div className="h-[5px] w-[5px] bg-slate-300 rounded-full" />
          </div>
        </div>
        <div className="flex-1 py-1 mt-6">
          <div className="space-y-12">
            <div className="h-10 w-[8rem] bg-slate-300 rounded"></div>
            <div className="grid grid-cols-3 gap-x-4">
              <div className="h-4 rounded col-span-2"></div>
              <div className="h-6 bg-slate-300 rounded col-span-1"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BandLoader;
