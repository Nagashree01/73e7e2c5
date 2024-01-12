import React from "react";
import "../../css/callcard.css";
import { getTime } from "../../utils/helper";
import { useNavigate } from "react-router-dom";
import { MdOutlineCallMade, MdOutlineCallReceived } from "react-icons/md";

const CallCard = ({ callInfo }) => {
  const { date, calls } = callInfo;
  const navigate = useNavigate();
  return (
    <div className="call-by-date-section">
      <div className="date">{date}</div>
      <div className="call-cards-section">
        {calls.map((call) => (
          <div
            key={call.id}
            className="call-card"
            onClick={() => navigate(`/call/${call.id}`)}
          >
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

export default CallCard;
