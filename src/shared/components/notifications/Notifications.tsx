import { Box, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import "./style.css"

interface Iprops{
    type: boolean
    message: string
}

export const Notifications: React.FC<Iprops> = ({ message, type }) => {

    const [exit, setExit] = useState(false);
    const [width, setWidth] = useState(0);
    const [intervalID, setIntervalID] = useState(0);

    const handleStartTimer = () => {
        const id:number = window.setInterval(() => {
        setWidth(prev => {
            if (prev < 100) {
            return prev + 0.5;
            }

            clearInterval(id);
            return prev;
        });
        }, 20);

        setIntervalID(id);
    };

    const handlePauseTimer = () => {
        clearInterval(intervalID);
    };

    const handleCloseTimer = () => {
        handlePauseTimer()
        setExit(true)
        setTimeout(()=>{

        },20)
    }

    useEffect(() => {
        if (width === 90) {
            handleCloseTimer()
        }
      }, [width])

    useEffect(()=>{
        handleStartTimer()
    },[])

    return (
        <Box className="ades"
            sx={{
                position: "fixed",
                bottom: "10px",
                right: "10px",
                width: "300px",
            }}
            >
            <div
                className={`item ${exit ? "exit" : ""}`}
                onMouseEnter={handlePauseTimer}
                onMouseLeave={handleStartTimer}
            >
                <Typography sx={{ margin: 0, padding: "10px"}}>{message}</Typography>
                <Box
                    style={{ backgroundColor: type ? "#42FF00" : "rgba(255,99,71)", width: `${width}%`}}
                    sx={{ height: "10px"}}
                />
            </div>
        </Box>  
  );
};
