const MetricLoader = () => {
  return (
    <div className=" sm:flex-1 sm:min-w-0 min-w-[70%] rounded-md px-4 py-6 bg-white">
      <div className="animate-pulse">
        <div className="rounded-lg bg-slate-300 h-10 w-10"></div>
        <div className="flex-1 py-1 mt-6">
          <div className="space-y-4">
            <div className="h-3 w-[8rem] bg-slate-300 rounded"></div>
            <div className="grid grid-cols-3 gap-4">
              <div className="h-3 bg-slate-300 rounded col-span-1"></div>
              <div className="h-3 bg-slate-300 rounded col-span-2"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MetricLoader;
