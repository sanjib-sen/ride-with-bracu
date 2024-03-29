"use client";
import { useSession } from "next-auth/react";
import { SelectOptions } from "../../components/SelectOptions";
import { useEffect, useState } from "react";
import Information from "../../components/Notes/Info";
import Warning from "../../components/Notes/Warning";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { createUser, getUserSession, updateUser } from "../../session/session";

export default function Profile() {
  const { data: session, status } = useSession();
  const [facebook, setFacebook] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [location, setLocation] = useState("");
  const [saved, setSaved] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    }
    if (status === "authenticated" && saved === false) {
      (async () => {
        if (session.user?.email) {
          const data = await getUserSession(session.user?.email);
          if (data) {
            setFacebook(data.facebook ? data.facebook : "");
            setWhatsapp(data.whatsapp ? data.whatsapp : "");
            setLocation(
              data.defaultLocationName ? data.defaultLocationName : ""
            );
            setSaved(true);
          }
        }
      })();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status]);

  function handleSelectChange(event: any) {
    const selectedValue = event.target.value;
    setLocation(selectedValue);
  }

  function onFormSubmit() {
    if (
      session &&
      session.user &&
      session.user.email &&
      session.user.name &&
      saved === false
    ) {
      const profile = {
        facebook: facebook,
        whatsapp: whatsapp,
        name: session.user.name,
        email: session.user.email,
        image: session.user.image,
        defaultLocationName: location ? location : "Abdul Aziz Lane",
      };
      (async () => {
        await createUser(profile);
        router.push("/search");
      })();
    } else if (
      session &&
      session.user &&
      session.user.email &&
      session.user.name &&
      saved === true
    ) {
      (async () => {
        if (session.user?.email) {
          const data = await getUserSession(session.user?.email);
          if (data) {
            data.facebook = facebook;
            data.whatsapp = whatsapp;
            data.defaultLocationName = location;
            await updateUser(data);
          }
        }
        router.push("/search");
      })();
    }
  }

  const profileImage = (imageSrc: string | undefined | null) => {
    if (imageSrc) {
      return (
        <span className="p-5 relative flex m-3">
          <Image
            src={imageSrc}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            alt="Profile Photo"
            className="rounded-full"
          />
        </span>
      );
    } else {
      ("😶‍🌫️ ");
    }
  };

  return (
    <>
      <div className="grid md:grid-cols-2  md:gap-5 md:divide-x  lg:mx-72">
        <div className="flex flex-col justify-center px-5 lg:px-15 py-5 gap-5">
          <div className="flex flex-col md:flex-row text-2xl md:text-4xl items-center justify-center text-stone-100 text-center">
            {saved ? profileImage(session?.user?.image) : ""}
            {saved ? (
              session?.user?.name + "'s Profile"
            ) : (
              <p className="">Let{"'"}s Set up your Profile</p>
            )}
          </div>
          <p className="text-md md:text-xl text-stone-100 text-justify">
            Add your Default Location, Whatsapp Call Link (Recommended but
            Optional), Facebook Profile Link (Optional) so that people can reach
            out to you.
            <br />
            <br />
            By Default, your G-Suite Email Address will automatically be shared.
          </p>
          <Warning
            title="Exposing Links"
            description="Setting up Facebook, Whatsapp Link can cause you to expose your Whatsapp
                        Call / Facebook Profile Link to public. However, you can always block
                        people from those apps."
            showTitle={true}
          />
          <Information
            title="Don't you worry!"
            description="Please keep it in mind that sharing your Whatsapp Call Link will not
                        expose your Phone Number. It is a new feature by Whatsapp where people
                        can call you via link which has a expiry date and you can always change
                        the link."
          />
        </div>
        <div className="flex flex-col px-5 py-5 gap-7 lg:px-16">
          <label className="block">
            <div className="text-stone-100 text-lg">
              Whatsapp Voice Call Link (Recommended)
            </div>
            <a
              target="_blank"
              rel="noreferrer"
              className="text-xs text-blue-300"
              href="https://faq.whatsapp.com/456694046556486/?helpref=uf_share"
            >
              Check where to find your Whatsapp Voice Call Link
            </a>
            <input
              type="text"
              onChange={(e) => {
                setWhatsapp(e.target.value);
              }}
              className="form-input mt-3 w-full bg-inherit text-stone-100 rounded-xl"
              placeholder="https://call.whatsapp.com/voice/xxxxxxx"
              value={whatsapp}
            />
          </label>
          <label className="block">
            <span className="text-stone-100">
              Facebook Profile Link (Optional)
            </span>
            <input
              type="text"
              onChange={(e) => {
                setFacebook(e.target.value);
              }}
              className="form-input mt-3 w-full bg-inherit text-stone-100 rounded-xl"
              placeholder="https://www.facebook.com/xxxxxxxx/"
              value={facebook}
            />
          </label>
          <label className="block">
            <span className="text-stone-100">Default Location</span>
            <SelectOptions
              onChangeFunction={handleSelectChange}
              defaultArea={location}
            />
          </label>
          <button
            className="py-2 bg-blue-600 text-zinc-50 rounded-lg"
            onClick={() => {
              onFormSubmit();
            }}
          >
            Save
          </button>
        </div>
      </div>
    </>
  );
}
