import React from "react";

export default function LoadingSpinner() {
  return (
    <div className="flex justify-center items-center py-16">
      <div
        className="
          w-12 h-12                  
          border-4                   
          border-lines              
          border-t-orange            
          rounded-full               
          animate-spin              
        "
      ></div>
    </div>
  );
}
