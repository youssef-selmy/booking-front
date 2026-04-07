import Section from "../../../components/Section";
import Card from "../../../components/Card";

const features = [
  "Provider connection setup",
  "Reservation import and sync",
  "Connection status overview",
  "Field mapping and sync controls",
];

const ChannelManagement = () => {
  return (
    <Section extraPadding classname="px-5 pt-[110px]">
      <div className="max-w-5xl mx-auto flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <p className="text-sm uppercase tracking-[0.3em] text-stone-500">
            Integrations
          </p>
          <h1 className="text-4xl font-semibold text-stone-900">
            Channel Management
          </h1>
          <p className="text-stone-600 max-w-2xl">
            This page is now visible in the system. Connection and sync tools
            will be enabled here soon.
          </p>
        </div>

        <Card className="border border-[#ddd] bg-white">
          <div className="flex flex-col gap-4 p-2">
            <div className="inline-flex w-fit rounded-full bg-amber-100 px-4 py-2 text-sm font-medium text-amber-800">
              Coming Soon
            </div>
            <p className="text-stone-700">
              The backend route is ready, and this front-end page is prepared as
              the entry point for the upcoming integration workflow.
            </p>
          </div>
        </Card>

        <div className="grid gap-4 md:grid-cols-2">
          {features.map((feature) => (
            <Card key={feature} className="border border-[#ddd] bg-[#faf8f4]">
              <div className="p-2 text-stone-800">{feature}</div>
            </Card>
          ))}
        </div>
      </div>
    </Section>
  );
};

export default ChannelManagement;
