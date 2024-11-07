// function modifyUpworkUI() {
//   function hideJobsWithNoSpending() {
//     const jobTiles = document.querySelectorAll(
//       'div[data-test="job-tile-list"] > section'
//     );
//     console.log(`Found ${jobTiles.length} job tiles`);
//     jobTiles.forEach((tile) => {
//       const spendingElement = tile.querySelector(
//         '[data-test="client-spendings"]'
//       );
//       if (spendingElement) {
//         const spendingText = spendingElement.textContent.trim();
//         const jobTitle =
//           tile.querySelector('h3.job-tile-title a')?.textContent.trim() ||
//           'Unknown Job Title';
//         console.log(`Job: "${jobTitle}" - Spending: "${spendingText}"`);
//         if (spendingText === '$0 spent') {
//           tile.style.display = 'none';
//           console.log(`Hiding job tile: "${jobTitle}" with $0 spent`);
//         }
//       } else {
//         console.log('No spending element found for this tile');
//       }
//     });
//   }

//   hideJobsWithNoSpending();

//   const jobListContainer = document.querySelector(
//     'div[data-test="job-tile-list"]'
//   );
//   if (jobListContainer) {
//     const observer = new MutationObserver((mutations) => {
//       console.log('Job list changed, re-running hideJobsWithNoSpending');
//       hideJobsWithNoSpending();
//     });
//     observer.observe(jobListContainer, { childList: true, subtree: true });
//   }

//   const jobList = document.querySelector('div[data-test="job-tile-list"]');
//   if (jobList) {
//     const customMessage = document.createElement('div');
//     customMessage.textContent =
//       'Jobs filtered by AI Helper - Hiding jobs with no client spending';
//     customMessage.style.padding = '10px';
//     customMessage.style.backgroundColor = '#e6ffe6';
//     customMessage.style.marginBottom = '10px';
//     jobList.insertBefore(customMessage, jobList.firstChild);
//   }
// }

function modifyXUI() {
  function removeTrending() {
    const interval = setInterval(() => {
      const trendingEl = document.querySelector('div[aria-label="Trending"]');
      if (trendingEl) {
        trendingEl.remove();
        clearInterval(interval);
      }
    }, 100);
  }

  removeTrending();

  function filterLeftSidebar() {
    const interval1 = setInterval(() => {
      const homeLink = document.querySelector(
        'nav a[data-testid="AppTabBar_Home_Link"]'
      );
      if (homeLink) {
        homeLink.remove();
        clearInterval(interval1);
      }
    }, 100);

    const interval2 = setInterval(() => {
      const navLinks = document.querySelectorAll('nav[aria-label="Primary"] *');

      if (navLinks.length === 0) return;

      clearInterval(interval2);
      navLinks.forEach((link) => {
        if (!['Premium', 'Profile'].includes(link.textContent)) {
          link.style.color = 'rgb(256, 256, 256, 0.1)';
        }
      });
    }, 100);
  }

  filterLeftSidebar();
}

function runScript() {
  const url = window.location.href;
  if (url.startsWith('https://www.upwork.com/nx/find-work/')) {
    // modifyUpworkUI();
  } else if (url.startsWith('https://x.com/')) {
    modifyXUI();
  }
}

window.addEventListener('load', runScript);

let lastUrl = location.href;
new MutationObserver(() => {
  const url = location.href;
  if (url !== lastUrl) {
    lastUrl = url;
    runScript();
  }
}).observe(document, { subtree: true, childList: true });
