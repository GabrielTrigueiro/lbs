// import {
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   DialogContentText,
//   DialogActions,
//   Button,
// } from "@mui/material";
// import { useState } from "react";

// interface IConfProps {
//     title: string
//     handle: ()=>void
// }

// export const ConfirmationBaseLayout: React.FC<IConfProps> = ({title, handle}) => {
//   const [confirm, setConfirm] = useState<true | false>(false);
//   const handleConfirm = () => {
//     confirm ? setConfirm(false) : setConfirm(true);
//   };

//   <Dialog
//     open={confirm}
//     onClose={handleConfirm}
//     aria-labelledby="alert-dialog-title"
//     aria-describedby="alert-dialog-description"
//   >
//     <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
//     <DialogContent>
//       <DialogContentText id="alert-dialog-description">
//         Deseja realmente fechar?
//       </DialogContentText>
//     </DialogContent>
//     <DialogActions>
//       <Button onClick={handleConfirm}>Continuar</Button>
//       <Button
//         onClick={() => {
//           handleConfirm();
//           {handle};
//         }}
//       >
//         Fechar
//       </Button>
//     </DialogActions>
//   </Dialog>;
// };
export {}