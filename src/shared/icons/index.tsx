import { SvgIcon, type SvgIconProps } from "@mui/material";
import type { ComponentType } from "react";

export type NavIcon = ComponentType<SvgIconProps>;

export function MenuIcon(props: SvgIconProps) {
  return (
    <SvgIcon {...props}>
      <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z" />
    </SvgIcon>
  );
}

export function DashboardOutlinedIcon(props: SvgIconProps) {
  return (
    <SvgIcon {...props}>
      <path d="M3 13h8V3H3v10zm0 8h8v-6H3v6zm10 0h8V11h-8v10zm0-18v6h8V3h-8z" />
    </SvgIcon>
  );
}

export function BuildingOutlinedIcon(props: SvgIconProps) {
  return (
    <SvgIcon {...props}>
      <path d="M12 7V3H2v18h20V7H12zM6 19H4v-2h2v2zm0-4H4v-2h2v2zm0-4H4V9h2v2zm0-4H4V5h2v2zm4 12H8v-2h2v2zm0-4H8v-2h2v2zm0-4H8V9h2v2zm0-4H8V5h2v2zm10 12h-8v-2h2v-2h-2v-2h2v-2h-2V9h8v10zm-2-8h-2v2h2v-2zm0 4h-2v2h2v-2z" />
    </SvgIcon>
  );
}

export function MeetingRoomOutlinedIcon(props: SvgIconProps) {
  return (
    <SvgIcon {...props}>
      <path d="M14 6v15H3v-2h2V3h9v1h5v15h-2v-2h-2V6h-2zm-4 5v2h2v-2h-2z" />
    </SvgIcon>
  );
}

export function KingBedOutlinedIcon(props: SvgIconProps) {
  return (
    <SvgIcon {...props}>
      <path d="M19 9.78V7c0-1.1-.9-2-2-2h-2V3H9v2H7c-1.1 0-2 .9-2 2v2.78C3.61 10.38 2 12.04 2 14v5h2v-2h16v2h2v-5c0-1.96-1.61-3.62-3.71-4.22z" />
    </SvgIcon>
  );
}

export function HolidayVillageOutlinedIcon(props: SvgIconProps) {
  return (
    <SvgIcon {...props}>
      <path d="M8 4v16h2V4H8zm6 0v10h2V4h-2zM6 4H5v16h1V4h2zm6 0h-2v10h2V4zm5 6v10h1V10h-1z" />
    </SvgIcon>
  );
}

export function HomeOutlinedIcon(props: SvgIconProps) {
  return (
    <SvgIcon {...props}>
      <path d="M12 5.69 17 10.19V18h-5v-6H10v6H7v-7.81zM12 3 2 12h3v8h6v-6h2v6h6v-8h3z" />
    </SvgIcon>
  );
}

export function PeopleOutlinedIcon(props: SvgIconProps) {
  return (
    <SvgIcon {...props}>
      <path d="M9 13.75c-2.34 0-7 1.17-7 3.5V19h14v-1.75c0-2.33-4.66-3.5-7-3.5zM4.34 17c.86-.5 2.74-1 4.66-1 1.91 0 3.8.49 4.66 1H4.34zM9 12c1.93 0 3.5-1.57 3.5-3.5S10.93 5 9 5 5.5 6.57 5.5 8.5 7.07 12 9 12zm0-5c.83 0 1.5.67 1.5 1.5S9.83 10 9 10s-1.5-.67-1.5-1.5S8.17 7 9 7zm7.04 6.81c1.16.84 1.96 1.96 1.96 3.44V19h4v-1.75c0-2.02-3.3-3.34-5.96-3.66zM15 12c1.93 0 3.5-1.57 3.5-3.5S16.93 5 15 5c-.54 0-1.04.13-1.5.35.63.89 1 1.98 1 3.15s-.37 2.26-1 3.15c.46.22.96.35 1.5.35z" />
    </SvgIcon>
  );
}

export function EditIcon(props: SvgIconProps) {
  return (
    <SvgIcon {...props}>
      <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04a1 1 0 0 0 0-1.41l-2.34-2.34a1 1 0 0 0-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z" />
    </SvgIcon>
  );
}

export function ContentCopyOutlinedIcon(props: SvgIconProps) {
  return (
    <SvgIcon {...props}>
      <path d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z" />
    </SvgIcon>
  );
}

export function ChatIcon(props: SvgIconProps) {
  return (
    <SvgIcon {...props}>
      <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H5.17L4 17.17V4h16v12z" />
    </SvgIcon>
  );
}

