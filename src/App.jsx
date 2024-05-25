import React, { useState, useEffect } from "react";
import "./App.css";
import Note from "./Note.svg";
import Todo from "./todo.svg";
import Remove from "./remove.png";
import Edit from "./edit.png";
import { message, DatePicker } from "antd";
import ParticlesComponent from "./Components/particlesConfig"; 
import Animation from "./Components/Animation.json";
import Lottie from "lottie-react";
import dayjs from "dayjs";

function App() {
  const [items, setItems] = useState([]);
  const [text, setText] = useState("");
  const [update, setUpdate] = useState({ succ: false, itemid: null });
  const [date, setDate] = useState(null);
  const [updateText, setUpdateText] = useState("");
  const [updateDate, setUpdateDate] = useState(null);

  useEffect(() => {
    const storedItems = JSON.parse(localStorage.getItem("items"));
    if (storedItems) {
      setItems(storedItems);
    } else {
      localStorage.setItem("items", JSON.stringify([]));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("items", JSON.stringify(items));
  }, [items]);

  const addItem = () => {
    if (text.trim() !== "" && date) {
      const newItem = {
        id: Date.now(),
        text,
        date: date.format("YYYY-MM-DD"),
        priority: date.valueOf(),
      };
      setItems([...items, newItem]);
      setText("");
      setDate(null); // Clear the date input after adding the item
      message.success("Saved");
    } else {
      message.error("Please enter text and date");
    }
  };

  const deleteItem = (id) => {
    setItems(items.filter((item) => item.id !== id));
    message.success("Deleted");
  };

  const updateItem = (id) => {
    setItems(
      items.map((item) =>
        item.id === id
          ? {
              ...item,
              text: updateText,
              date: updateDate.format("YYYY-MM-DD"),
              priority: updateDate.valueOf(),
            }
          : item
      )
    );
    setUpdate({ succ: false, itemid: null });
    message.success("Updated");
  };

  const handleEditClick = (item) => {
    setUpdate({ succ: true, itemid: item.id });
    setUpdateText(item.text); // Set the current text for updating
    setUpdateDate(dayjs(item.date)); // Set the current date for updating
  };

  const getTaskDates = () => {
    return items.map((item) => item.date);
  };

  const dateCellRender = (currentDate) => {
    const taskDates = getTaskDates();
    const isTaskDate = taskDates.includes(currentDate.format("YYYY-MM-DD"));
    return (
      <div className={isTaskDate ? "highlight-date" : ""}>
        {currentDate.date()}
      </div>
    );
  };

  const sortItemsByPriority = () => {
    return items.sort((a, b) => a.priority - b.priority);
  };

  return (
    <>
      <ParticlesComponent id="particles" />
      <div className="w-screen bg-[#1E1E1E] h-screen flex flex-row-reverse items-center overflow-x-hidden">
        <div className="w-3/4 h-full lg:inline hidden">
          <Lottie className="h-full w-full" animationData={Animation} />
        </div>
        <div className="ml-10 h-full">
          <div className="w-full h-1/6 flex flex-col">
            <div className="flex justify-center items-center p-5 rounded-b-md">
              <h1 className="text-white text-3xl italic flex items-center gap-x-2">
                <div className="w-32 h-[1px] bg-white"></div>TO-DO-NOW
              </h1>
              <div className="w-32 h-[1px] bg-white ml-2"></div>
            </div>
            <div className="flex items-center gap-x-5 justify-center">
              <div className="w-40 h-[1px] bg-white"></div>
              <img className="w-4 h-4" src={Note} alt="" />
              <div className="w-40 h-[1px] bg-white"></div>
            </div>
          </div>
          <div className="h-5/6">
            <div className="flex p-5 justify-center">
              <input
                type="text"
                className="border border-black w-96 px-2 rounded-full"
                value={text}
                onChange={(e) => setText(e.target.value)}
              />
              <button
                className="p-2 bg-[#4F4F4F] italic font-serif rounded-full text-white w-32 relative right-9"
                onClick={addItem}
              >
                Add task
              </button>
              <DatePicker
                className="border border-black rounded-full px-6"
                value={date}
                onChange={(date) => setDate(date)}
                format="YYYY-MM-DD"
                dateRender={dateCellRender}
              />
            </div>
            <ul className="h-3/4 overflow-auto">
              {sortItemsByPriority().map((item) => (
                <li
                  key={item.id}
                  className="bg-gray-400 p-2 rounded-full flex my-4 justify-start items-center shadow-gray-700 shadow-lg"
                >
                  {update.itemid === item.id && update.succ ? (
                    <>
                      <input
                        type="text"
                        className="border w-3/4 rounded-full p-1 px-2"
                        value={updateText}
                        onChange={(e) => setUpdateText(e.target.value)}
                      />
                      <DatePicker
                        className="border p-1 rounded-full px-2 ml-2"
                        value={updateDate}
                        onChange={(date) => setUpdateDate(date)}
                        format="YYYY-MM-DD"
                        dateRender={dateCellRender}
                      />
                      <button
                        className="p-2 w-28 bg-[#4F4F4F] italic font-serif rounded-full text-white ml-2"
                        onClick={() => updateItem(item.id)}
                      >
                        Update
                      </button>``
                    </>
                  ) : (
                    <>
                      <div className="flex min-w-80 justify-between max-w-max ms-2">
                        <h1 className="text-black font-serif italic text-lg">
                          {item.text}
                        </h1>
                        <p className="text-gray-800 pl-4 text-lg">
                          {item.date}
                        </p>
                      </div>
                      <div className="min-w-64 flex justify-end items-center">
                        <img
                          className="h-10 hover:cursor-pointer"
                          src={Edit}
                          onClick={() => handleEditClick(item)}
                          alt=""
                        />
                        <img
                          className="h-12 hover:cursor-pointer"
                          onClick={() => deleteItem(item.id)}
                          src={Remove}
                          alt=""
                        />
                      </div>
                    </>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
