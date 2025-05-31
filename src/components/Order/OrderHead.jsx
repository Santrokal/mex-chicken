import React, { useState } from "react";
import Info from "./Info";

const OrderHead = () => {
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleClose = () => {
    setDialogOpen(false);
  };

  return (
    <>
      <div className="flex flex-col lg:flex-row gap-2 justify-end md:justify-between items-center">
        <div className="text-black text-cgreen-500 font-Avertastd">
          <span>Open at 1:00 PM to 11:00 PM</span>
        </div>
        <div className="text-black text-cgreen-500 font-Avertastd">
          <div className="flex flex-col lg:flex-row items-center gap-2">
            <span className="text-center">
              Online ordering is now available, place your orders today!
            </span>
            <div
              className="flex items-center gap-1 cursor-pointer"
              onClick={() => setDialogOpen(true)}
              aria-hidden="true">
              <i className="bi bi-info-circle"></i>
              <span className="text-[#005FCB]">Info</span>
            </div>
            <Info open={dialogOpen} onClose={handleClose} />
          </div>
        </div>
      </div>
    </>
  );
};

export default OrderHead;
