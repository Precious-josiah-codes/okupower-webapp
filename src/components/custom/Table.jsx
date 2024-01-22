const Table = ({ data }) => {
  return (
    <section>
      <section className="bg-white py-4 rounded-xl text-sm">
        {/* header for desktop */}
        <div className="px-6 sm:block hidden">
          <div className="flex py-5 pl-6 font-bold">
            {data.header.map((header, index) => (
              <div className="flex-1" key={index}>
                {header}
              </div>
            ))}
          </div>
        </div>
        {/* body */}
        <div className="sm:h-[85vh] h-[65vh] w-[100%] overflow-y-auto sidebar text-[#515151]  px-6">
          {/* header for mobile */}
          <div className="sm:hidden block text-black w-full">
            <div className="flex py-5 pl-6 font-bold w-[50rem]">
              {data.header.map((header, index) => (
                <div className="flex-1" key={index}>
                  {header}
                </div>
              ))}
            </div>
          </div>
          {data.body.map((body, index) => (
            <div
              className="flex bg-[#cfcfcf42] py-6 pl-6 mb-3 rounded-[16px] hover:bg-[#0553321e] cursor-pointer text-[#51515] font-normal transition-all w-[50rem] sm:w-full"
              key={index}
            >
              {/* device */}
              <div className="flex-1">{body}</div>

              {/* type */}
              <div className="flex-1">
                <span className="font-medium">average decline</span>
              </div>

              {/* start date */}
              <div className="flex-1">01/01/23</div>

              {/* date resolved */}
              <div className="flex-1">02/02/23</div>

              {/* resolved */}
              {/* <div className="flex-1">
                <span
                  className={`text-sm rounded-full text-white px-3 py-1 ${
                    true ? "bg-[#0F732B]" : "bg-[#BF1D1D]"
                  }`}
                >
                  {true ? "resolved" : "Unresolved"}
                </span>
              </div> */}
            </div>
          ))}
        </div>
      </section>
    </section>
  );
};

export default Table;
