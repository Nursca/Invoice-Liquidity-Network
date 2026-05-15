"use client";

import { Suspense } from "react";
import DashboardPage from "@/screens/Dashboard";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";

export default function DashboardRoute() {
  useDocumentTitle({ pageTitle: "My Dashboard" });

  return (
    <Suspense fallback={null}>
      <DashboardPage />
    </Suspense>
  );
}

