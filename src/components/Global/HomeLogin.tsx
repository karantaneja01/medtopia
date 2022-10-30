import { signIn, useSession } from "next-auth/react";
import Link from "next/link";
import Navbar from "./Navbar";

export default function Example() {
  const { status } = useSession();
  return (
    <div className="relative bg-gray-50">
      <Navbar />

      <main className="min-h-[calc(100vh-64px)] lg:relative">
        <div className="mx-auto w-full max-w-7xl pt-16 pb-20 text-center lg:py-48 lg:text-left">
          <div className="px-4 sm:px-8 lg:w-1/2 xl:pr-16">
            <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl md:text-6xl lg:text-5xl xl:text-6xl">
              <span className="block xl:inline">Med</span>
              <span className="block text-indigo-600 xl:inline">topia</span>
            </h1>
            <p className="mx-auto mt-3 max-w-md text-lg text-gray-500 sm:text-xl md:mt-5 md:max-w-3xl">
              Utopia for Medicine
            </p>
            <div className="mt-10 sm:flex sm:justify-center lg:justify-start">
              {status !== "authenticated" && (
                <div className="rounded-md shadow">
                  <a
                    onClick={() => signIn("google")}
                    className="flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:cursor-pointer hover:bg-indigo-700 md:py-4 md:px-10 md:text-lg"
                  >
                    Sign in via Google
                  </a>
                </div>
              )}
              <div className="mt-3 rounded-md shadow sm:mt-0 sm:ml-3">
                <Link href="/premiumcalc">
                  <a className="flex w-full items-center justify-center rounded-md border border-transparent bg-white px-8 py-3 text-base font-medium text-indigo-600 hover:cursor-pointer hover:bg-gray-50 md:py-4 md:px-10 md:text-lg">
                    Try Premium Calculator
                  </a>
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div className="relative h-64 w-full sm:h-72 md:h-96 lg:absolute lg:inset-y-0 lg:right-0 lg:h-full lg:w-1/2">
          <img
            className="absolute inset-0 h-full w-full object-cover"
            src="https://images.unsplash.com/photo-1520333789090-1afc82db536a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2102&q=80"
            alt=""
          />
        </div>
      </main>
    </div>
  );
}
