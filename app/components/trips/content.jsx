"use client";
import React, { useEffect, useState } from "react";
import ModalPreviewImage from "./modal-preview-image";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";
import NotFoundItems from "./not-found-items";

function Content() {
  const [listTrip, setListTrip] = useState([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [keyword, setKeyword] = useState("");
  const router = useRouter();
  const searchParams = useSearchParams();
  const keywordFromURL = searchParams.get("keyword") || "";
  const [isPageNotFound, setIsPageNotFound] = useState(false);

  async function loadTrips(keyword) {
    try {
      const res = await fetch(`/api/trips?keyword=${keyword}`, {
        cache: "no-store",
      });
      if (!res.ok) {
        throw new Error("Network response was not ok");
      }

      const trips = await res.json();
      if (trips.length === 0) {
        setIsPageNotFound(true);
      } else {
        setIsPageNotFound(false);
      }
      setListTrip(trips);
    } catch (error) {
      console.log("err==>", error);
    }
  }

  function handleImageClick(photo) {
    setSelectedPhoto(photo);
    setIsDialogOpen(true);
  }

  function setTagNameAndLoadTrips(tagName) {
    setKeyword(tagName);
    router.push(`/trips?keyword=${tagName}`);
    loadTrips(tagName);
  }

  function checkEnterFromSearch(e) {
    if (e.key === "Enter") {
      router.push(`/trips?keyword=${keyword}`);
      loadTrips(keyword);
    }
  }

  useEffect(() => {
    if (keywordFromURL) {
      setKeyword(keywordFromURL);
    }
    loadTrips(keywordFromURL);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center container mx-auto mt-[50px] max-w-[600px] p-[20px]">
      <ModalPreviewImage
        open={isDialogOpen}
        photo={selectedPhoto}
        setOpen={setIsDialogOpen}
      />
      <div className="flex justify-center items-center flex-col w-full">
        <label className="text-[#4bc1e8] text-5xl mb-[40px]">เที่ยวไหนดี</label>
        <input
          className="font-bold focus:outline-none placeholder:text-center placeholder:font-bold placeholder:text-[#d5d8de] text-center mb-[5px]"
          type="text"
          placeholder="หาที่เที่ยวแล้วไปกัน..."
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          onKeyDown={(e) => checkEnterFromSearch(e)}
        />
        <div className="border-b-[1px] border-[#d1d5db] w-[100%] sm:w-[90%]"></div>
      </div>
      {listTrip.length != 0 && (
        <>
          {listTrip?.map((trip, index) => (
            <div className="mt-[40px] sm:mt-[50px]" key={index}>
              <div className="flex gap-[30px] flex-wrap sm:flex-nowrap">
                <div className="flex sm:flex-[0.4]">
                  {trip?.photos?.map((photo, index) => (
                    <div key={index}>
                      {index == 0 && (
                        <img
                          className="rounded-xl object-cover flex-shrink-0 h-[100%] w-[100%] sm:w-[450px] cursor-pointer"
                          src={photo}
                          alt={photo}
                          onClick={() => handleImageClick(photo)}
                        />
                      )}
                    </div>
                  ))}
                </div>
                <div className="flex flex-col sm:flex-1">
                  <label className="font-bold mb-[10px]">
                    <a href={trip.url} target="_blank">
                      {trip.title}
                    </a>
                  </label>
                  <div className="flex">
                    <label className="text-sm text-[#b1b7c1]">
                      {trip.description}...
                      <a
                        className="ml-[5px] text-[#4bc1e8] hover:text-gray-500 underline"
                        href={trip.url}
                        target="_blank"
                      >
                        อ่านต่อ
                      </a>
                    </label>
                  </div>
                  <div className="flex items-start">
                    <label className="text-xs text-[#d3dbe6] font-bold mt-[5px]">
                      หมวด
                    </label>
                    <div className="flex ml-[10px] flex-wrap">
                      {trip?.tags?.map((tag, index) => (
                        <a
                          className="ml-[5px] text-[#b1b7c1] hover:text-gray-500 underline font-bold cursor-pointer"
                          key={index}
                          onClick={() => setTagNameAndLoadTrips(tag)}
                        >
                          {tag}
                        </a>
                      ))}
                    </div>
                  </div>
                  <div className="hidden sm:flex gap-[20px] mt-[20px]">
                    {trip?.photos?.map(
                      (photo, index) =>
                        index != 0 && (
                          <img
                            className="rounded-xl object-cover flex-shrink-0 h-[100px] w-[110px] cursor-pointer"
                            src={photo}
                            alt={photo}
                            key={index}
                            onClick={() => handleImageClick(photo)}
                          />
                        )
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </>
      )}
      {isPageNotFound && <NotFoundItems />}
    </div>
  );
}

export default Content;
