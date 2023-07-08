import { redirect } from 'next/navigation';
import { auth } from '@clerk/nextjs';

import Navbar from '@/components/navbar'
import prismadb from '@/lib/prismadb';

export default async function DashboardLayout({
    children,
    params
}: {
    children: React.ReactNode;
    params: { storId: string };
}) {
    const { userId } = auth();

    if (!userId){
        redirect('/sign-in')
    }

    const store = await prismadb.store.findFirst({
        where: {
            id: params.storId,
            userId
        }
    });

    if (!store){
        redirect('/')
    }

    return (
        <>
            <Navbar/>
            {children}
        </>
    )
}