import React from "react";
import "./Label.css";

export function Label({ text = "text", bgcolor = "#0085ca", color = "#fff" }) {
  const customStyle = {
    backgroundColor: bgcolor,
    color: color,
  };
  return (
    <span className="label" style={customStyle}>
      {text}
    </span>
  );
}

export function TomorrowLabel() {
  return <Label text="Tomorrow" bgcolor="#a8ad00" />;
}
export function TodayLabel() {
  return <Label text="Today" bgcolor="#a8ad00" />;
}
export function StartsTodayLabel() {
  return <Label text="Starts Today" bgcolor="#a8ad00" />;
}
export function ThisWeekLabel() {
  return <Label text="This Week" bgcolor="#de7c00" />;
}
export function NextWeekLabel() {
  return <Label text="Next Week" bgcolor="#de7c00" />;
}
export function OngoingLabel() {
  return <Label text="Ongoing" bgcolor="#a8ad00" />;
}
export function PastEventLabel() {
  return <Label text="Past Event" bgcolor="#f3f3f3" color="#000" />;
}
export function WorkshopLabel() {
  return <Label text="Workshop" bgcolor="#0085ca" />;
}
export function LongtermCourseLabel() {
  return <Label text="Long Term Course" bgcolor="#0085ca" />;
}
