import { useRef, useEffect, useState } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import MapboxGeocoder from "@mapbox/mapbox-gl-geocoder";
import "@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css";
import { FaLocationArrow } from "react-icons/fa";
import "./mapbox.css";
import { Checkbox, TextField } from "@mui/material";
import { Price } from "../fetch/Price";

const MapboxComponent = ({
  user,
  userData,
  setShow,
  setForm,
  id_car_type,
  setForma,
  setPrice1,
}) => {
  const [price, setPrice] = useState(0);
  const accessToken =
    "pk.eyJ1IjoiYXppemtoYWxlZCIsImEiOiJjbHhobmsxM2UxYTRoMm5yMmNncng5c3doIn0.Ybgma2XqB2-Nfn-VvLkATQ";
  const phone = userData.id_employer.id_employer.phonenumberp;
  const mapContainerRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const startId = useRef(null);
  const endId = useRef(null);
  const [current, setcurrent] = useState();
  const [startPoint, setStartPoint] = useState(null);
  const [endPoint, setEndPoint] = useState(null);
  const [startText, setStartText] = useState("");
  const [endText, setEndText] = useState("");
  const [startGeo, setStartGeo] = useState();
  const [distance, setDistance] = useState(0);
  const [isChecked, setIsChecked] = useState(false);
  const startMarkerRef = useRef(null);
  const endMarkerRef = useRef(null);

  useEffect(() => {
    Price(distance, id_car_type, setPrice);
  }, [distance]);

  useEffect(() => {
    setPrice1(price);
  }, [price]);

  useEffect(() => {
    mapboxgl.accessToken = accessToken;

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        const data = [longitude, latitude];
        setcurrent(data);

        if (data && mapContainerRef.current) {
          // Create the map instance
          mapInstanceRef.current = new mapboxgl.Map({
            container: mapContainerRef.current,
            center: data,
            zoom: 13,
            style: "mapbox://styles/mapbox/streets-v11",
          });

          // Add navigation control
          mapInstanceRef.current.addControl(
            new mapboxgl.NavigationControl(),
            "top-left"
          );

          mapInstanceRef.current.addControl(
            new mapboxgl.GeolocateControl({
              positionOptions: {
                enableHighAccuracy: false,
              },
              trackUserLocation: true,
            }),
            "top-left"
          );

          // Handle map load
          mapInstanceRef.current.on("load", () => {
            const startPointGeocoder = new MapboxGeocoder({
              accessToken: accessToken,
              marker: true,
              placeholder: "أدخل نقطة البداية",
              flyTo: true,
              mapboxgl: mapboxgl,
            });

            const endPointGeocoder = new MapboxGeocoder({
              accessToken: accessToken,
              marker: true,
              placeholder: "أدخل نقطة النهاية",
              flyTo: true,
              mapboxgl: mapboxgl,
            });

            setStartGeo(startPointGeocoder);

            startPointGeocoder.on("result", (event) => {
              handleGeocoderSelection(event.result, "start");
            });

            endPointGeocoder.on("result", (event) => {
              handleGeocoderSelection(event.result, "end");
            });

            startPointGeocoder.addTo(startId.current);
            endPointGeocoder.addTo(endId.current);
          });

          return () => {
            if (mapInstanceRef.current) {
              mapInstanceRef.current.remove();
            }
          };
        }
      },
      (error) => {
        console.error("Error getting current location:", error);
      }
    );
  }, [accessToken]);

  useEffect(() => {
    const handleDirections = () => {
      if (startPoint && endPoint) {
        const profile = "driving";
        const startCoords = `${startPoint[0]},${startPoint[1]}`;
        const endCoords = `${endPoint[0]},${endPoint[1]}`;
        const url = `https://api.mapbox.com/directions/v5/mapbox/${profile}/${startCoords};${endCoords}?geometries=geojson&access_token=${accessToken}`;

        fetch(url)
          .then((response) => response.json())
          .then((data) => {
            if (data.routes && data.routes.length > 0) {
              setDistance(Math.round(data.routes[0].distance / 1000));
              const route = data.routes[0];
              const routeGeoJSON = {
                type: "Feature",
                geometry: route.geometry,
              };

              if (mapInstanceRef.current.getSource("directions-source")) {
                mapInstanceRef.current
                  .getSource("directions-source")
                  .setData(routeGeoJSON);
              } else {
                mapInstanceRef.current.addSource("directions-source", {
                  type: "geojson",
                  data: routeGeoJSON,
                });

                mapInstanceRef.current.addLayer({
                  id: "directions-route",
                  type: "line",
                  source: "directions-source",
                  layout: {
                    "line-join": "round",
                    "line-cap": "round",
                  },
                  paint: {
                    "line-color": "#3887be",
                    "line-width": 5,
                    "line-opacity": 0.75,
                  },
                });
              }

              // Update the map center to fit the route bounds
              const coordinates = route.geometry.coordinates;
              const bounds = coordinates.reduce(
                (b, coord) => b.extend(coord),
                new mapboxgl.LngLatBounds(coordinates[0], coordinates[0])
              );
              mapInstanceRef.current.fitBounds(bounds, { padding: 20 });
            }
          })
          .catch((error) => console.error("Error fetching directions:", error));
      }
    };
    handleDirections();
  }, [startPoint, endPoint]);

  const handleGeocoderSelection = (selected, type) => {
    if (selected && selected.geometry && selected.geometry.coordinates) {
      const coordinates = selected.geometry.coordinates;

      if (type === "start") {
        setStartPoint(coordinates);

        if (startMarkerRef.current) {
          startMarkerRef.current.remove();
        }

        startMarkerRef.current = new mapboxgl.Marker()
          .setLngLat(coordinates)
          .addTo(mapInstanceRef.current);
        mapInstanceRef.current.flyTo({
          center: coordinates,
          zoom: 14,
          essential: true, // this animation is considered essential with respect to prefers-reduced-motion
        });
      } else if (type === "end") {
        setEndPoint(coordinates);

        if (endMarkerRef.current) {
          endMarkerRef.current.remove();
        }

        endMarkerRef.current = new mapboxgl.Marker()
          .setLngLat(coordinates)
          .addTo(mapInstanceRef.current);

        mapInstanceRef.current.flyTo({
          center: coordinates,
          zoom: 14,
          essential: true,
        });
      }
    } else {
      console.error(`Invalid selection object for ${type}:`, selected);
    }
  };

  const reverseLocation = (longitude, latitude) => {
    fetch(
      `https://api.mapbox.com/search/geocode/v6/reverse?longitude=${longitude}&latitude=${latitude}&access_token=${accessToken}`
    )
      .then((response) => response.json())
      .then((data) => {
        if (data.features && data.features.length > 0) {
          const address = data.features[0].properties.place_formatted;
          setStartText(address);
          startGeo.setInput(startText);
        }
      })
      .catch((error) => console.error("Error fetching address:", error));
  };

  const reverseLocationA = async (longitude, latitude, type) => {
    try {
      const response = await fetch(
        `https://api.mapbox.com/search/geocode/v6/reverse?longitude=${longitude}&latitude=${latitude}&access_token=${accessToken}`
      );
      const data = await response.json();
      if (data.features && data.features.length > 0) {
        const address = data.features[0].properties.place_formatted;
        return address;
      } else {
        return null;
      }
    } catch (error) {
      console.error("Error fetching address:", error);
      return null;
    }
  };

  useEffect(() => {
    if (startPoint && endPoint) {
      const fetchAdresses = async () => {
        const start = await reverseLocationA(startPoint[0], startPoint[1], 1);
        const end = await reverseLocationA(endPoint[0], endPoint[1], 2);
        setStartText(start);
        setEndText(end);
      };

      fetchAdresses();
    }
  }, [endPoint, startPoint]);

  const setCurrentLocationAsStartPoint = () => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        reverseLocation(longitude, latitude);

        if (current) {
          setStartPoint(current);
          if (startMarkerRef.current) {
            startMarkerRef.current.remove();
          }
          startMarkerRef.current = new mapboxgl.Marker()
            .setLngLat(current)
            .addTo(mapInstanceRef.current);
          mapInstanceRef.current.flyTo({
            center: current,
            zoom: 14,
            essential: true, // this animation is considered essential with respect to prefers-reduced-motion
          });
        }
      },
      (error) => {
        console.error("Error getting current location:", error);
      }
    );

    if (startText) {
      startGeo.setInput(startText);
    }
  };

  const handleSubmit = async () => {
    setForm((prevState) => ({
      ...prevState,
      from_lon: startPoint[0],
      from_lat: startPoint[1],
      to_lon: endPoint[0],
      to_lat: endPoint[1],
      distention: distance,
      id_zaboun: user.id,
    }));

    setForma((prevState) => ({
      ...prevState,
      start: startText,
      end: endText,
    }));

    setShow(true);
  };

  const handleCheckboxChange = () => {
    setIsChecked((prevChecked) => !prevChecked); // Toggle checkbox state
    if (isChecked) {
      setPrice(price - 2000);
    } else {
      setPrice(price + 2000);
    }
  };

  return (
    <>
      <div className=" w-full bg-white rounded">
        <div className="flex flex-col w-full justify-between items-end mb-5">
          <div className="w-full flex justify-end">
            <h1 className="text-xl font-bold my-5"> أضف رافعة</h1>
            <Checkbox checked={isChecked} onChange={handleCheckboxChange} />
          </div>
        </div>
        <div className="text-end flex w-full justify-between">
          <div className="w-[40%]">
            <label className="block mb-2 text-lg font-medium text-background ">
              الى
            </label>
            <div
              ref={endId}
              dir="rtl"
              id="end-point-geocoder"
              className="w-full p-2 text-background"
            ></div>
          </div>

          <div className="w-[40%] flex flex-col items-center justify-center">
            <div className="w-full">
              <label className=" mb-2 text-lg font-medium text-background ">
                من
              </label>
              <div className="flex items-center text-end mb-5 ">
                <FaLocationArrow
                  className="text-xl cursor-pointer text-background hover:text-accent duration-200"
                  onClick={setCurrentLocationAsStartPoint}
                />
                <div
                  ref={startId}
                  dir="rtl"
                  id="start-point-geocoder"
                  className="w-full p-2 text-background"
                ></div>
              </div>
            </div>
          </div>
        </div>

        <div className="mb-5">
          <label className="block my-2 text-lg font-medium text-background ">
            المسافة
          </label>
          <TextField
            className="w-full mb-5 bg-white rounded-lg"
            id="outlined-read-only-input"
            dir="rtl"
            value={distance}
            InputProps={{
              readOnly: true,
            }}
          />
        </div>

        <div
          id="map-container"
          ref={mapContainerRef}
          className="w-full h-[50vh]"
        ></div>

        <div className="mb-5">
          <label className="block my-2 text-lg font-medium text-background ">
            السعر
          </label>
          <TextField
            className="w-full bg-white rounded-lg"
            id="outlined-read-only-input"
            dir="rtl"
            value={price}
            InputProps={{
              readOnly: true,
            }}
          />
        </div>

        <button
          onClick={handleSubmit}
          className="w-full text-light bg-background hover:bg-accent duration-300 text-lg focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg my-5 px-5 py-2.5 text-center "
        >
          الانتقال الى الدفع
        </button>
      </div>
    </>
  );
};

export default MapboxComponent;
