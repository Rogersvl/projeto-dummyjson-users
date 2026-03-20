"use client";
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

// Fix Leaflet's default icon paths (required when bundling with Next.js)
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

export default function UserMap({ user }) {
    if(!user) {
        return null;
    }

    const position = [
        Number(user.address.coordinates.lat),
        Number(user.address.coordinates.lng),
    ];

    return (

        <div className="h-72 w-full mt-4 rounded-lg overflow-hidden">
            <MapContainer
                className="h-full w-full"
                center={position}
                zoom={13}
                
                scrollWheelZoom={true}
            >
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Marker position={position}>
                    <Popup>
                        {user.firstName} {user.lastName}
                    </Popup>
                </Marker>
            </MapContainer>
        </div>


    )
}