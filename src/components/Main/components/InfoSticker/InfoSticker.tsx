import { useState, useEffect } from "react";
import { InfoStickerView } from "./InfoStickerView";
import { useAuth } from "@hooks/useAuth";
import { useAppSelector } from "@hooks/redux";

export const InfoSticker = () => {
  const { isSelected } = useAppSelector((state) => state.locationSlice);
  const [isAdmin, setIsAdmin] = useState(false);
  const auth = useAuth();

  useEffect(() => {
    // Если у пользователя есть права редактирования:
    if (auth && "user" in auth && auth?.user?.roles_ids.roles[1] === 2)
      setIsAdmin(true);
  }, [auth?.user]);
  return <InfoStickerView isAdmin={isAdmin} isVisible={isSelected} />;
};
