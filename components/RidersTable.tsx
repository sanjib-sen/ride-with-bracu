import { UserModel } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";
import TimeAgo from "react-timeago";
import convertFaceBookToMessengerLink from "../utils/facebookToMessenger";

export default function RidersTable({ riders }: { riders: UserModel[] }) {
  return (
    <>
      <table className="grid h-100 overflow-y-auto no-scrollbar">
        <tbody className="">
          {riders?.map((rider: any) => {
            return (
              <tr
                key={rider.email}
                className="border grid grid-flow-row lg:grid-flow-col lg:grid-cols-4 justify-center lg:justify-start items-center lg:gap-5"
              >
                <td className="flex flex-col xs:flex-row items-center justify-start ml-3 mt-3 xs:mt-0 xs:pl-5">
                  {rider.image ? (
                    <span className="p-4 relative flex justify-start">
                      <Image
                        src={rider.image}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        alt="Profile Photo"
                        className="rounded-full"
                      />
                    </span>
                  ) : (
                    ""
                  )}
                  <p className="text-lg md:text-xl text-slate-100 text-center md:text-left pr-5 p-3 xs:mr-5">
                    {rider.name}
                  </p>
                </td>
                <td className="text-lg md:text-xl text-slate-100 px-3 text-center">
                  {rider.fromBRACU
                    ? "BRACU to " + rider.currentLocationName
                    : rider.currentLocationName + " to BRACU"}
                </td>
                <td className="text-lg md:text-xl text-slate-100 text-center">
                  <TimeAgo date={rider.requestedAt} />
                </td>

                <td className="flex flex-row gap-4 p-3 justify-center">
                  {rider.whatsapp ? (
                    <Link
                      href={rider.whatsapp}
                      className="p-3 relative block"
                      rel="noopener noreferrer"
                      target="_blank"
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
                    <>
                      <Link
                        href={rider.facebook}
                        className="p-3 relative block"
                        rel="noopener noreferrer"
                        target="_blank"
                      >
                        <Image
                          src="/logo/facebook.svg"
                          alt="Contact via Messenger"
                          fill
                        />
                      </Link>
                      <Link
                        href={convertFaceBookToMessengerLink(rider.facebook)}
                        className="p-3 relative block"
                        rel="noopener noreferrer"
                        target="_blank"
                      >
                        <Image
                          src="/logo/messenger.svg"
                          alt="Contact via Messenger"
                          fill
                        />
                      </Link>
                    </>
                  ) : (
                    ""
                  )}
                  <Link
                    href={"mailto:" + rider.email}
                    className="p-3 relative block"
                    rel="noopener noreferrer"
                    target="_blank"
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
    </>
  );
}
