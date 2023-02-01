import React, { useEffect, useState } from "react";
import "../App.css";
import { years } from "../assets";
import Select from "react-select";
import axios from "axios";
import {
  AiOutlineUser,
  AiOutlineMessage,
  AiOutlineHome,
  AiOutlineCloseCircle,
} from "react-icons/ai";
import { FiSettings, FiLogOut } from "react-icons/fi";
import { IoMdNotificationsOutline } from "react-icons/io";
import { HiViewList } from "react-icons/hi";
import Createcompany from "./Createcompany";
import Message from "./Message";
import Notification from "./Notification";
import Setting from "./Setting";

const Users = () => {
  const [amount, setAmount] = useState();
  const [year, setYear] = useState(null);
  const [details, setDetails] = useState([]);
  const [user, setUser] = useState(true);
  const [msg, setMsg] = useState(false);
  const [create, setCreate] = useState(false);
  const [setting, setSetting] = useState(false);
  const [notification, setNotification] = useState(false);
  const [toggle, setToggle] = useState(false);
  const [id, setId] = useState();
  const [edtid, setEdtid] = useState();
  const [edit, setEdit] = useState();

  // const [icon, setIcon] = useState(true);

  // function IconToggle() {
  //   setIcon(false);
  // }

  function UserPage() {
    setUser(true);
    setCreate(false);
    setMsg(false);
    setSetting(false);
    setNotification(false);
  }
  function CreatePage() {
    setUser(false);
    setCreate(true);
    setMsg(false);
    setSetting(false);
    setNotification(false);
  }
  function MessagePage() {
    setUser(false);
    setCreate(false);
    setMsg(true);
    setSetting(false);
    setNotification(false);
  }
  function SettingPage() {
    setUser(false);
    setCreate(false);
    setMsg(false);
    setSetting(true);
    setNotification(false);
  }

  function NotiPage() {
    setUser(false);
    setCreate(false);
    setMsg(false);
    setSetting(false);
    setNotification(true);
  }

  /////////Create Data///////
  function Send() {
    const Objects = {
      Year: year.value,
      Expense: amount,
    };
    axios
      .post("http://localhost:4000/create", Objects)
      .then((res) => {
        console.log(res.data);
        setTimeout(() => {
          Read();
        }, 500);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  //////////Read Data//////////
  function Read() {
    axios
      .post("http://localhost:4000/readdata")
      .then((res) => {
        console.log(res.data);
        setDetails(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }
  //////////////Update ////////////////

  function Update() {
    const edtobj = {
      id: edtid,
      Expense: edit,
    };
    axios
      .post("http://localhost:4000/update", edtobj)
      .then((res) => {
        console.log(res.data);
        setTimeout(() => {
          Read();
          setToggle(false);
        }, 500);
      })
      .catch((err) => {
        console.log(err);
      });
  }
  //////////Delete Data//////////
  function Delete(id) {
    const del = {
      _id: id,
    };
    axios
      .post("http://localhost:4000/delete", del)
      .then((res) => {
        console.log(res.data);

        setTimeout(() => {
          Read();
        }, 500);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  ////////Edit function////

  function Edit(item) {
    setId(
      [details.find((e) => e._id === item)].map((val) => {
        setEdtid(val._id);
        setEdit(val.Expense);
      })
    );
    setToggle(true);
  }

  useEffect(() => {
    Read();
  }, []);

  return (
    <div>
      <div style={{ display: "flex", flexDirection: "row" }}>
        <div style={{ flex: 0.3 }}>
          {/* {icon === false && <HiViewList onClick={() => setIcon(true)} />} */}
          {/* {icon === true && ( */}
          <div
            style={{
              width: 250,
              height: 730,
              backgroundColor: "#00b899",
              borderRadius: 30,
              position: "relative",
              left: "10%",
              top: "2%",
              display: "flex",
              //alignItems: "center",
              justifyContent: "center",
            }}
          >
            {/* <AiOutlineCloseCircle 
            size={25}
            onClick={() => setIcon(false)}
            style={{ position: "relative", left: "80%", bottom: "1.6%" }}
            /> */}
            <div style={{ display: "flex", flexDirection: "column" }}>
              <img
                src={require("../assets/codemark.png")}
                style={{ height: 100, width: 100, marginLeft: 20 }}
              />
              <nav>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    flexDirection: "row",
                    marginBottom: 20,
                    marginTop: 10,
                    border: create === true ? "groove" : "",
                    borderWidth: create === true ? 2 : "",
                    borderColor: create === true ? "#fff" : "",
                    borderRadius: create === true ? 20 : "",
                    padding: 5,
                  }}
                  onClick={() => CreatePage()}
                >
                  <div
                    style={{
                      flex: 0.2,
                      marginRight: 5,
                    }}
                  >
                    <AiOutlineHome color={"white"} size={20} />
                  </div>
                  <div style={{ flex: 2 }}>
                    <p style={{ color: "#fff" }}>Create Company</p>
                  </div>
                </div>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    flexDirection: "row",
                    marginBottom: 20,
                    border: user === true ? "groove" : "",
                    borderWidth: user === true ? 2 : "",
                    borderColor: user === true ? "#fff" : "",
                    borderRadius: user === true ? 20 : "",
                  }}
                  onClick={() => UserPage()}
                >
                  <div style={{ flex: 0.2, marginRight: 5 }}>
                    <AiOutlineUser color={"white"} size={18} />
                  </div>
                  <div style={{ flex: 2 }}>
                    <p style={{ color: "#fff" }}>Users</p>
                  </div>
                </div>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    flexDirection: "row",
                    marginBottom: 20,
                    border: setting === true ? "groove" : "",
                    borderWidth: setting === true ? 2 : "",
                    borderColor: setting === true ? "#fff" : "",
                    borderRadius: setting === true ? 20 : "",
                  }}
                  onClick={() => SettingPage()}
                >
                  <div style={{ flex: 0.2, marginRight: 5 }}>
                    <FiSettings color={"white"} />
                  </div>
                  <div style={{ flex: 2 }}>
                    <p style={{ color: "#fff" }}>Settings</p>
                  </div>
                </div>

                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    flexDirection: "row",
                    marginBottom: 20,
                    border: msg === true ? "groove" : "",
                    borderWidth: msg === true ? 2 : "",
                    borderColor: msg === true ? "#fff" : "",
                    borderRadius: msg === true ? 20 : "",
                  }}
                  onClick={() => MessagePage()}
                >
                  <div style={{ flex: 0.2, marginRight: 5 }}>
                    <AiOutlineMessage color={"white"} />
                  </div>
                  <div style={{ flex: 2 }}>
                    <p style={{ color: "#fff" }}>Message</p>
                  </div>
                </div>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    flexDirection: "row",
                    marginBottom: 20,
                    border: notification === true ? "groove" : "",
                    borderWidth: notification === true ? 2 : "",
                    borderColor: notification === true ? "#fff" : "",
                    borderRadius: notification === true ? 20 : "",
                  }}
                  onClick={() => NotiPage()}
                >
                  <div style={{ flex: 0.2, marginRight: 5 }}>
                    <IoMdNotificationsOutline color={"white"} size={20} />
                  </div>
                  <div style={{ flex: 2 }}>
                    <p style={{ color: "#fff" }}>Notification</p>
                  </div>
                </div>

                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexDirection: "row",
                    marginBottom: 20,
                    position: "relative",
                    top: "30%",
                    left: "15%",
                  }}
                >
                  <div style={{ flex: 1 }}>
                    <p style={{ color: "#fff" }}>Log out</p>
                  </div>
                  <div
                    style={{
                      flex: 1.3,
                      marginRight: 5,
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <FiLogOut color={"white"} size={18} />
                  </div>
                </div>
              </nav>
            </div>
          </div>
          {/* )} */}
        </div>
        {user === true && (
          <div style={{ flex: 1 }}>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <div style={{ flex: 12 }}>
                <h1>Hi 👋 Micin</h1>
              </div>
              <div style={{ flex: 1 }}>
                <IoMdNotificationsOutline color="#00b899" size={28} />
                <span
                  style={{
                    backgroundColor: "#00b899",
                    padding: 4,
                    borderRadius: 15,
                    position: "absolute",
                    top: "2%",
                    fontSize: 12,
                  }}
                >
                  4
                </span>
              </div>
            </div>

            <div style={{ position: "relative", top: "15%" }}>
              <div
                style={{
                  height: 8,
                  backgroundColor: "#00b899",
                  width: "40%",
                  borderRadius: 10,
                  position: "relative",
                  // top: "40%",
                  left: "10%",
                }}
              ></div>
              <div
                style={{
                  position: "relative",

                  left: "10%",
                }}
              >
                <h2>Revenue Forecasts</h2>
                {details.map((item, index) => {
                  return (
                    <div key={item._id}>
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "row",
                          backgroundColor: "#e9ecef",
                          marginBottom: 10,
                          width: "30%",
                          padding: 4,
                          borderRadius: 10,
                        }}
                      >
                        <div
                          style={{
                            flex: 0.8,
                            display: "flex",
                            flexDirection: "row",
                            alignItems: "center",
                            borderRight: "groove",
                            borderRightWidth: 0.4,
                          }}
                        >
                          <p style={{ marginBottom: 0, marginTop: 0 }}>
                            {index + 1}
                            <span>{`${")"}`}</span>
                          </p>
                          <p
                            style={{
                              marginBottom: 0,
                              marginTop: 0,
                              color: "#00b899",
                            }}
                          >
                            Year:
                          </p>
                          <p style={{ marginBottom: 0, marginTop: 0 }}>
                            {item.Year}
                          </p>
                        </div>

                        <div
                          style={{
                            flex: 1,
                            display: "flex",
                            flexDirection: "row",
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                          onClick={() => Edit(item._id)}
                        >
                          <p
                            style={{
                              marginBottom: 0,
                              marginTop: 0,
                              color: "#00b899",
                            }}
                          >
                            Expense:
                          </p>
                          <p style={{ marginBottom: 0, marginTop: 0 }}>
                            {item.Expense}
                          </p>
                        </div>

                        <div
                          style={{
                            flex: 1,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                        >
                          <p
                            style={{
                              marginBottom: 0,
                              marginTop: 0,
                              cursor: "pointer",
                              color: "red",
                            }}
                            onClick={() => Delete(item._id)}
                          >
                            Remove
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  width: "45%",
                  height: 100,
                  backgroundColor: "#e9ecef",
                  position: "relative",
                  left: "10%",
                  borderRadius: 10,
                }}
              >
                <div
                  style={{
                    flex: 0.4,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                >
                  <p
                    style={{
                      marginBottom: 8,
                      textAlign: "center",
                      color: "#00b899",
                      textDecoration: "underline",
                    }}
                  >
                    Choose Year
                  </p>
                  <p style={{ width: "65%", marginBottom: 0, marginTop: 0 }}>
                    <Select value={year} onChange={setYear} options={years} />
                  </p>
                </div>
                <div
                  style={{
                    flex: 0.8,
                    display: "flex",
                    flexDirection: "column",
                    // alignItems: "center",
                  }}
                >
                  <p
                    style={{
                      marginBottom: 8,
                      marginLeft: 6,

                      color: "#00b899",
                      textDecoration: "underline",
                    }}
                  >
                    Revenue
                  </p>
                  <div style={{ display: "flex" }}>
                    <input
                      type="text"
                      placeholder="Enter Amount"
                      onChange={(e) => setAmount(e.target.value)}
                      style={{
                        backgroundColor: "#fff",
                        color: "black",
                        outline: "none",
                        border: "none",
                        borderRadius: 10,
                        padding: 6,
                        fontSize: 15,
                      }}
                    />
                    <button
                      onClick={() => Send()}
                      style={{
                        backgroundColor: "#00b899",
                        color: "white",
                        outline: "none",
                        border: "none",
                        marginLeft: 10,
                        width: "50%",
                        marginRight: 10,
                        padding: 8,
                        borderRadius: 10,
                      }}
                    >
                      ADD
                    </button>
                  </div>
                </div>
              </div>

              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  position: "relative",
                  left: "10%",
                  width: "45%",
                }}
              >
                <div
                  style={{
                    flex: 1,
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    marginTop: 20,
                  }}
                >
                  <p
                    style={{
                      backgroundColor: "#e9ecef",
                      color: "#00b899",
                      padding: 6,
                      width: "50%",
                      textAlign: "center",
                      borderRadius: 10,
                      fontWeight: 500,
                    }}
                    onClick={() => setToggle(false)}
                  >
                    Cancel
                  </p>
                </div>

                <div
                  style={{
                    flex: 1,
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    marginTop: 20,
                  }}
                >
                  <p
                    style={{
                      backgroundColor: "#00b899",
                      color: "#e9ecef",
                      padding: 6,
                      width: "50%",
                      textAlign: "center",
                      borderRadius: 10,
                      fontWeight: 500,
                    }}
                    onClick={() => Update()}
                  >
                    Save
                  </p>
                </div>
              </div>
            </div>
            {toggle === true && (
              <div
                style={{
                  height: 100,
                  width: 300,
                  backgroundColor: "#e9ecef",
                  position: "absolute",
                  left: "70%",
                  bottom: "50%",
                  borderRadius: 20,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <p style={{ color: "#00b899" }}>Edit Expense</p>
                <div style={{ width: "70%" }}>
                  <input
                    value={edit}
                    type="text"
                    placeholder="Enter Amount"
                    onChange={(e) => setEdit(e.target.value)}
                    style={{
                      backgroundColor: "#fff",
                      color: "black",
                      outline: "none",
                      border: "none",
                      borderRadius: 10,
                      padding: 6,
                      fontSize: 15,
                    }}
                  />
                </div>
              </div>
            )}
          </div>
        )}
        {create === true && (
          <div style={{ flex: 1 }}>
            <Createcompany />
          </div>
        )}
        {setting === true && (
          <div style={{ flex: 1 }}>
            <Setting />
          </div>
        )}
        {msg === true && (
          <div style={{ flex: 1 }}>
            <Message />
          </div>
        )}
        {notification === true && (
          <div style={{ flex: 1 }}>
            <Notification />
          </div>
        )}
      </div>
    </div>
  );
};

export default Users;
