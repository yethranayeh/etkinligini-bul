/** @format */

import styles from "./Navbar.module.scss";
import { Link } from "react-router-dom";
import { Search } from "components/Search";
import { Title, Button } from "@mantine/core";

function Navbar() {
	const links = ["festival", "konser", "tiyatro"];
	return (
		<nav className={styles.container}>
			<Link to='/'>
				<Title order={1} className={styles.title}>
					Etkinliğini Bul
				</Title>
			</Link>
			<Search />
			<section className={styles.links}>
				{links.map((link) => (
					<Button key={link} component={Link} to={`/etkinlikler?kategori=${link}`} className={styles.link}>
						{link[0].toUpperCase() + link.slice(1)}
					</Button>
				))}
				<Button component={Link} to={`/etkinlikler`} className={styles.link}>
					Etkinlikler
				</Button>
			</section>
		</nav>
	);
}

export default Navbar;
