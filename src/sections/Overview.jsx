import OverviewCard from "@/components/custom/OverviewCard";

const Overview = () => {
  return (
    <section>
      <h1>Overview</h1>
      <div className="flex">
        <OverviewCard />
        <OverviewCard />
        <OverviewCard />
      </div>
    </section>
  );
};

export default Overview;
