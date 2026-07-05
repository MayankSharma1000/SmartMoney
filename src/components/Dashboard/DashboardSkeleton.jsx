import React from "react";

function DashboardSkeleton() {
  return (
    <div className="dashboard-skeleton">

      {[1,2,3,4].map((item)=>(

        <div
          key={item}
          className="skeleton-card"
        />

      ))}

    </div>
  );
}

export default DashboardSkeleton;