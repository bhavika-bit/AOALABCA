function startMergeSort() {
    const input = document.getElementById('arrayInput').value;
    const array = input.split(',').map(Number);
    if (array.some(isNaN)) {
      alert('Please enter valid numbers separated by commas.');
      return;
    }
    const outputDiv = document.getElementById('output');
    outputDiv.innerHTML = '<h3>Sorting Steps:</h3>';
    mergeSort(array, outputDiv);
  }
  
  function mergeSort(array, outputDiv) {
    if (array.length < 2) return array;
  
    const mid = Math.floor(array.length / 2);
    const left = mergeSort(array.slice(0, mid), outputDiv);
    const right = mergeSort(array.slice(mid), outputDiv);
    const sortedArray = merge(left, right);
  
    const div = document.createElement('div');
    div.classList.add('step');
    div.innerHTML = `<strong>Merging:</strong> [${left}] & [${right}] → <span class='result'>[${sortedArray}]</span>`;
    outputDiv.appendChild(div);
  
    return sortedArray;
  }
  
  function merge(left, right) {
    let result = [];
    let i = 0, j = 0;
  
    while (i < left.length && j < right.length) {
      if (left[i] < right[j]) {
        result.push(left[i++]);
      } else {
        result.push(right[j++]);
      }
    }
  
    return result.concat(left.slice(i)).concat(right.slice(j));
  }