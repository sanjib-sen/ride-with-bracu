import { UserModel } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";
import TimeAgo from "react-timeago";
import convertFaceBookToMessengerLink from "../utils/facebookToMessenger";

export default function RidersTable({ riders }: { riders: UserModel[] }) {
  return (
    <>
      <div className="">
        <table className="grid h-100 overflow-y-auto no-scrollbar">
          <tbody className="">
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
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
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
                    {rider.fromBRACU
                      ? "BRACU to " + rider.currentLocationName
                      : rider.currentLocationName + " to BRACU"}
                  </td>
                  <td className="text-lg md:text-xl text-slate-100 text-center">
                    <TimeAgo date={rider.requestedAt} />
                  </td>

                  <td className="flex flex-row gap-4 pb-3 xs:pb-0">
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
      </div>
    </>
  );
}
