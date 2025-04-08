"use client"

import Image from 'next/image';
import React, { useEffect, useState } from 'react';

// Funny little backup in case what is being read is secret (passwords, etc.)
const CoverImage = () => {
    const [isCovering, setIsCovering] = useState(false);

    useEffect(() => {
        function keyDown (e: KeyboardEvent) {
            if (e.key === "F7") {
                e.preventDefault();
                setIsCovering(true);
            }
        }

        document.getElementById('image-cover')?.setAttribute('draggable', 'false');
        
        window.addEventListener("keydown", keyDown)

        return () => {
            window.removeEventListener("keydown", keyDown)
        }
    }, [isCovering])

    if (isCovering)
    return (
        <div style={{
            width: "100vw", 
            height: "100vh", 
            position: "absolute", 
            zIndex: 10000
            }}>  
            <button 
                className='hidden-until-hover'
                style={{
                    position: "absolute",
                    bottom: 0,
                    left: 0,
                    zIndex: 10001,
                    backgroundColor: "white",
                    borderRadius: "0%",
                    width: "20px",
                    height: "20px",
                    color: "black",
                }} 
                onClick={() => setIsCovering(false)}
            />
            <Image
                id="image-cover"
				src={"/Image.png"}
				alt={""}
				width={20000}
				height={20000}
				style={{
                    userSelect: "none",
                    pointerEvents: "none"
				}}
			/>
        </div>
    );
};

export default CoverImage;

const Cover = () => {
    return (
        <div>

        </div>
    )
}