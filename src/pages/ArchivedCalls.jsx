import React from "react";
import { useCalls } from "../contexts/CallContext";
import { MdOutlineCallMade, MdOutlineCallReceived } from "react-icons/md";
import { getTime } from "../utils/helper";

import { useNavigate } from "react-router-dom";

const ArchivedCalls = () => {
  const { callsData, unArchiveAllCalls } = useCalls();
  const archivedCalls = callsData.filter((call) => call.is_archived === true);
  const navigate = useNavigate();
  return (
    <div className="page-layout">
      <h1>Archived Calls</h1>
      <div className="archive-btn-section">
        <button
          className="btn"
          onClick={() => {
            unArchiveAllCalls(callsData);
            navigate("/");
          }}
        >
          Reset Calls
        </button>
      </div>
      <div>Refresh Page to see the archived calls</div>
      <div className="call-cards-section">
        {archivedCalls.map((call) => (
          <div key={call.id} className="call-card">
            <div className="call-info">
              <div>
                {call.direction === "inbound" ? (
                  <MdOutlineCallReceived className="inbound-call-icon" />
                ) : (
                  <MdOutlineCallMade className="outbound-call-icon" />
                )}
              </div>
              <div>{call.to}</div>
            </div>
            <div>{getTime(call.created_at)}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ArchivedCalls;
