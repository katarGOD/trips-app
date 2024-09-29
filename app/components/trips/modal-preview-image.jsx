import React from "react";
import { Dialog, DialogBackdrop, DialogPanel } from "@headlessui/react";

function ModalPreviewImage({ open, photo, setOpen }) {
  return (
    <div>
      <Dialog open={open} onClose={setOpen} className="relative z-10">
        <DialogBackdrop
          transition
          className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in"
        />
        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center sm:items-center sm:p-0">
            <DialogPanel
              transition
              className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all data-[closed]:translate-y-4 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in sm:my-8 sm:w-full sm:max-w-7xl sm:mx-[40px] data-[closed]:sm:translate-y-0 data-[closed]:sm:scale-95"
            >
              <img
                className="rounded-xl object-cover flex-shrink-0 h-[100%] w-[100%]"
                src={photo}
                alt={photo}
              />
            </DialogPanel>
          </div>
        </div>
      </Dialog>
    </div>
  );
}

export default ModalPreviewImage;
