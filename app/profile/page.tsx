"use client";
import { useSession } from "next-auth/react";
import { SelectOptions } from "../../components/SelectOptions";
import { useState } from "react";
import Information from "../../components/Notes/Info";
import Warning from "../../components/Notes/Warning";
import { useRouter } from "next/navigation";

export default function Profile() {
  const { data: session } = useSession();
  const [facebook, setFacebook] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [location, setLocation] = useState("");
  const [saved, setSaved] = useState(false);
  const router = useRouter();

  //   if (!session) {
  //     router.push("/");
  //   }

  (async () => {
    if (session && saved === false) {
      const res = await fetch(`api/profile/${session?.user?.email}`, {
        method: "GET",
      });
      const data = await res.json();
      if (data.user) {
        setFacebook(data.user.facebook);
        setWhatsapp(data.user.whatsapp);
        setLocation(data.user.defaultLocationName);
        setSaved(true);
      }
    }
  })();

  function handleSelectChange(event: any) {
    const selectedValue = event.target.value;
    // setLocation({
    //   name: selectedValue,
    //   value: selectedValue.replaceAll(" ", "-").toLowerCase(),
    // });
    setLocation(selectedValue);
    console.log(selectedValue, location);
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
        // location: location,
        name: session.user.name,
        email: session.user.email,
        image: session.user.image,
        defaultLocationName: location,
      };
      (async () => {
        const res = await fetch("api/profile/create", {
          method: "POST",
          body: JSON.stringify(profile),
          headers: { "Content-Type": "application/json" },
        }).then(async (res) => {
          console.log(await res.json());
        });
      })();
    } else if (
      session &&
      session.user &&
      session.user.email &&
      session.user.name &&
      saved === true
    ) {
      const profile = {
        facebook: facebook,
        whatsapp: whatsapp,
        name: session.user.name,
        image: session.user.image,
        defaultLocationName: location,
      };
      (async () => {
        const res = await fetch(`api/profile/update/${session.user?.email}`, {
          method: "POST",
          body: JSON.stringify(profile),
          headers: { "Content-Type": "application/json" },
        }).then(async (res) => {
          console.log(await res.json());
        });
      })();
    }
    router.push("/location");
  }

  return (
    <>
      <div className="grid md:grid-cols-2  md:gap-5 md:divide-x">
        <div className="grid justify-center items-center grid-rows-3 px-5 lg:px-32 py-5">
          <p className="text-2xl md:text-4xl text-stone-100">
            {saved
              ? "😶‍🌫️ " + session?.user?.name + "'s Profile"
              : "😶‍🌫️ Let{`'`}s Set up your Profile"}
          </p>
          <p className="text-md md:text-xl text-stone-100 text-justify">
            Add your Default Location, Whatsapp Call Link (Recommended but
            Optional), Facebook Profile Link (Optional) so that people can reach
            out to you.
          </p>
          <Warning
            title="Exposing Links"
            description="Setting up Facebook, Whatsapp Link can cause you to expose your Whatsapp
                        Call / Facebook Profile Link to public. However, you can always block
                        people from those apps."
          />
          <Information
            title="Don't you worry!"
            description="Please keep it in mind that sharing your Whatsapp Call Link will not
                        expose your Phone Number. It is a new feature by Whatsapp where people
                        can call you via link which has a expiry date and you can always change
                        the link."
          />
        </div>
        <div className="grid justify-center items-center grid-rows-3 px-5 py-5 gap-2">
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
              className="form-input mt-3 w-full bg-zinc-700 text-stone-100 rounded-xl"
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
              className="form-input mt-3 block w-full bg-zinc-700 text-stone-100 rounded-xl"
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
            className="py-2 bg-blue-600 text-zinc-50"
            onClick={() => {
              onFormSubmit();
            }}
          >
            Submit
          </button>
        </div>
      </div>
    </>
  );
}
