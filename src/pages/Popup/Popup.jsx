import React, { useEffect, useState } from 'react';
import './Popup.css';
import axios from 'axios';

const Popup = () => {
  const [proposal, setProposal] = useState(null);
  const [loading, setLoading] = useState(false);

  const expandDescription = () => {
    const btn = document.querySelector(
      `div.description button.air3-truncation-btn`
    );
    if (btn.innerHTML.includes('more')) {
      btn.click();
    }
  };

  const getJobDescription = () => {
    return document.querySelector(`div.description > span > span > span`)
      .innerHTML;
  };

  async function generateProposal(job) {
    const { data } = await axios.post(`http://localhost:3000/api/ai`, {
      query: `I want to apply for this job. Generate a short proposal. ${job}`,
    });

    return data;
  }

  const generate = () => {
    setLoading(true);

    chrome.tabs.query(
      { currentWindow: true, active: true },
      async function (tabs) {
        const tab = tabs[0];
        console.log(tab.url);
        if (!tab.url.startsWith('https://www.upwork.com/nx/proposals/job/'))
          return;

        await chrome.scripting.executeScript({
          target: { tabId: tab.id },
          func: expandDescription,
        });

        const injectionResults = await chrome.scripting.executeScript({
          target: { tabId: tab.id },
          func: getJobDescription,
        });

        // right now it'll only run once
        for (const { frameId, result } of injectionResults) {
          console.log(`Frame ${frameId} result:`, result);

          const res = await generateProposal(result);
          setProposal(res);
          setLoading(false);
        }
      }
    );
  };

  return (
    <div>
      <div className="p-2">
        <button onClick={generate}>Generate Proposal</button>

        {loading && <p>Loading...</p>}

        {!loading && proposal && <p>{proposal}</p>}
      </div>
    </div>
  );
};

export default Popup;
