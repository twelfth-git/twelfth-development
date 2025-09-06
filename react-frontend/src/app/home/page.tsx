"use client"

import ThreeColumnLayout from "@/components/layout/ThreeColumnLayout";
import MainContent from "@/components/home/MainContent";
import RightSidebar from "@/components/home/RightSidebar";

export default function Home() {
  return (
    <ThreeColumnLayout
      mainContent={<MainContent />}
      rightColumnContent={<RightSidebar />}
    />
  );
}