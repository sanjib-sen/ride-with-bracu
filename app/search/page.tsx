"use client";
import Information from "../../components/Notes/Info";
import { useEffect } from "react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import useSWR from "swr";
import Image from "next/image";
import TimeAgo from "react-timeago";
import isSearching from "../../utils/checkIfSearching";

const refreshInterval = 5 * 1000; // Make it zero "0" to turn off

const fetcher = (...args: [RequestInfo]) =>
  fetch(...args).then((res) => res.json());

export function useRiders(url: string | null) {
  const { data, error } = useSWR(url, fetcher, {
    refreshInterval: refreshInterval,
  });
  return {
    riders: data,
    isRidersLoading: !error && !data,
    isRidersError: error,
  };
}

export function useUser(url: string | null) {
  const { data, error } = useSWR(url, fetcher);
  return {
    user: data,
    isUserLoading: !error && !data,
    isUserError: error,
  };
}

export default function Search() {
  const { data: session, status } = useSession();
  const router = useRouter();

  const { user } = useUser(
    status === "authenticated" ? `api/profile/${session?.user?.email}` : null
  );
  const { riders } = useRiders(
    status === "authenticated" && user ? `api/riders/${user.fromBRACU}` : null
  );

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    }

    if (status === "authenticated" && user && !isSearching(user)) {
      router.push("/location");
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status, user]);

  function onEndSearch() {
    const data = {
      currentLocationName: null,
      fromBRACU: null,
      requestedAt: null,
    };
    (async () => {
      await fetch(`api/profile/update/${session?.user?.email}`, {
        method: "POST",
        body: JSON.stringify(data),
        headers: { "Content-Type": "application/json" },
      }).then((res) => {
        router.push("/location");
      });
    })();
  }

  return (
    <div className="grid lg:grid-cols-2  lg:gap-5 lg:divide-x">
      <div className="flex flex-col items-center gap-5 px-5">
        <p className="text-2xl md:text-4xl text-stone-100 text-center">
          🔎 Searching for University friends 🐍
        </p>
        <Image
          src="/map-search-svgrepo-com.svg"
          alt="An SVG of an eye"
          width={200}
          height={200}
          className="justify-self-center"
        />
        <Information
          title="Please note"
          description="Searching will be automatically stopped after 30 minutes in case you forget to click End Search"
        />
        <button
          className="py-2 px-10 bg-blue-600 text-zinc-50 rounded-lg"
          onClick={() => {
            onEndSearch();
          }}
        >
          End Search
        </button>
      </div>

      <div className="flex flex-col px-5 py-5">
        <p className="text-2xl md:text-4xl text-stone-100 text-left mb-5">
          Looking for Rides :
        </p>
        <table className="border-spacing-2 table-auto border border-slate-500">
          <tbody>
            {riders?.map((rider: any) => {
              return (
                <tr
                  key={rider.email}
                  className="border grid grid-flow-row xs:grid-flow-col xs:grid-cols-5 justify-items-center items-center gap-3"
                >
                  {rider.image ? (
                    <td>
                      <div className="relative p-5">
                        <Image
                          src={rider.image}
                          fill
                          alt="Profile Photo"
                          className="rounded-full"
                        />
                      </div>
                    </td>
                  ) : (
                    ""
                  )}
                  <td className="text-lg md:text-xl text-slate-100 text-left">
                    {rider.name}
                  </td>
                  <td className="text-lg md:text-xl text-slate-100">
                    {rider.currentLocationName}
                  </td>
                  <td className="text-lg md:text-xl text-slate-100 text-center">
                    <TimeAgo date={rider.requestedAt} />
                  </td>

                  <div className="flex flex-row gap-4">
                    {rider.whatsapp ? (
                      <td>
                        <Link
                          href={rider.whatsapp}
                          className="p-3 relative block"
                        >
                          <Image
                            src="/logo/whatsapp.svg"
                            fill
                            alt="Call with WhatsApp"
                          />
                        </Link>
                      </td>
                    ) : (
                      ""
                    )}
                    {rider.facebook ? (
                      <td>
                        <Link
                          href={rider.facebook}
                          className="p-3 relative block"
                        >
                          <Image
                            src="/logo/facebook.svg"
                            alt="Contact via Messenger"
                            fill
                          />
                        </Link>
                      </td>
                    ) : (
                      ""
                    )}
                    <td>
                      <Link
                        href={"mailto:" + rider.email}
                        className="p-3 relative block"
                      >
                        <Image
                          src="/logo/gmail.svg"
                          fill
                          alt="Send an Email to G-Suite"
                        />
                      </Link>
                    </td>
                  </div>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
