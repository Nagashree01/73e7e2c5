import React from "react";
import "../css/home.css";
import { useCalls } from "../contexts/CallContext";
import CallCard from "../components/callcard/CallCard";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const { callsData, groupCallsByDate, archiveAllCalls } = useCalls();

  const callsByDate = groupCallsByDate(callsData);
  const navigate = useNavigate();

  return (
    <main className="page-layout">
      <div className="archive-btn-section">
        <button
          className="btn"
          onClick={() => {
            archiveAllCalls(callsData);
            navigate("/archived");
          }}
        >
          Archive All Calls
        </button>
      </div>
      <div className="all-calls-section">
        {callsByDate.map((callByDate) => (
          <CallCard key={callByDate.date} callInfo={callByDate} />
        ))}
      </div>
    </main>
  );
};

export default Home;
