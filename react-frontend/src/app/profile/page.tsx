"use client"

import ThreeColumnLayout from "@/components/layout/ThreeColumnLayout";
import MainContent from "@/components/profile/ProfileMainContent";
import RightSidebar from "@/components/profile/ProfileRightSidebar";

export default function Home() {
  return (
    <ThreeColumnLayout
      mainContent={<MainContent />}
      rightColumnContent={<RightSidebar />}
    />
  );
}