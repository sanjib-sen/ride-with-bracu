import Information from "./Notes/Info";

export default function Searching({ onEndSearch }: { onEndSearch: any }) {
  return (
    <>
      <p className="text-4xl text-stone-100 text-left">Looking for Rides :</p>
      <Information description="Searching will be automatically stopped after 30 minutes in case you forget to click End Search" />
      <button
        className="py-2 px-10 bg-red-700 text-white rounded-lg"
        onClick={() => {
          onEndSearch();
        }}
      >
        End Search
      </button>
    </>
  );
}
