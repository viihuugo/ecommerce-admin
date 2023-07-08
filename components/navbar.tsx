import { redirect } from "next/navigation";
import prismadb from "@/lib/prismadb";

import { UserButton, auth } from "@clerk/nextjs";

import StoreSwitcher from "@/components/store-switcher";
import MainNav from "@/components/main-nav";
import { ThemeToggle } from "@/components/theme-toggle";


export default async function Navbar() {

  const { userId } = auth();
  
  if(!userId){
    redirect('/sign-in');
  }

  const stores = await prismadb.store.findMany({
    where: {
        userId,
    },
  });

  return (
    <div className="border-b">
        <div className="h-16 px-4 flex items-center">
            <StoreSwitcher items={stores}/>
            <MainNav className="mx-6"/>
            <div className="ml-auto flex items-center space-x-4">
                <ThemeToggle/>
                <UserButton afterSignOutUrl="/"/>
            </div>
        </div>
    </div>
  )
}
