import React from "react";
import { BiBody } from "react-icons/bi";
import {
  BsFillJournalBookmarkFill,
  BsSoundwave,
  BsTable,
} from "react-icons/bs";
import styles from "./../../assets/styles/timeline.module.scss";

const Timeline = ({ status }) => {
  return (
    <div className={styles.tracking__timeline_section}>
      <div className={styles.tracking__timeline_barSection}>
        <div className={styles.tracking__timeline_bar}>
          <div
            className={styles.tracking__timeline_activeBar}
            style={{
              width:
                status === 4
                  ? "100%"
                  : status === 3
                  ? "83.31%"
                  : status === 2
                  ? "49.98%"
                  : "16.65%",
            }}
          ></div>
          <div
            className={styles.tracking__timeline_inActiveBar}
            style={{
              width:
                status === 4
                  ? "0%"
                  : status === 3
                  ? "16.69%"
                  : status === 2
                  ? "50.02%"
                  : "83.35%",
            }}
          ></div>
        </div>
      </div>
      <ul className={styles.tracking__timeline_iconSection}>
        <li style={{ width: "110px" }}>
          <div
            className={styles.tracking__timeline_icons}
            style={
              status >= 1
                ? {
                    border: "3px solid rgb(76, 175, 80)",
                    color: "rgb(76, 175, 80)",
                  }
                : { border: "3px solid #808080", color: "#808080" }
            }
          >
            <BsSoundwave />
          </div>
          <p
            style={{
              color: status >= 1 ? "#4caf50" : "#808080",
              fontSize: "14px",
            }}
          >
            Size Guide
          </p>
        </li>

        <li style={{ width: "110px" }}>
          <div
            className={styles.tracking__timeline_icons}
            style={
              status >= 2
                ? {
                    border: "3px solid rgb(76, 175, 80)",
                    color: "rgb(76, 175, 80)",
                  }
                : { border: "3px solid #808080", color: "#808080" }
            }
          >
            <BiBody />
          </div>
          <p
            style={{
              color: status >= 2 ? "#4caf50" : "#808080",
              fontSize: "14px",
            }}
          >
            Model Measurement
          </p>
        </li>

        <li style={{ width: "110px" }}>
          <div
            className={styles.tracking__timeline_icons}
            style={
              status >= 3
                ? {
                    border: "3px solid rgb(76, 175, 80)",
                    color: "rgb(76, 175, 80)",
                  }
                : { border: "3px solid #808080", color: "#808080" }
            }
          >
            <BsFillJournalBookmarkFill />
          </div>
          <p
            style={{
              color: status >= 3 ? "#4caf50" : "#808080",
              fontSize: "14px",
            }}
          >
            Measurement Guide
          </p>
        </li>

        <li style={{ width: "140px" }}>
          <div
            className={styles.tracking__timeline_icons}
            style={
              status >= 4
                ? {
                    border: "3px solid rgb(76, 175, 80)",
                    color: "rgb(76, 175, 80)",
                  }
                : { border: "3px solid #808080", color: "#808080" }
            }
          >
            <BsTable />
          </div>
          <p
            style={{
              color: status >= 4 ? "#4caf50" : "#808080",
              fontSize: "14px",
            }}
          >
            Size Chart
          </p>
        </li>
      </ul>
    </div>
  );
};

export default Timeline;
