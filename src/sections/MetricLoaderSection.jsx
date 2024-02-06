import MetricLoader from "@/components/custom/lazy loaders/MetricLoader";

const MetricLoaderSection = () => {
  return (
    <section className="flex justify-between space-x-3 mt-6 w-[100%] overflow-x-auto ">
      <MetricLoader />
      <MetricLoader />
      <MetricLoader />
      <MetricLoader />
    </section>
  );
};

export default MetricLoaderSection;
