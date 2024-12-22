"use client"
import Booking from "@/components/Booking/Booking";
import MapBox from "@/components/Map/MapBox";
import { DestinationCoordinatesContext } from "@/context/DestinationCoordinates";
import { DirectionsDataContext } from "@/context/DirectionsDataContext";
import { CarAmountContext } from "@/context/SelectedCarAmount";
import { SourceCoordinatesContext } from "@/context/SourceCoordinats";
import { UserLocationContext } from "@/context/UserLocationContext";
import { useEffect, useState } from "react";


export default function HomePage() {
  const [userLocations, setUserLocations] = useState<any>();
  const [sourceCoordinates, setSourceCoordinates] = useState<any>([]);
  const [destinationCoordinates, setDestinationCoordinates] = useState<any>([]);
  const [directionRoutData, setDirectionsRouteData] = useState<any>([])
  const [carAmount, setCarAmount] = useState<any>()
  useEffect(() => {
    getUserLocations()
  }, [])
  const getUserLocations = () => {
    navigator.geolocation.getCurrentPosition((pos) => {
      setUserLocations({
        lat: pos.coords.latitude,
        long: pos.coords.longitude
      })
    })
  }
  return (
    <div>
      <UserLocationContext.Provider value={{ userLocations, setUserLocations }}>
        <SourceCoordinatesContext.Provider value={{ sourceCoordinates, setSourceCoordinates }}>
          <DestinationCoordinatesContext.Provider value={{ destinationCoordinates, setDestinationCoordinates }}>
            <DirectionsDataContext.Provider value={{ directionRoutData, setDirectionsRouteData }}>
              <CarAmountContext.Provider value={{ carAmount, setCarAmount }}>
                <div className="grid grid-cols-1 md:grid-cols-3">
                  <div className="">

                    <Booking />
                  </div>
                  <div className=" col-span-2 order-last">
                    <MapBox />

                  </div>

                </div>
              </CarAmountContext.Provider>
            </DirectionsDataContext.Provider>
          </DestinationCoordinatesContext.Provider>
        </SourceCoordinatesContext.Provider>
      </UserLocationContext.Provider>
    </div>
  )
}