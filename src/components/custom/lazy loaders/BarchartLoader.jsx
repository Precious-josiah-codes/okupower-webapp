const BarchartLoader = () => {
  return (
    <div className="bg-white px-6 2xl:px-9 py-9  rounded-xl">
      <div className="animate-pulse space-y-7">
        <div className="grid grid-cols-8 items-end">
          <div className="h-[35px] w-[55px] bg-slate-300" />
          <div className="h-[55px] w-[55px] bg-slate-300" />
          <div className="h-[85px] w-[55px] bg-slate-300" />
          <div className="h-[280px] w-[55px] bg-slate-300" />
          <div className="h-[205px] w-[55px] bg-slate-300" />
          <div className="h-[95px] w-[55px] bg-slate-300" />
          <div className="h-[105px] w-[55px] bg-slate-300" />
          <div className="h-[15px] w-[55px] bg-slate-300" />
        </div>
      </div>
    </div>
  );
};

export default BarchartLoader;
