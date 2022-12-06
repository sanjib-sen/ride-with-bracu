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
      });
    })();
    router.push("/location");
  }

  return (
    <div className="grid lg:grid-cols-2  lg:gap-5 lg:divide-x">
      <div className="grid justify-center items-center px-5 lg:px-32 py-5 gap-20">
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
          className="py-2 bg-blue-600 text-zinc-50 rounded-lg"
          onClick={() => {
            onEndSearch();
          }}
        >
          End Search
        </button>
      </div>

      <div className="flex flex-col justify-center items-center px-5 py-5">
        <p className="text-2xl md:text-4xl text-stone-100 text-start p-10">
          Looking for Rides :
        </p>
        <table className="flex flex-row table-fixed	border-collapse border-spacing-2 border border-slate-500">
          <tbody>
            {riders?.map((rider: any) => {
              return (
                <tr key={rider.email} className="border border-spacing-10">
                  <td className="text-xl text-slate-100 px-5">
                    {rider.currentLocationName}
                  </td>
                  {rider.image ? (
                    <td className="p-3">
                      <div className="p-3 relative block rounded-lg">
                        <Image
                          src={rider.image}
                          fill
                          alt="Call with WhatsApp"
                          className="rounded-lg"
                        />
                      </div>
                    </td>
                  ) : (
                    ""
                  )}
                  <td className="text-xl text-slate-100 px-5">{rider.name}</td>
                  <td className="text-xl text-slate-100 px-5 text-center">
                    <TimeAgo date={rider.requestedAt} />
                  </td>

                  {rider.whatsapp ? (
                    <td className="p-3">
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
                    <td className="p-3">
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
                  <td className="p-3">
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
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
