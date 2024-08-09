import { eVariantModal } from "@src/types/EvariantModal";
import { ScreenRoute } from "@src/types/Screen.routes.enum";
import PersonAddAltOutlinedIcon from "@mui/icons-material/PersonAddAltOutlined";
import DomainAddOutlinedIcon from "@mui/icons-material/DomainAddOutlined";
import AddchartOutlinedIcon from "@mui/icons-material/AddchartOutlined";
import ControlPointDuplicateOutlinedIcon from "@mui/icons-material/ControlPointDuplicateOutlined";
import AddBusinessOutlinedIcon from "@mui/icons-material/AddBusinessOutlined";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import InsertChartOutlinedOutlinedIcon from "@mui/icons-material/InsertChartOutlinedOutlined";
import DomainOutlinedIcon from "@mui/icons-material/DomainOutlined";
import WorkOutlineOutlinedIcon from "@mui/icons-material/WorkOutlineOutlined";
import ArrowCircleDownOutlinedIcon from "@mui/icons-material/ArrowCircleDownOutlined";
const { newDev, newJob, newOrg, newUser, newWell } = eVariantModal;
export const sideBarModalsData = [
  {
    id: "1",
    title: "Добавить пользователя",
    modal: newUser,
    icon: PersonAddAltOutlinedIcon,
  },
  {
    id: "2",
    title: "Добавить организацию",
    modal: newOrg,
    icon: DomainAddOutlinedIcon,
  },
  {
    id: "3",
    title: "Добавить должность",
    modal: newJob,
    icon: AddBusinessOutlinedIcon,
  },
  {
    id: "4",
    title: "Добавить скважину",
    modal: newWell,
    icon: ControlPointDuplicateOutlinedIcon,
  },
  {
    id: "5",
    title: "Добавить устройство",
    modal: newDev,
    icon: AddchartOutlinedIcon,
  },
];
export const sideBarLinksData = [
  {
    id: "1",
    title: "Устройства",
    link: ScreenRoute.MAIN,
    icon: InsertChartOutlinedOutlinedIcon,
  },
  {
    id: "2",
    title: "Пользователи",
    link: ScreenRoute.USERS,
    icon: PersonOutlineOutlinedIcon,
  },
  {
    id: "3",
    title: "Организации",
    link: ScreenRoute.ORGS,
    icon: DomainOutlinedIcon,
  },
  {
    id: "4",
    title: "Должности",
    link: ScreenRoute.POSTS,
    icon: WorkOutlineOutlinedIcon,
  },
  {
    id: "5",
    title: "Скважины",
    link: ScreenRoute.WELLS,
    icon: ArrowCircleDownOutlinedIcon,
  },
];

export const periodOptionsData = [
  { id: "1", label: "Один раз в день", value: "1" },
  { id: "2", label: "Один раз в 7 дней", value: "7" },
  { id: "3", label: "Один раз в 14 дней", value: "14" },
  { id: "4", label: "Один раз в 30(31) дней", value: "31" },
];