export function SendOutlinedIcon(props: SvgIconProps) {
  return (
    <SvgIcon {...props}>
      <path d="M2.01 21 23 12 2.01 3 2 10l15 2-15 2z" />
    </SvgIcon>
  );
}

export function DeleteIcon(props: SvgIconProps) {
  return (
    <SvgIcon {...props}>
      <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z" />
    </SvgIcon>
  );
}

export function CloseIcon(props: SvgIconProps) {
  return (
    <SvgIcon {...props}>
      <path d="M19 6.41 17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
    </SvgIcon>
  );
}

export function SearchIcon(props: SvgIconProps) {
  return (
    <SvgIcon {...props}>
      <path d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" />
    </SvgIcon>
  );
}

export function AddIcon(props: SvgIconProps) {
  return (
    <SvgIcon {...props}>
      <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" />
    </SvgIcon>
  );
}

export function EmailOutlinedIcon(props: SvgIconProps) {
  return (
    <SvgIcon {...props}>
      <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4-8 5-8-5V6l8 5 8-5v2z" />
    </SvgIcon>
  );
}

export function LockOutlinedIcon(props: SvgIconProps) {
  return (
    <SvgIcon {...props}>
      <path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1s3.1 1.39 3.1 3.1v2z" />
    </SvgIcon>
  );
}

export function VisibilityIcon(props: SvgIconProps) {
  return (
    <SvgIcon {...props}>
      <path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z" />
    </SvgIcon>
  );
}

export function VisibilityOffIcon(props: SvgIconProps) {
  return (
    <SvgIcon {...props}>
      <path d="M12 7c2.76 0 5 2.24 5 5 0 .65-.13 1.26-.36 1.83l2.92 2.92c1.51-1.26 2.7-2.89 3.43-4.75-1.73-4.39-6-7.5-11-7.5-1.4 0-2.74.25-3.98.7l2.16 2.16C10.74 7.13 11.35 7 12 7zM2 4.27l2.28 2.28.46.46C3.08 8.3 1.78 10.02 1 12c1.73 4.39 6 7.5 11 7.5 1.55 0 3.03-.3 4.38-.84l.42.42L19.73 22 21 20.73 3.27 3 2 4.27zM7.53 9.8l1.55 1.55c-.05.21-.08.43-.08.65 0 1.66 1.34 3 3 3 .22 0 .44-.03.65-.08l1.55 1.55c-.67.33-1.41.53-2.2.53-2.76 0-5-2.24-5-5 0-.79.2-1.53.53-2.2zm4.31-.78 3.15 3.15.02-.16c0-1.66-1.34-3-3-3l-.17.01z" />
    </SvgIcon>
  );
}

export function InfoOutlinedIcon(props: SvgIconProps) {
  return (
    <SvgIcon {...props}>
      <path d="M11 7h2v2h-2zm0 4h2v6h-2zm1-9C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" />
    </SvgIcon>
  );
}

export function CheckIcon(props: SvgIconProps) {
  return (
    <SvgIcon {...props}>
      <path d="M9 16.17 4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
    </SvgIcon>
  );
}

export function LogoutOutlinedIcon(props: SvgIconProps) {
  return (
    <SvgIcon {...props}>
      <path d="M17 7l-1.41 1.41L18.17 11H8v2h10.17l-2.58 2.58L17 17l5-5-5-5zM4 5h8V3H4c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h8v-2H4V5z" />
    </SvgIcon>
  );
}

export function ExpandMoreIcon(props: SvgIconProps) {
  return (
    <SvgIcon {...props}>
      <path d="M16.59 8.59 12 13.17 7.41 8.59 6 10l6 6 6-6-1.41-1.41z" />
    </SvgIcon>
  );
}

export function FilterListOutlinedIcon(props: SvgIconProps) {
  return (
    <SvgIcon {...props}>
      <path d="M10 18h4v-2h-4v2zM3 6v2h18V6H3zm3 7h12v-2H6v2z" />
    </SvgIcon>
  );
}

export function RestartAltIcon(props: SvgIconProps) {
  return (
    <SvgIcon {...props}>
      <path d="M12.5 8c-2.65 0-5.05 1.04-6.9 2.75L1 8v13h13l-3.17-3.17C12.34 18.09 17 16.07 17 12c0-2.21-1.79-4-4.5-4z" />
      <path d="M12.5 6c1.93 0 3.68.78 4.95 2.05l1.41-1.41C16.56 4.9 14.64 4 12.5 4 8.91 4 6 6.91 6 10.5H4c0-4.69 3.81-8.5 8.5-8.5z" />
    </SvgIcon>
  );
}


