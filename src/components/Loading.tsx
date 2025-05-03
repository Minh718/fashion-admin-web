import React from "react";
import { FaSpinner } from "react-icons/fa";
// import CircularProgress from "@mui/material/CircularProgress";
export default function Loading() {
  return (
    <div className="flex w-full h-[80vh] items-center justify-center">
      <FaSpinner className="animate-spin h-20 w-20 mr-3" />
    </div>
  );
}
