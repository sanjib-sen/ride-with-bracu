import "./globals.css";
import AuthContext from "./AuthContext";
import Nav from "../components/NavBar";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthContext>
      <html lang="en">
        <head />
        <body>
          <div className="grid h-screen bg-zinc-700">
            <Nav />
            <div className="items-center justify-center">{children}</div>
          </div>
        </body>
      </html>
    </AuthContext>
  );
}
