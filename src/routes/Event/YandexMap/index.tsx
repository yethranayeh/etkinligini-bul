/** @format */

import { useEffect, useState } from "react";
import { YMaps, Map, ZoomControl, Placemark } from "@pbe/react-yandex-maps";
import styles from "./YandexMap.module.scss";
import { ErrorAlert, InfoAlert } from "components/Alerts";

function YandexMap({ loc }: { loc: { city: string; location: string } }) {
	const [mapData, setMapData] = useState<any>(null);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		let mounted = true;
		if (mounted) {
			async function getMapData() {
				const { city, location } = loc;
				const response = await fetch(
					`https://geocode-maps.yandex.ru/1.x/?apikey=c9fda5cd-424a-4d89-89e8-2c30fde4d331&geocode=${location},+${city},+Türkiye&lang=tr_TR&format=json`
				);
				const data = await response.json();
				const goodPrecision = data.response.GeoObjectCollection.featureMember.find((featureMember: any) => {
					const precision = featureMember.GeoObject.metaDataProperty.GeocoderMetaData.precision;
					return precision === "exact" || precision === "street";
				});
				let mapPos;

				if (goodPrecision) {
					mapPos = goodPrecision.GeoObject.Point.pos.split(" ").map((pos: string) => parseFloat(pos));
				} else {
					mapPos = data.response.GeoObjectCollection.featureMember[0].GeoObject.Point.pos
						.split(" ")
						.map((pos: string) => parseFloat(pos));
				}
				// Switch pos as the library uses it in the opposite order
				mapPos = [mapPos[1], mapPos[0]];
				setMapData(mapPos);
			}
			getMapData();
		}

		return () => {
			mounted = false;
		};
	}, [loc]);

	return error ? (
		<ErrorAlert text={error} />
	) : mapData ? (
		<YMaps
			query={{
				lang: "tr_TR"
			}}>
			<Map
				state={{
					center: mapData,
					zoom: 10,
					controls: []
				}}
				className={styles.map}
				onError={(error: any) => setError(error.message ? error.message : JSON.stringify(error))}>
				<ZoomControl
					options={{
						position: {
							left: "8px",
							top: "2px"
						}
					}}
				/>
				<Placemark geometry={mapData} />
			</Map>
		</YMaps>
	) : (
		<InfoAlert text='Harita verilerine erişilemedi' />
	);
}

export default YandexMap;
