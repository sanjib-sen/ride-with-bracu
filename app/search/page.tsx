"use client";
import Information from "../../components/Notes/Info";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import useSWR from "swr";
import Image from "next/image";
import TimeAgo from "react-timeago";
import isSearching from "../../utils/checkIfSearching";
import { getUserSession, updateUser } from "../../session/session";

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
  // const [user, setUser] = useState<Partial<UserModel>>();
  const router = useRouter();
  const { user } = useUser(
    status === "authenticated" && session.user?.email
      ? `api/profile/${session.user.email}`
      : null
  );
  const { riders } = useRiders(
    status === "authenticated" && user ? `api/riders/${user.fromBRACU}` : null
  );

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    }

    (async () => {
      if (status === "authenticated" && session.user?.email) {
        const user = await getUserSession(session.user.email);
        if (!isSearching(user)) {
          router.push("/location");
        }
      }
    })();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status, user]);

  function onEndSearch() {
    router.push("/location");

    (async () => {
      if (user) {
        const data = user;
        data.currentLocationName = null;
        data.fromBRACU = null;
        data.requestedAt = null;
        console.log(data);
        await updateUser(data);
      }
    })();
  }

  return (
    <div className="grid lg:grid-cols-3 lg:divide-x">
      <div className="flex flex-col items-center gap-5 px-5">
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
      </div>

      <div className="flex flex-col px-5 py-5 lg:col-span-2">
        <table className="border-spacing-2 table-auto border border-slate-500">
          <tbody>
            {riders?.map((rider: any) => {
              return (
                <tr
                  key={rider.email}
                  className="border grid grid-flow-row xs:grid-flow-col xs:grid-cols-4 justify-items-center items-center"
                >
                  <td className="flex flex-row items-center justify-center ml-3">
                    {rider.image ? (
                      <span className="p-4 relative flex">
                        <Image
                          src={rider.image}
                          fill
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw,
              33vw"
                          alt="Profile Photo"
                          className="rounded-full"
                        />
                      </span>
                    ) : (
                      ""
                    )}
                    <p className="text-lg md:text-xl text-slate-100 text-left pr-3 p-3">
                      {rider.name}
                    </p>
                  </td>
                  <td className="text-lg md:text-xl text-slate-100 pr-3">
                    {rider.currentLocationName}
                  </td>
                  <td className="text-lg md:text-xl text-slate-100 text-center">
                    <TimeAgo date={rider.requestedAt} />
                  </td>

                  <td className="flex flex-row gap-4 pb-3 xs:pb-0">
                    {rider.whatsapp ? (
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
                    ) : (
                      ""
                    )}
                    {rider.facebook ? (
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
                    ) : (
                      ""
                    )}
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
