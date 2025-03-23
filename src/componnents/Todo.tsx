import "./Todo.css";
import { GoTrash } from "react-icons/go";
import logo from "../assets/asd.png";
import Checkbox from "@mui/material/Checkbox";
import { FaMoon } from "react-icons/fa";
import { FaSun } from "react-icons/fa";

export type Todos = {
  text: string;
  date: any;
  isActive: boolean;
};

export interface TodoProps extends Todos {
  onDelete: () => void;
}

const Todo = ({ date, isActive, text, onDelete }: TodoProps) => {
  const formatTime = (date: Date) => {
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const ampm = hours >= 12 ? "PM" : "AM";
    const formattedHours = hours % 12 || 12;
    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
    const today = new Date();
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);

    let dayDisplay;
    if (date.toDateString() === today.toDateString()) {
      dayDisplay = "Today";
    } else if (date.toDateString() === yesterday.toDateString()) {
      dayDisplay = "Yesterday";
    } else {
      const days = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
      ];
      dayDisplay = days[date.getDay()];
    }

    return `${dayDisplay} at ${formattedHours}:${formattedMinutes} ${ampm}`;
  };

  const formattedDate = formatTime(date);
  console.log(date, isActive, text);

  return (
    <div className="all">
      <div className="full-cont">
        <div className="line">
          <div className="line-tags">
            <span>{text}</span>
            <span>{formattedDate}</span>
          </div>
          <div className="trash">
            <Checkbox id="click" style={{ color: "green" }} />
            <GoTrash
              id="del"
              onClick={onDelete}
              style={{ cursor: "pointer" }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Todo;