export function CategoryOutlinedIcon(props: SvgIconProps) {
  return (
    <SvgIcon {...props}>
      <path d="M12 2 6.5 11h11zm0 3.84L13.93 9h-3.87zM17.5 13c-2.49 0-4.5 2.01-4.5 4.5s2.01 4.5 4.5 4.5 4.5-2.01 4.5-4.5-2.01-4.5-4.5-4.5m0 7c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5M3 21.5h8v-8H3zm2-6h4v4H5z" />
    </SvgIcon>
  );
}

export function LocalOfferOutlinedIcon(props: SvgIconProps) {
  return (
    <SvgIcon {...props}>
      <path d="M21.41 11.58l-9-9C12.05 2.22 11.55 2 11 2H4c-1.1 0-2 .9-2 2v7c0 .55.22 1.05.59 1.42l9 9c.36.36.86.58 1.41.58s1.05-.22 1.41-.59l7-7c.37-.36.59-.86.59-1.41 0-.55-.23-1.06-.59-1.42M5.5 7C4.67 7 4 6.33 4 5.5S4.67 4 5.5 4 7 4.67 7 5.5 6.33 7 5.5 7m11.77 4.27-1.85 1.85-1.27-1.27 1.85-1.85 1.27 1.27z" />
    </SvgIcon>
  );
}

export function QuizOutlinedIcon(props: SvgIconProps) {
  return (
    <SvgIcon {...props}>
      <path d="M4 6H2v14c0 1.1.9 2 2 2h14v-2H4V6zm16-4H8c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H8V4h12v12zm-6.49-5.84c.41-.73 1.18-1.16 1.63-1.8.48-.68.21-1.94-1.14-1.94-.88 0-1.32.67-1.5 1.23l-1.37-.57C11.51 5.96 12.52 5 13.99 5c2.49 0 4.18 1.36 4.45 3.11l-1.27.46C16.86 6.58 15.48 6 13.99 6c-1.23 0-2.08.56-2.51 1.26-.37.6-.58 1.73-.01 2.57.63.93 1.23 1.21 1.56 1.81.13.24.18.4.18 1.18h-1.52c-.01-.41-.06-1.08.26-1.66zm-.56 3.79c0-.59.47-1.04 1.05-1.04.59 0 1.04.45 1.04 1.04 0 .58-.44 1.05-1.04 1.05-.58 0-1.05-.47-1.05-1.05z" />
    </SvgIcon>
  );
}

export function PollOutlinedIcon(props: SvgIconProps) {
  return (
    <SvgIcon {...props}>
      <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V5h14v14zM7 10h2v7H7zm4-3h2v10h-2zm4 6h2v4h-2z" />
    </SvgIcon>
  );
}

export function CampaignOutlinedIcon(props: SvgIconProps) {
  return (
    <SvgIcon {...props}>
      <path d="M18 11v2h4v-2h-4zm-2 6.61c.96.71 2.21 1.65 3.2 2.39.4-.53.8-1.07 1.2-1.6-.99-.74-2.24-1.68-3.2-2.4-.4.54-.8 1.08-1.2 1.61zM20.4 5.6c-.4-.53-.8-1.07-1.2-1.6-.99.74-2.24 1.68-3.2 2.4.4.53.8 1.07 1.2 1.6.96-.72 2.21-1.65 3.2-2.4zM4 9c-1.1 0-2 .9-2 2v2c0 1.1.9 2 2 2h1v4h2v-4h1l5 3V6L8 9H4zm5.03 1.71L11 9.53v4.94l-1.97-1.18-.48-.29H4v-2h4.55l4.55 2.71zM15.5 12c0-1.33-.58-2.53-1.5-3.35v6.7c.92-.82 1.5-2.02 1.5-3.35z" />
    </SvgIcon>
  );
}

export function SpaOutlinedIcon(props: SvgIconProps) {
  return (
    <SvgIcon {...props}>
      <path d="M9.22 9.22C8.48 9.79 8 10.65 8 11.63c0 .98.48 1.84 1.22 2.41L12 17.22l2.78-3.18c.74-.57 1.22-1.43 1.22-2.41 0-.98-.48-1.84-1.22-2.41L12 6.78 9.22 9.22zm2.78-6.7 4.24 4.24c1.17 1.17 1.76 2.71 1.76 4.24s-.59 3.07-1.76 4.24L12 21.22l-4.24-4.24C6.59 15.81 6 14.27 6 12.75s.59-3.07 1.76-4.24L12 4.28z" />
    </SvgIcon>
  );
}

