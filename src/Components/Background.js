import React, { useEffect, useState } from 'react';
import bg from "../image/bg.jpg"

const Background = () => {

    const [imageHeight, setImageHeight] = useState(null);
    const [imageWidth, setImageWidth] = useState(null);
    const [isDragging, setIsDragging] = useState(false);
    const [position, setPosition] = useState({ left: 0, top: 0 });
    const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
    const handleMouseDown = (e) => {
        setIsDragging(true)
        console.log(e.clientX)
        console.log(e.clientY)
        setDragOffset({
            x: e.clientX - position.left,
            y: e.clientY - position.top,
        });
    }
    const handleMouseMove = (e) => {
        // console.log(e.clientX)
        // console.log(e.clientY)
        var windowWidth = window.innerWidth;
        console.log('Window width: ', windowWidth - imageWidth);
        const buttom = 400 - imageHeight;
        const left = windowWidth - imageWidth;
        console.log(e.clientX - dragOffset.x, "e.clientX - dragOffset.x")
        if (isDragging) {
            setPosition({
                // left: e.clientX - dragOffset.x,
                // top: e.clientY - dragOffset.y
                left: e.clientX - dragOffset.x > 0 ? 0 : e.clientX - dragOffset.x < left ? left : e.clientX - dragOffset.x,
                top: e.clientY - dragOffset.y > 0 ? 0 : e.clientY - dragOffset.y < buttom ? buttom : e.clientY - dragOffset.y,
            });
            if (true) {

            }
        }
    }

    useEffect(() => {
        const getImageHeight = async () => {
            try {
                const response = await fetch(bg);
                if (!response.ok) {
                    throw new Error(`Failed to fetch image: ${response.status}`);
                }

                const blob = await response.blob();
                const img = new Image();

                img.onload = () => {
                    setImageHeight(img.height);
                    setImageWidth(img.width);
                };

                img.src = URL.createObjectURL(blob);
            } catch (error) {
                console.error(`Error: ${error.message}`);
                setImageHeight(null);
            }
        };

        getImageHeight();
    }, []);
    // console.log("isDragging", isDragging)
    // console.log("imageHeight >>", imageHeight)

    return (
        <div
            className=' relative h-[400px] border-4 border-[red] bg-zinc-400 z-10 overflow-hidden '
        >
            <div
                className=" absolute bg-cover "
                style={{
                    left: position.left,
                    top: position.top,
                    height: imageHeight,
                    width: imageWidth,
                    cursor: "move",
                    backgroundImage: `url(${bg})`
                }}
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseOut={() => setIsDragging(false)}
                onMouseUp={() => setIsDragging(false)}
            >
            </div>
        </div>
    );
};

export default Background;