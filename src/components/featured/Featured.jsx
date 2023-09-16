
import Image from "next/image";
import styles from "./featured.module.css";
const Featured = () => {
    return ( 
        <div className={styles.container}>
            <h1 className={styles.title}>
                <b>Hey, lama dev here!</b> Discover my stories and creative ideas.
            </h1>

            <div className={styles.post}>

                <div className={styles.imgContainer}>
                    <Image src="/p1.jpeg" alt="" fill className={styles.image} />
                </div>

                <div className={styles.textContainer}>
                    <h1 className={styles.postTitle}>Lorem ipsum dolor, sit amet consectetur adipisicing elit.  </h1>
                    
                    <p className={styles.postDescription}>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.                     
                    </p>

                    <button className={styles.button}>Read More</button>

                </div>

            </div>
        </div>
     );
}
 
export default Featured;