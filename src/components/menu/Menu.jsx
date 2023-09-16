
import Image from "next/image";
import Link from "next/link";
import MenuCategories from "../menuCategories/MenuCategories";
import MenuPosts from "../menuPosts/menuPost";
import styles from "./menu.module.css";
const Menu = () => {
    return ( 
        <div className={styles.container}>


            
            <h2 className={styles.subtitle}>{"What's hot"}</h2>
            <h1 className={styles.title}>Most popular</h1>
            <MenuPosts withImage={false}/>
            {/* category section  */}
            <h2 className={styles.subtitle}>Discover by topic</h2>
            <h1 className={styles.title}>Categories</h1>
            <MenuCategories />
          


{/* Editors pick menu section  */}

            <h2 className={styles.subtitle}> Chosen by the editor</h2>
            <h1 className={styles.title}>Editors Pick</h1>
          <MenuPosts withImage={true} />
        </div>
     );
}
 
export default Menu;