import { SelectOptions } from "./SelectOptions";

export default function SearchInput({
  handleLocationChange,
  handleFromBRACUChange,
  onStartSearching,
  location,
  fromBRACU,
}: {
  handleLocationChange: any;
  handleFromBRACUChange: any;
  onStartSearching: any;
  location: string;
  fromBRACU: boolean;
}) {
  return (
    <>
      <div className="flex flex-col items-center gap-5 px-5 py-5 xs:py-0">
        <p className="text-2xl md:text-4xl text-stone-100 text-center">
          🔎 About your Ride 🏠
        </p>
      </div>
      <div className="grid grid-flow-row items-center gap-5 px-5 py-5 xs:py-0">
        <label className="block">
          <span className="text-stone-100"> You are ...</span>
          <select
            className="form-select mt-3 block w-full bg-zinc-700 text-stone-100 rounded-xl"
            onChange={handleFromBRACUChange}
          >
            <option value="toBRACU" label="Going to BRACU from a place" />
            <option value="fromBRACU" label="Going from BRACU to a place" />
          </select>
        </label>
        <label className="block">
          <span className="text-stone-100"> Location</span>
          <SelectOptions
            onChangeFunction={handleLocationChange}
            defaultArea={location}
          />
        </label>
        <button
          className="py-2 bg-blue-600 text-zinc-50"
          onClick={() => {
            onStartSearching();
          }}
        >
          Start Searching for Riders
        </button>
      </div>
    </>
  );
}
