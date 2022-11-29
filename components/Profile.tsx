"use client";
import { signOut } from "next-auth/react";
import { SelectOptions } from "./SelectOptions";

export const Profile = () => {
  return (
    <>
      <div className="grid md:grid-cols-2  md:gap-5 md:divide-x">
        <div className="grid justify-center items-center grid-rows-3 px-5 lg:px-32 py-5">
          <p className="text-2xl md:text-4xl text-stone-100">
            😶‍🌫️ Let{`'`}s Set up your Profile
          </p>
          <p className="text-md md:text-xl text-stone-100 text-justify">
            Add your Default Location, Whatsapp Call Link (Recommended but
            Optional), Facebook Profile Link (Optional) so that people can reach
            out to you.
          </p>
          <div className="bg-yellow-300 px-3 py-2 rounded-lg">
            <p className="text-md text-red-600 pb-1 font-bold">⚠️ Warning: </p>
            <p className="text-xs md:text-sm text-justify text-black font-medium">
              Setting up Facebook, Whatsapp Link can cause you to expose your
              Whatsapp Call / Facebook Profile Link to public. However, you can
              always block people from those apps.
            </p>
          </div>
          <div className=" bg-blue-400 px-3 py-2 rounded-lg mt-3">
            <p className="text-md text-blue-900 pb-1 font-bold">ℹ️ Info: </p>
            <p className="text-xs md:text-sm text-justify text-black font-medium">
              Please keep it in mind that sharing your Whatsapp Call Link will
              not expose your Phone Number. It is a new feature by Whatsapp
              where people can call you via link which has a expiry date and you
              can always change the link.
            </p>
          </div>
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
              className="form-input mt-3 w-full bg-zinc-700 text-stone-100 rounded-xl"
              placeholder="https://call.whatsapp.com/voice/xxxxxxx"
            />
          </label>
          <label className="block">
            <span className="text-stone-100">
              Facebook Profile Link (Optional)
            </span>
            <input
              type="text"
              className="form-input mt-3 block w-full bg-zinc-700 text-stone-100 rounded-xl"
              placeholder="https://www.facebook.com/xxxxxxxx/"
            />
          </label>
          <label className="block">
            <span className="text-stone-100">Default Location</span>
            <SelectOptions />
          </label>
          <button
            className="py-2 bg-blue-600 text-zinc-50"
            onClick={() => {
              signOut();
            }}
          >
            Sign Out
          </button>
        </div>
      </div>
    </>
  );
};
