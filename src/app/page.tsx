import Footer from "@/components/shared/footer/footer";
import Navbar from "@/components/shared/navbar/Navbar";

import { ReactNode } from "react";
const RootLayout = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-slate-300">{children}</div>
      {/* <Footer /> */}
    </>
  );
};

export default RootLayout;
