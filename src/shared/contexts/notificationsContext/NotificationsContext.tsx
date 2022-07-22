import { Box } from "@mui/material"
import { useState } from "react"
import { Notifications } from "../../components/notifications/Notifications"

export const NotificationsProvider: React.FC = ({children}) => {

    const [type, setType] = useState<boolean>(true)
    const [message, setMessage] = useState<string>('testando')
    return(
        <Box>
            <Notifications message={message} type={type}/>
            {children}
        </Box>
    )
}