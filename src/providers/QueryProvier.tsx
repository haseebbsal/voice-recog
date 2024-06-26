'use client';

import React from "react";
import { QueryClient, QueryClientProvider } from "react-query";
const client=new QueryClient()
export default function QueryProvider({ children }: { children: React.ReactNode }) {
    return (
        <>
            <QueryClientProvider client={client}>
                {children}
            </QueryClientProvider>
        </>
    )
}