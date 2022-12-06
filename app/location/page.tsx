"use client";

import { SelectOptions } from "../../components/SelectOptions";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import moment from "moment";
import isSearching from "../../utils/checkIfSearching";
export default function Search() {
  const { data: session, status } = useSession();
  const [location, setLocation] = useState({});
  const [fromBRACU, setFromBRACU] = useState(true);
  const router = useRouter();

  useEffect(() => {
    (async () => {
      if (status === "unauthenticated") {
        router.push("/login");
      }
      if (status === "authenticated") {
        const res = await fetch(`api/profile/${session?.user?.email}`, {
          method: "GET",
        });
        const data = await res.json();
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
    if (session && session.user && session.user.email && session.user.name) {
      var currentdate = moment().toDate();
      const data = {
        currentLocationName: location,
        fromBRACU: fromBRACU,
        requestedAt: currentdate,
      };
      (async () => {
        await fetch(`api/profile/update/${session.user?.email}`, {
          method: "POST",
          body: JSON.stringify(data),
          headers: { "Content-Type": "application/json" },
        }).then((res) => {
          router.push("/search");
        });
      })();
    }
  }

  if (status === "authenticated") {
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
  } else return <></>;
}