export function HandymanOutlinedIcon(props: SvgIconProps) {
  return (
    <SvgIcon {...props}>
      <path d="m21.67 18.17-5.3-5.3h-.99l-2.54 2.54v.99l5.3 5.3c.39.39 1.02.39 1.41 0l2.12-2.12c.39-.39.39-1.02 0-1.41zM17.34 10 15.94 8.6l-6.01 6.01 1.4 1.4 6.01-6.01zM3.25 13.72l2.34 2.34L3 19.65V22h2.35l3.59-3.59 2.34 2.34 1.41-1.41L4.66 12.31 3.25 13.72z" />
    </SvgIcon>
  );
}

export function ConfirmationNumberOutlinedIcon(props: SvgIconProps) {
  return (
    <SvgIcon {...props}>
      <path d="M22 10V6c0-1.11-.9-2-2-2H4c-1.1 0-2 .89-2 2v4c1.1 0 2 .9 2 2s-.9 2-2 2v4c0 1.1.9 2 2 2h16c1.1 0 2-.89 2-2v-4c-1.1 0-2-.9-2-2s.9-2 2-2zm-2-1.46c-1.19.69-2 1.99-2 3.46s.81 2.77 2 3.46V18H4v-2.54c1.19-.69 2-1.99 2-3.46 0-1.48-.8-2.77-2-3.46V6h16v2.54zM11 15h2v2h-2zm0-4h2v2h-2zm0-4h2v2h-2z" />
    </SvgIcon>
  );
}

export function SettingsOutlinedIcon(props: SvgIconProps) {
  return (
    <SvgIcon {...props}>
      <path d="M19.14 12.94c.04-.31.06-.63.06-.94 0-.31-.02-.63-.06-.94l2.03-1.58c.18-.14.23-.41.12-.61l-1.92-3.32c-.12-.22-.37-.29-.59-.22l-2.39.96c-.5-.38-1.03-.7-1.62-.94l-.36-2.54c-.04-.24-.24-.41-.48-.41h-3.84c-.24 0-.43.17-.47.41l-.36 2.54c-.59.24-1.13.57-1.62.94l-2.39-.96c-.22-.08-.47 0-.59.22L2.74 8.87c-.12.21-.08.47.12.61l2.03 1.58c-.04.31-.06.63-.06.94s.02.63.06.94l-2.03 1.58c-.18.14-.23.41-.12.61l1.92 3.32c.12.22.37.29.59.22l2.39-.96c.5.38 1.03.7 1.62.94l.36 2.54c.05.24.24.41.48.41h3.84c.24 0 .44-.17.47-.41l.36-2.54c.59-.24 1.13-.56 1.62-.94l2.39.96c.22.08.47 0 .59-.22l1.92-3.32c.12-.22.07-.47-.12-.61l-2.01-1.58zM12 15.6c-1.98 0-3.6-1.62-3.6-3.6s1.62-3.6 3.6-3.6 3.6 1.62 3.6 3.6-1.62 3.6-3.6 3.6z" />
    </SvgIcon>
  );
}

export function FolderOutlinedIcon(props: SvgIconProps) {
  return (
    <SvgIcon {...props}>
      <path d="M10 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2h-8l-2-2z" />
    </SvgIcon>
  );
}

export function DescriptionOutlinedIcon(props: SvgIconProps) {
  return (
    <SvgIcon {...props}>
      <path d="M14 2H6c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z" />
    </SvgIcon>
  );
}

export function DriveFileMoveOutlinedIcon(props: SvgIconProps) {
  return (
    <SvgIcon {...props}>
      <path d="M20 6h-8l-2-2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zm-6 12H4V6h5.17l2 2H20v10h-6zm-4-6v2h6v-2h-6zm-4 0H4v2h2v-2z" />
    </SvgIcon>
  );
}

export function FileDownloadOutlinedIcon(props: SvgIconProps) {
  return (
    <SvgIcon {...props}>
      <path d="M18 15v3H6v-3H4v3c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2v-3h-2zm-1-4-1.41-1.41L13 12.17V4h-2v8.17L8.41 9.59 7 11l5 5 5-5z" />
    </SvgIcon>
  );
}

