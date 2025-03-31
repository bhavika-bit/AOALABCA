document.addEventListener("DOMContentLoaded", function() {
  // Start Game Button
  document.getElementById("startGame").addEventListener("click", function() {
      document.getElementById("gameArea").style.display = "block";
      this.style.display = "none";
      document.getElementById("sortingSteps").innerHTML = "<p>🧙‍♂ Hello coder! I am MergeBot, your sorting guide! Let's sort numbers with logic! ✨</p>";
  });

  // Sort Button
  document.getElementById("sortBtn").addEventListener("click", function() {
      let input = document.getElementById("numberInput").value;
      let numbers = input.split(",").map(num => parseInt(num.trim())).filter(num => !isNaN(num));
      
      if (numbers.length === 0) {
          alert("❌ Oops! Please enter numbers correctly (e.g., 4,7,1,3,9)");
          return;
      }
      
      const caseType = detectCase(numbers);
      const caseMessages = {
          best: "🌟 BEST CASE (already sorted - minimal comparisons needed)",
          average: "📊 AVERAGE CASE (typical random ordering)",
          worst: "🌀 WORST CASE (maximizes comparisons - alternating values)"
      };
      
      document.getElementById("sortingSteps").innerHTML = `
          <p>🔮 Starting the sorting... Let's split and merge! 🧙‍♂✨</p>
          <div class="complexity-info">
              <p>⏳ Time Complexity: O(n log n)</p>
              <p>📊 Space Complexity: O(n)</p>
              <p class="case-${caseType}">${caseMessages[caseType]}</p>
          </div>
      `;
      
      setTimeout(() => {
          let steps = [];
          let sorted = mergeSort(numbers, steps);
          animateSortingSteps(steps, sorted, caseMessages[caseType]);
      }, 1000);
  });

  // Merge Sort Algorithm
  function mergeSort(arr, steps) {
      if (arr.length < 2) return arr;
      let mid = Math.floor(arr.length / 2);
      let left = mergeSort(arr.slice(0, mid), steps);
      let right = mergeSort(arr.slice(mid), steps);
      let merged = merge(left, right, steps);
      steps.push({ action: "merge", result: [...merged] });
      return merged;
  }

  function merge(left, right, steps) {
      let result = [];
      while (left.length && right.length) {
          if (left[0] < right[0]) {
              result.push(left.shift());
          } else {
              result.push(right.shift());
          }
          steps.push({ 
              action: "compare", 
              left: [...left], 
              right: [...right], 
              result: [...result] 
          });
      }
      return [...result, ...left, ...right];
  }

  // Animate Sorting Steps
  function animateSortingSteps(steps, sorted, caseMessage) {
      let index = 0;
      function nextStep() {
          if (index < steps.length) {
              let step = steps[index];
              let wizardMessage = document.createElement("div");
              wizardMessage.className = "wizard-message";
              
              if (step.action === "compare") {
                  wizardMessage.innerHTML = `🧙‍♂ MergeBot: Comparing [${step.left}] and [${step.right}]... progress: [${step.result}] ✨`;
              } else if (step.action === "merge") {
                  wizardMessage.innerHTML = `✨ MergeBot: Merged into [${step.result}]! Spells are working! 🪄`;
              }
              
              document.getElementById("sortingSteps").appendChild(wizardMessage);
              index++;
              setTimeout(nextStep, 1000);
          } else {
              let finalMessage = document.createElement("div");
              finalMessage.className = "wizard-message-final";
              finalMessage.innerHTML = `
                  <p>🎉 MergeBot: Hooray! The sorted array is [${sorted}]!</p>
                  <p>🏆 You are now a sorting wizard! ✨</p>
                  <div class="complexity-final">
                      <p>⏳ Time Complexity: O(n log n)</p>
                      <p>📊 Space Complexity: O(n)</p>
                      <p>${caseMessage}</p>
                  </div>
              `;
              document.getElementById("sortingSteps").appendChild(finalMessage);
              document.getElementById("restartGame").style.display = "inline-block";
              document.getElementById("endGame").style.display = "inline-block";
          }
      }
      nextStep();
  }

  // Case Detection
  function detectCase(numbers) {
      if (isSorted(numbers)) return "best";
      if (isWorstCase(numbers)) return "worst";
      return "average";
  }

  function isSorted(arr) {
      for (let i = 1; i < arr.length; i++) {
          if (arr[i-1] > arr[i]) return false;
      }
      return true;
  }

  function isWorstCase(arr) {
      const sorted = [...arr].sort((a,b) => a-b);
      const worstPattern = [];
      let left = 0, right = sorted.length-1;
      while (left <= right) {
          worstPattern.push(sorted[left++]);
          if (left <= right) worstPattern.push(sorted[right--]);
      }
      return JSON.stringify(arr) === JSON.stringify(worstPattern);
  }

  // Restart and End Game Buttons
  document.getElementById("restartGame").addEventListener("click", function() {
      alert("🔄 MergeBot: Recasting the sorting spell... Prepare for another sorting journey! ✨");
      location.reload();
  });

  document.getElementById("endGame").addEventListener("click", function() {
      alert("🏁 MergeBot: The adventure ends here! Thanks for playing. Goodbye! ✨");
      document.body.innerHTML = `
          <div class="game-container">
              <h1 class="game-title">🧙‍♂ Merge Sort Adventure</h1>
              <p style="font-size: 1.5em; color: gold;">The game has ended. Refresh the page to play again!</p>
          </div>
      `;
  });
});