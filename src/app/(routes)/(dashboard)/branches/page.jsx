import OverviewCard from "@/components/custom/OverviewCard";

const Branches = () => {
  return (
    <section>
      {/* header */}

      {/* branches section */}
      <div className="grid sm:grid-cols-3 grid-cols-1 gap-5">
        <OverviewCard />
        <OverviewCard />
        <OverviewCard />
        <OverviewCard />
        <OverviewCard />
        <OverviewCard />
        <OverviewCard />
        <OverviewCard />
        <OverviewCard />
      </div>
    </section>
  );
};

export default Branches;
