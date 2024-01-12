import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useCalls } from "../contexts/CallContext";
import { getDate, getDurationOfCall, getTime } from "../utils/helper";
import "../css/calldetails.css";
import { MdOutlineCallMade, MdOutlineCallReceived } from "react-icons/md";

const CallDetails = () => {
  const { callId } = useParams();
  const {
    getCallDetailsById,
    callDetails,
    archiveCallById,
    unarchiveCallById,
  } = useCalls();
  useEffect(() => {
    getCallDetailsById(callId);
  }, [callId, getCallDetailsById]);

  return (
    <div className="call-details-layout">
      <h1>Call Details</h1>
      {callDetails && (
        <div className="call-details">
          <p>
            <span> From:</span>
            {callDetails.from}
          </p>
          <p>
            <span> To:</span>
            {callDetails.to}
          </p>
          <p>
            <span> Via:</span>
            {callDetails.via}
          </p>
          <p>
            <span>Type:</span>
            {callDetails.call_type} Call
          </p>
          <p>
            <span> Direction:</span>
            {callDetails.direction === "inbound" ? (
              <MdOutlineCallReceived className="inbound-call-icon" />
            ) : (
              <MdOutlineCallMade className="outbound-call-icon" />
            )}
            {callDetails.direction === "inbound" ? `Incoming` : `Outgoing`}
          </p>
          <p>
            <span> Date:</span>
            {getDate(callDetails.created_at)}
          </p>
          <p>
            <span> Time:</span>
            {getTime(callDetails.created_at)}
          </p>
          <p>
            <span> Duration:</span>
            {getDurationOfCall(callDetails.duration)}
          </p>

          <div>
            {callDetails.is_archived ? (
              <button
                className="btn"
                onClick={() => {
                  unarchiveCallById(callId);
                }}
              >
                Unarchive
              </button>
            ) : (
              <button
                className="btn"
                onClick={() => {
                  archiveCallById(callId);
                }}
              >
                Archive Call
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default CallDetails;