export function AttachFileOutlinedIcon(props: SvgIconProps) {
  return (
    <SvgIcon {...props}>
      <path d="M16.5 6v11.5c0 2.21-1.79 4-4 4s-4-1.79-4-4V5c0-1.38 1.12-2.5 2.5-2.5s2.5 1.12 2.5 2.5v10.5c0 .55-.45 1-1 1s-1-.45-1-1V6H10v9.5c0 1.38 1.12 2.5 2.5 2.5s2.5-1.12 2.5-2.5V5c0-2.21-1.79-4-4-4S7 2.79 7 5v12.5c0 3.04 2.46 5.5 5.5 5.5s5.5-2.46 5.5-5.5V6h-1.5z" />
    </SvgIcon>
  );
}

export function HistoryOutlinedIcon(props: SvgIconProps) {
  return (
    <SvgIcon {...props}>
      <path d="M13 3c-4.97 0-9 4.03-9 9H1l3.89 3.89.07.14L9 12H6c0-3.87 3.13-7 7-7s7 3.13 7 7-3.13 7-7 7c-1.93 0-3.68-.79-4.94-2.06l-1.42 1.42C8.27 19.99 10.51 21 13 21c4.97 0 9-4.03 9-9s-4.03-9-9-9zm-1 5v5l4.28 2.54.72-1.21-3.5-2.08V8H12z" />
    </SvgIcon>
  );
}

export function ShieldOutlinedIcon(props: SvgIconProps) {
  return (
    <SvgIcon {...props}>
      <path d="M12 1 3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm0 10.99h7c-.53 4.12-3.28 7.79-7 8.94V12H5V6.3l7-3.11v8.8z" />
    </SvgIcon>
  );
}

export function ScheduleOutlinedIcon(props: SvgIconProps) {
  return (
    <SvgIcon {...props}>
      <path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z" />
    </SvgIcon>
  );
}

export function MapOutlinedIcon(props: SvgIconProps) {
  return (
    <SvgIcon {...props}>
      <path d="M20.5 3l-.16.03L15 5.1 9 3 3.36 4.9c-.21.07-.36.25-.36.48V20.5c0 .28.22.5.5.5l.16-.03L9 18.9l6 2.1 5.64-1.9c.21-.07.36-.25.36-.48V3.5c0-.28-.22-.5-.5-.5zM15 19l-6-2.11V5l6 2.11V19z" />
    </SvgIcon>
  );
}

export function Inventory2OutlinedIcon(props: SvgIconProps) {
  return (
    <SvgIcon {...props}>
      <path d="M20 2H4c-1 0-2 .9-2 2v3.01c0 .72.43 1.34 1 1.69V20c0 1.1 1.1 2 2 2h14c.9 0 2-.9 2-2V8.7c.57-.35 1-.97 1-1.69V4c0-1.1-1-2-2-2zm-5 12H9v-2h6v2zm5-7H4V4h16v3z" />
    </SvgIcon>
  );
}

export function BadgeOutlinedIcon(props: SvgIconProps) {
  return (
    <SvgIcon {...props}>
      <path d="M14 12h-4v-2h4v2zm0-4h-4V6h4v2zm6 9.5V19c0 1.1-.9 2-2 2H6c-1.1 0-2-.9-2-2v-1.5c0-1.93 3.58-3.5 8-3.5s8 1.57 8 3.5zM18 19c-.22-.72-3.31-2-6-2s-5.78 1.28-6 2h12zM12 2C9.79 2 8 3.79 8 6s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4zm0 6c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2z" />
    </SvgIcon>
  );
}

export function TableRowsOutlinedIcon(props: SvgIconProps) {
  return (
    <SvgIcon {...props}>
      <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V5h14v14zM7 10h2v7H7v-7zm4-3h2v10h-2V7zm4 6h2v4h-2v-4z" />
    </SvgIcon>
  );
}

export function CalendarMonthOutlinedIcon(props: SvgIconProps) {
  return (
    <SvgIcon {...props}>
      <path d="M19 4h-1V2h-2v2H8V2H6v2H5c-1.11 0-1.99.9-1.99 2L3 20c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V10h14v10zm0-12H5V6h14v2z" />
    </SvgIcon>
  );
}

export function ChevronLeftIcon(props: SvgIconProps) {
  return (
    <SvgIcon {...props}>
      <path d="M15.41 7.41 14 6l-6 6 6 6 1.41-1.41L10.83 12z" />
    </SvgIcon>
  );
}

export function ChevronRightIcon(props: SvgIconProps) {
  return (
    <SvgIcon {...props}>
      <path d="M10 6 8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z" />
    </SvgIcon>
  );
}

export function ViewWeekOutlinedIcon(props: SvgIconProps) {
  return (
    <SvgIcon {...props}>
      <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11zM7 10h5v5H7v-5z" />
    </SvgIcon>
  );
}

