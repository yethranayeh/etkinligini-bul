/** @format */

import styles from "./Navbar.module.scss";
import { Link } from "react-router-dom";
import { Search } from "components/Search";
import { Title } from "@mantine/core";

function Navbar() {
	return (
		<nav className={styles.container}>
			<Link to='/'>
				<Title order={1} className={styles.title}>
					Etkinliğini Bul
				</Title>
			</Link>
			<section className={styles.links}>
				<Search />
				<Link className={styles.link} to='/konser'>
					Konser
				</Link>
				<Link className={styles.link} to='/tiyatro'>
					Tiyatro
				</Link>
				<Link className={styles.link} to='/festival'>
					Festival
				</Link>
			</section>
		</nav>
	);
}

export default Navbar;
