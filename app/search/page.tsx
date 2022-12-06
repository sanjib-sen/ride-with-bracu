"use client";
import Information from "../../components/Notes/Info";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
export default function Search() {
  const { data: session } = useSession();
  const [riders, setRiders] = useState<any[]>([]);
  const [saved, setSaved] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (!session) {
      router.push("/login");
    }

    (async () => {
      if (session && saved === false) {
        const res = await fetch(`api/profile/${session?.user?.email}`, {
          method: "GET",
        });
        const data = await res.json();
        if (data.fromBRACU && data.currentLocationName) {
          const res = await fetch(`api/riders/${data.fromBRACU}`, {
            method: "GET",
          });
          const usersList = await res.json();
          setRiders(usersList);
          setSaved(true);
        } else {
          router.push("/location");
        }
      }
    })();
  }, [router, saved, session]);

  function onEndSearch() {
    const profile = {
      currentLocationName: null,
      fromBRACU: null,
    };
    (async () => {
      await fetch(`api/profile/update/${session?.user?.email}`, {
        method: "POST",
        body: JSON.stringify(profile),
        headers: { "Content-Type": "application/json" },
      });
    })();
    router.push("/location");
  }

  return (
    <div className="grid md:grid-cols-2  md:gap-5 md:divide-x">
      <div className="grid justify-center items-center px-5 lg:px-32 py-5 gap-20">
        <p className="text-2xl md:text-4xl text-stone-100">
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
          className="py-2 bg-blue-600 text-zinc-50"
          onClick={() => {
            onEndSearch();
          }}
        >
          End Search
        </button>
      </div>

      <div className="gap-25 justify-center items-center px-5 py-5">
        <table className="">
          <tbody>
            {riders?.map((rider) => {
              return (
                <tr key={rider.email}>
                  <td className="text-xl text-slate-100 px-5">
                    {rider.currentLocationName}
                  </td>
                  <td className="text-xl text-slate-100 px-5">{rider.name}</td>
                  <td className="text-xl text-blue-300 px-5">
                    <Link href={rider.whatsapp}>Whatsapp Call</Link>
                  </td>
                  <td className="text-xl text-blue-300 px-5">
                    <Link href={rider.facebook}>Facebook / Messenger</Link>
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
