"use client";
import Information from "../../components/Notes/Info";

import Image from "next/image";
export default function Search() {
  return (
    <div className="grid md:grid-cols-2  md:gap-5 md:divide-x">
      <div className="grid justify-center items-center grid-rows-3 px-5 lg:px-32 py-5">
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
      </div>

      <div className="grid justify-center items-center grid-rows-3 px-5 py-5 gap-2">
        <table className="">
          <tbody>
            <tr>
              <td className="text-xl text-stone-100 text-right pr-2">
                Indiana
              </td>
              <td className="text-xl text-stone-100 text-left">1</td>
            </tr>
            <tr>
              <td className="text-xl text-stone-100 text-right pr-2">Ohio</td>
              <td className="text-xl text-stone-100 text-left">2</td>
            </tr>
            <tr>
              <td className="text-xl text-stone-100 text-right pr-2">
                Michigan
              </td>
              <td className="text-xl text-stone-100 text-left">3</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
