import Loader from "@/components/Loader";
import Navbar from "@/components/shared/navbar/Navbar";
import { ReactNode, Suspense } from "react";
const RootLayout = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <Suspense
        fallback={
          <div>
            <Loader />{" "}
          </div>
        }
      >
        <Navbar />
      </Suspense>
      {children}
    </>
  );
};

export default RootLayout;
