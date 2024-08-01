// import { IDev } from "@src/types/IDev";
// import React, { FC } from "react";
// import { useParams, Link, useNavigate } from "react-router-dom";
// import { useAppSelector } from "@hooks/redux";

// interface Props {}
// export const Example: FC<Props> = () => {
//   const { devs } = useAppSelector((state) => state.devSlice);
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const goBack = () => {
//     navigate(-1);
//   };
//   const dev = devs.find((dev) => dev.id === id);
//   return (
//     <>
//       <button onClick={goBack}>Назад</button>
//       <div>
//         Устройство {dev?.name}, номер {dev?.number}
//       </div>
//     </>
//   );
// };
