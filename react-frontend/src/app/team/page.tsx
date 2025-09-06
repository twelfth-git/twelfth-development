"use client"

import ThreeColumnLayout from "@/components/layout/ThreeColumnLayout";

import TeamMainContent from "@/components/team/TeamMainContent"; 

import TeamRightSidebar from "@/components/team/TeamRightSidebar";

export default function TeamPage() {
  return (
    <ThreeColumnLayout
      mainContent={<TeamMainContent />}
      rightColumnContent={<TeamRightSidebar />}
    />
  );
}