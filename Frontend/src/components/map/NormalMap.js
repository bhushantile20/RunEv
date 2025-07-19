import React, { useEffect } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  useMap,
  useMapEvents,
} from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-geosearch/dist/geosearch.css";
import markerIconPng from "leaflet/dist/images/marker-icon.png";

import { GeoSearchControl, OpenStreetMapProvider } from "leaflet-geosearch";

const defaultIcon = new L.Icon({
  iconUrl: markerIconPng,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

const LocationPicker = ({ setPointer }) => {
  useMapEvents({
    click(e) {
      setPointer({ lat: e.latlng.lat, lng: e.latlng.lng });
    },
  });
  return null;
};

const SearchControl = ({ setPointer }) => {
  const map = useMap();

  useEffect(() => {
    const provider = new OpenStreetMapProvider();

    const searchControl = new GeoSearchControl({
      provider,
      showMarker: true,
      showPopup: true,
      autoClose: true,
      retainZoomLevel: false,
      animateZoom: true,
      keepResult: true,
    });

    map.addControl(searchControl);

    map.on("geosearch/showlocation", function (result) {
      setPointer({
        lat: result.location.y,
        lng: result.location.x,
      });
    });

    return () => {
      map.removeControl(searchControl);
    };
  }, [map, setPointer]);

  return null;
};

const NormalMap = ({ pointer, setPointer }) => {
  useEffect(() => {
    if (!pointer.lat && navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((pos) => {
        setPointer({
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
        });
      });
    }
  }, [pointer, setPointer]);

  if (!pointer?.lat || !pointer?.lng) return <div>Loading map...</div>;

  return (
    <div className="w-full h-full rounded-lg overflow-hidden shadow-lg border border-gray-300">
      <MapContainer
        center={[pointer.lat, pointer.lng]}
        zoom={13}
        style={{ height: "100%", width: "100%" }}
        scrollWheelZoom={true}
      >
        <TileLayer
          attribution='&copy; OpenStreetMap contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={[pointer.lat, pointer.lng]} icon={defaultIcon} />
        <LocationPicker setPointer={setPointer} />
        <SearchControl setPointer={setPointer} />
      </MapContainer>
    </div>
  );
};

export default NormalMap;
