import { FC, useEffect, useState } from "react";
import { SchemeView } from "./SchemeView";
import { useAppSelector } from "@hooks/redux";

interface Props {
  isLoading: boolean;
}
export const Scheme: FC<Props> = (props) => {
  const { ...other } = props;
  const { selectedLocation } = useAppSelector((state) => state.locationSlice);
  const [svg, setSvg] = useState("");
  useEffect(() => {
    if (
      selectedLocation &&
      "svg" in selectedLocation &&
      typeof selectedLocation?.svg === "string"
    ) {
      const svg = atob(
        selectedLocation?.svg?.replace(/data:image\/svg\+xml;base64,/, "")
      );
      setSvg(svg);
    }
  }, [selectedLocation]);

  return <SchemeView {...other} svg={svg} />;
};
