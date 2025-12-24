import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import DynamicPage from "../pages/DynamicPage";

// Component that forces a specific slug for the homepage
export default function HomePageWrapper() {
  return <DynamicPage fixedSlug="home" />;
}
