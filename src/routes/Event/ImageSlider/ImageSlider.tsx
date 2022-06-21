/** @format */

import { useRef, useState, useEffect } from "react";
import styles from "./ImageSlider.module.scss";

// from 30 Seconds of Code
// https://www.30secondsofcode.org/css/s/horizontal-gallery
function ImageSlider({ pictures }: { pictures: string[] }) {
	const [active, setActive] = useState(0);
	const slides = pictures.length;
	const slideWidth = 540;

	const thumbnailContainer = useRef<HTMLDivElement>(null);
	const slideGallery = useRef<HTMLDivElement>(null);

	useEffect(() => {
		function nextSlide() {
			let next;
			if (active < slides - 1) {
				next = active + 1;
				setActive(next);
			} else {
				next = 0;
				setActive(next);
			}
			slideGallery.current?.scrollTo(next * slideWidth, 0);
		}

		const autoSlide = setInterval(nextSlide, 4000);

		return () => clearInterval(autoSlide);
	}, [active]);

	return (
		<div className={styles.galleryContainer} aria-label='resim galerisi'>
			<div ref={thumbnailContainer} className={styles.thumbnails} aria-label='resim değiştirme butonları'>
				{pictures.map((picture, index) => (
					<div
						key={`thumbnail-${index}`}
						className={active === index ? styles.highlighted : ""}
						onClick={() => {
							setActive(index);
							slideGallery.current?.scrollTo(index * slideWidth, 0);
						}}
						aria-label='resim değiştirme butonu'></div>
				))}
			</div>
			<div
				ref={slideGallery}
				className={styles.slides}
				onScroll={() => {
					const index = Math.floor(slideGallery.current!.scrollLeft / slideWidth);
					setActive(index);
				}}
				aria-label='Resimler'>
				{pictures.map((picture, index) => (
					<div key={`picture-${index}`} aria-label='Resim kapsayıcı'>
						<img src={picture} alt={`Etkinlik resmi-${index}`} />
					</div>
				))}
			</div>
		</div>
	);
}

export default ImageSlider;
