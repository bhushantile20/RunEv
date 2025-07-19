import React, { useEffect, useRef, useState } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  useMap,
  useMapEvents,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import "leaflet-routing-machine";
import markerIconPng from "leaflet/dist/images/marker-icon.png";

// Routing logic
const RoutingMachine = ({ from, to }) => {
  const map = useMap();
  const routingControlRef = useRef(null);

  useEffect(() => {
    if (!map || !from || !to) return;

    // Remove old route
    if (routingControlRef.current) {
      map.removeControl(routingControlRef.current);
    }

    const control = L.Routing.control({
      waypoints: [L.latLng(from.lat, from.lng), L.latLng(to.lat, to.lng)],
      lineOptions: {
        styles: [{ color: "#4A90E2", weight: 5 }],
      },
      show: false,
      addWaypoints: false,
      routeWhileDragging: false,
      draggableWaypoints: false,
      fitSelectedRoutes: true,
      createMarker: () => null,
      router: L.Routing.osrmv1({
        serviceUrl: "https://router.project-osrm.org/route/v1",
      }),
    }).addTo(map);

    // Hide route list
    const container = document.querySelector(".leaflet-routing-container");
    if (container) container.style.display = "none";

    routingControlRef.current = control;
  }, [map, from, to]);

  return null;
};

// Handles click events on map
const LocationSetter = ({ setPointer }) => {
  useMapEvents({
    click(e) {
      setPointer({
        lat: e.latlng.lat,
        lng: e.latlng.lng,
      });
    },
  });
  return null;
};

const SimpleMap = ({ pointer, setPointer, disable = false }) => {
  const [currentLocationSet, setCurrentLocationSet] = useState(false);

  const defaultIcon = new L.Icon({
    iconUrl: markerIconPng,
    iconSize: [32, 48],
    iconAnchor: [16, 48],
  });

  // Default destination (e.g., Mumbai)
  const destination = { lat: 19.0760, lng: 72.8777 };

  // Set current location only once
  useEffect(() => {
    if (!currentLocationSet && navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setPointer({
            lat: pos.coords.latitude,
            lng: pos.coords.longitude,
          });
          setCurrentLocationSet(true);
        },
        (err) => {
          console.error("Geolocation error:", err);
          setCurrentLocationSet(true);
        }
      );
    }
  }, [currentLocationSet, setPointer]);

  if (!pointer?.lat || !pointer?.lng) return <div>Loading map...</div>;

  return (
    <div className="w-full h-full rounded-lg overflow-hidden shadow-lg border border-gray-300">
      <MapContainer
        center={[pointer.lat, pointer.lng]}
        zoom={13}
        scrollWheelZoom={true}
        dragging={!disable}
        zoomControl={true}
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
        />

        <Marker position={[pointer.lat, pointer.lng]} icon={defaultIcon} />
        <RoutingMachine from={pointer} to={destination} />
        {!disable && <LocationSetter setPointer={setPointer} />}
      </MapContainer>
    </div>
  );
};

export default SimpleMap;
