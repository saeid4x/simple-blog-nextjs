"use client";


import Image from 'next/image';
import { useEffect, useState } from 'react';
import styles from './writePage.module.css';
import ReactQuill from 'react-quill';
import "react-quill/dist/quill.bubble.css"
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import {getStorage,ref,uploadBytesResumable, getDownloadURL} from "firebase/storage";
import { app } from '@/utils/firebase';

const storage = getStorage(app);
const WritePage = () => {

    const [open, setOpen] = useState(false);
    const [file,setFile] = useState(null);
    const [media,setMedia] = useState("");
    const [value, setValue] = useState("");
    const [title,setTitle] = useState("");
    const {data, status} = useSession();
    const router = useRouter();  

    useEffect(() => {
        const upload = () => {
            const fileName=new Date().getTime + file.name;
            const storageRef = ref(storage, fileName);

        const uploadTask = uploadBytesResumable(storageRef, file);

        // Register three observers:
        // 1. 'state_changed' observer, called any time the state changes
        // 2. Error observer, called on failure
        // 3. Completion observer, called on successful completion
        uploadTask.on('state_changed', 
        (snapshot) => {
            // Observe state change events such as progress, pause, and resume
            // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log('Upload is ' + progress + '% done');
            switch (snapshot.state) {
            case 'paused':
                console.log('Upload is paused');
                break;
            case 'running':
                console.log('Upload is running');
                break;
            }
        }, 
        (error) => {
            // Handle unsuccessful uploads
        }, 
        () => {
            // Handle successful uploads on complete
            // For instance, get the download URL: https://firebasestorage.googleapis.com/...
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            console.log('File available at', downloadURL);
            setMedia(downloadURL);
            // console.log("#media=",media)
            });
        }
        );
                };
        file && upload()
    } , [file])
  
    

    if(status === "loading"){
        return <div className={styles.loading}> Loading...</div>
    }

    if(status === "unauthenticated"){
        router.push("/login");
    }


    //convert title to slug 
    //ex: Lama Dev => lama-dev
    const stringToSlug = (str) => str
                                .toLowerCase()
                                .trim()
                                .replace(/[^\w/s-]/g, "")
                                .replace(/[\s_-]+/g, "-")
                                .replace(/^-+|-+s/g, "")
    const handleSubmit =async () => {
        console.log('media=',media)
        try{
            if(media !==''){

                const res=await fetch("/api/posts" , {
                    method:"POST",
                    body:JSON.stringify({
                        title, 
                        desc: value, 
                        img: media, 
                        slug:stringToSlug(title),
                        catSlug:'travel'
                    })
        
                });
                console.log(res)
            }

        }catch(error){
            throw new Error(error)
        }
      
        
      
    }

    return ( 
        <div className={styles.container}>
            <input type="text" placeholder='Title ...' className={styles.input} onChange={e=>setTitle(e.target.value)}/>

            {/* add category here... */}
            <div className={styles.editor}>
                <button className={styles.button} onClick={() => setOpen(!open)}>
                    <Image src="/plus.png" alt="" width={16} height={16} />
                </button>

                {open && (
                    <div className={styles.add}>
                        <input type="file" id="image" onChange={e=>setFile(e.target.files[0])} style={{display:"none"}}  />

                            <button className={styles.addButton}>
                                <label htmlFor='image'>                            
                                    <Image src="/image.png" alt="" width={16} height={16} />
                                </label>
                            </button>
                        

                        <button className={styles.addButton}>
                            <Image src="/external.png" alt="" width={16} height={16} />
                        </button>

                        <button className={styles.addButton}>
                            <Image src="/video.png" alt="" width={16} height={16} />
                        </button>
                    </div>
                )}
                <ReactQuill
                     theme="bubble" 
                     value={value} 
                     onChange={setValue} 
                     placeholder="Tell your story..."
                     className={styles.textArea}
                     />
            </div>

            <button className={styles.publish} onClick={handleSubmit}>Publish</button>
        </div>
     );
}
 
export default WritePage;