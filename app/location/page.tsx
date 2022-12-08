"use client";

import { SelectOptions } from "../../components/SelectOptions";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import moment from "moment";
import isSearching from "../../utils/checkIfSearching";
import { getUserSession, updateUser } from "../../session/session";
export default function Location() {
  const { data: session, status } = useSession();
  const [location, setLocation] = useState<string>();
  const [fromBRACU, setFromBRACU] = useState(true);
  const router = useRouter();

  useEffect(() => {
    (async () => {
      if (status === "unauthenticated") {
        router.push("/login");
      }
      if (status === "authenticated" && session.user?.email) {
        const data = await getUserSession(session.user?.email);
        if (data) {
          setLocation(data.defaultLocationName);
          if (isSearching(data)) {
            router.push("/search");
          }
        } else {
          router.push("/profile");
        }
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status]);

  function handleLocationChange(event: any) {
    const selectedValue = event.target.value;
    setLocation(selectedValue);
  }

  function handleFromBRACUChange(event: any) {
    const selectedValue = event.target.value === "fromBracu";
    setFromBRACU(selectedValue);
  }

  function onFormSubmit() {
    if (
      session &&
      session.user &&
      session.user.email &&
      session.user.name &&
      location &&
      fromBRACU
    ) {
      (async () => {
        if (session.user?.email) {
          const currentdate = moment().toDate();
          const data = await getUserSession(session.user?.email);
          data.currentLocationName = location;
          data.fromBRACU = fromBRACU;
          data.requestedAt = currentdate;
          await updateUser(data);
        }
        router.push("search");
      })();
    }
  }

  return (
    <div className="grid md:grid-cols-2  md:gap-5 md:divide-x">
      <div className="grid justify-center items-center grid-rows-1 px-5 lg:px-10 py-5">
        <p className="text-2xl md:text-4xl text-stone-100 text-center">
          🔎 Enter your Location and Destination 🏠
        </p>
      </div>
      <div className="grid justify-center items-center grid-rows-3 px-5 py-5 gap-5">
        <label className="block">
          <span className="text-stone-100"> You are ...</span>
          <select
            className="form-select mt-3 block w-full bg-zinc-700 text-stone-100 rounded-xl"
            onChange={handleFromBRACUChange}
          >
            <option value="toBracu" label="Going to BRACU from a place" />
            <option value="fromBracu" label="Going from BRACU to a place" />
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
            onFormSubmit();
          }}
        >
          Submit
        </button>
      </div>
    </div>
  );
}
