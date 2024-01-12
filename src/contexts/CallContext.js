import { createContext, useContext, useEffect, useState } from "react";
import { getDate } from "../utils/helper";
import axios from "axios";

export const CallContext = createContext();

export const CallContextProvider = ({ children }) => {
  const [callsData, setCallsData] = useState([]);

  const [callDetails, setCallDetails] = useState([]);

  const getCallsData = async () => {
    try {
      const response = await axios.get(
        "https://cerulean-marlin-wig.cyclic.app/activities"
      );
      const data = response.data;
      const validData = data.filter((call) => call.to && call.from);
      setCallsData(validData);
    } catch (error) {
      console.error(error);
    }
  };

  const groupCallsByDate = (callsData) => {
    const dates = callsData.reduce((acc, cur) => {
      const date = getDate(cur.created_at);
      if (acc.includes(date)) {
        return acc;
      } else {
        return [...acc, date];
      }
    }, []);

    const groupedCalls = [];

    for (let i = 0; i < dates.length; i++) {
      const callsOfDate = callsData.filter(
        (call) => getDate(call.created_at) === dates[i]
      );
      groupedCalls.push({ date: dates[i], calls: callsOfDate });
    }

    return groupedCalls;
  };

  useEffect(() => {
    getCallsData();
  }, []);

  const getCallDetailsById = async (callId) => {
    try {
      const response = await axios.get(
        `https://cerulean-marlin-wig.cyclic.app/activities/${callId}`
      );

      setCallDetails(response.data);
    } catch (error) {
      console.error(error.message);
    }
  };
  const archiveCallById = async (callId) => {
    try {
      await axios.patch(
        `https://cerulean-marlin-wig.cyclic.app//activities/${callId}`,
        { is_archived: true }
      );
    } catch (error) {
      console.error(error.message);
    }
  };

  const unarchiveCallById = async (callId) => {
    try {
      await axios.patch(
        `https://cerulean-marlin-wig.cyclic.app//activities/${callId}`,
        { is_archived: false }
      );
    } catch (error) {
      console.error(error.message);
    }
  };
  const archiveAllCalls = async (calls) => {
    try {
      const archivePromises = calls.map((call) => {
        return axios.patch(
          `https://cerulean-marlin-wig.cyclic.app//activities/${call.id}`,
          { is_archived: true }
        );
      });
      setCallsData((prev) => prev);
      await Promise.all(archivePromises);
    } catch (error) {
      console.log(error);
    }
  };

  const unArchiveAllCalls = async (calls) => {
    try {
      const unarchivePromises = calls.map((call) => {
        return axios.patch(
          `https://cerulean-marlin-wig.cyclic.app//activities/${call.id}`,
          { is_archived: false }
        );
      });
      setCallsData((prev) => prev);
      await Promise.all(unarchivePromises);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <CallContext.Provider
      value={{
        callsData,
        groupCallsByDate,
        getCallDetailsById,
        callDetails,
        archiveAllCalls,
        unArchiveAllCalls,
        archiveCallById,
        unarchiveCallById,
      }}
    >
      {children}
    </CallContext.Provider>
  );
};

export const useCalls = () => useContext(CallContext);
