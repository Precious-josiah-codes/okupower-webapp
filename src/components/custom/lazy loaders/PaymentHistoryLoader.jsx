const PaymentHistoryLoader = () => {
  return (
    <div className=" sm:flex-1 rounded-md px-4 py-6 bg-white h-[10.3rem]">
      <div className="animate-pulse">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-5">
            <div className="rounded-full bg-slate-300 h-6 w-6" />
            <div className="h-4 w-20 bg-slate-300 rounded"></div>
          </div>
          <div>
            <div className="h-4 w-20 bg-slate-300 rounded"></div>
          </div>
        </div>
        <div className="flex-1 py-1 mt-6">
          <div className="h-10 w-[8rem] bg-slate-300 rounded"></div>
        </div>
      </div>
    </div>
  );
};

export default PaymentHistoryLoader;
