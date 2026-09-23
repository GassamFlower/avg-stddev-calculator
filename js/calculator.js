document.addEventListener('DOMContentLoaded', function() {
    const dataInput = document.getElementById('dataInput');
    const calculateBtn = document.getElementById('calculateBtn');
    const clearBtn = document.getElementById('clearBtn');
    const exampleBtn = document.getElementById('exampleBtn');
    const copyBtn = document.getElementById('copyBtn');
    const resultsDiv = document.getElementById('results');
    const errorDiv = document.getElementById('error');
    const stepsDiv = document.getElementById('steps');
    const histogramCanvas = document.getElementById('histogram');
    const sortedDataDiv = document.getElementById('sortedData');

    let debounceTimer = null;
    let lastResults = null;

    calculateBtn.addEventListener('click', calculate);
    clearBtn.addEventListener('click', clearAll);
    exampleBtn.addEventListener('click', loadExample);
    copyBtn.addEventListener('click', copyResults);

    dataInput.addEventListener('keydown', function(e) {
        if (e.key === 'Enter' && e.ctrlKey) {
            e.preventDefault();
            calculate();
        }
    });

    dataInput.addEventListener('input', function() {
        clearTimeout(debounceTimer);
        debounceTimer = setTimeout(calculate, 400);
    });

    function calculate() {
        errorDiv.style.display = 'none';
        resultsDiv.style.display = 'none';
        copyBtn.style.display = 'none';

        const input = dataInput.value.trim();
        if (!input) {
            if (input === '') {
                return;
            }
            showError('Please enter some numbers to calculate.');
            return;
        }

        const numbers = parseNumbers(input);
        if (numbers.length === 0) {
            showError('No valid numbers found. Enter numbers separated by commas, spaces, or line breaks.');
            return;
        }

        if (numbers.length < 2) {
            showError('Please enter at least 2 numbers to calculate standard deviation.');
            return;
        }

        const results = computeStats(numbers);
        lastResults = results;
        displayResults(results);
        displaySteps(numbers, results);
        drawHistogram(numbers, results);
        displaySortedData(numbers, results);
        resultsDiv.style.display = 'block';
        copyBtn.style.display = 'inline-block';
    }

    function parseNumbers(input) {
        const tokens = input.split(/[,\s\n\r\t]+/).filter(t => t.length > 0);
        const numbers = [];
        for (const token of tokens) {
            const num = parseFloat(token);
            if (isNaN(num)) continue;
            numbers.push(num);
        }
        return numbers;
    }

    function computeStats(data) {
        const n = data.length;
        const sorted = [...data].sort((a, b) => a - b);
        const sum = data.reduce((a, b) => a + b, 0);
        const mean = sum / n;
        const min = sorted[0];
        const max = sorted[n - 1];
        const range = max - min;
        const median = calcMedian(sorted);
        const mode = calcMode(data);

        const squaredDiffs = data.map(x => Math.pow(x - mean, 2));
        const sumSquaredDiffs = squaredDiffs.reduce((a, b) => a + b, 0);

        const sampleVariance = n > 1 ? sumSquaredDiffs / (n - 1) : 0;
        const popVariance = sumSquaredDiffs / n;
        const sampleStdDev = Math.sqrt(sampleVariance);
        const popStdDev = Math.sqrt(popVariance);

        const q1 = calcPercentile(sorted, 25);
        const q3 = calcPercentile(sorted, 75);

        return {
            n, sum, mean, min, max, range, median, mode,
            sampleVariance, popVariance, sampleStdDev, popStdDev,
            squaredDiffs, sumSquaredDiffs, sorted, q1, q3
        };
    }

    function calcMedian(sorted) {
        const n = sorted.length;
        const mid = Math.floor(n / 2);
        return n % 2 !== 0 ? sorted[mid] : (sorted[mid - 1] + sorted[mid]) / 2;
    }

    function calcMode(data) {
        const freq = {};
        let maxFreq = 0;
        for (const val of data) {
            freq[val] = (freq[val] || 0) + 1;
            if (freq[val] > maxFreq) maxFreq = freq[val];
        }
        if (maxFreq === 1) return null;
        const modes = Object.keys(freq).filter(k => freq[k] === maxFreq).map(Number);
        return modes.length === data.length ? null : modes;
    }

    function calcPercentile(sorted, p) {
        const idx = (p / 100) * (sorted.length - 1);
        const lower = Math.floor(idx);
        const upper = Math.ceil(idx);
        if (lower === upper) return sorted[lower];
        return sorted[lower] + (idx - lower) * (sorted[upper] - sorted[lower]);
    }

    function displayResults(r) {
        document.getElementById('count').textContent = r.n;
        document.getElementById('sum').textContent = formatNumber(r.sum);
        document.getElementById('mean').textContent = formatNumber(r.mean);
        document.getElementById('sampleStdDev').textContent = formatNumber(r.sampleStdDev);
        document.getElementById('popStdDev').textContent = formatNumber(r.popStdDev);
        document.getElementById('sampleVariance').textContent = formatNumber(r.sampleVariance);
        document.getElementById('popVariance').textContent = formatNumber(r.popVariance);
        document.getElementById('median').textContent = formatNumber(r.median);
        document.getElementById('mode').textContent = r.mode ? r.mode.map(formatNumber).join(', ') : 'No mode';
        document.getElementById('range').textContent = formatNumber(r.range);
        document.getElementById('min').textContent = formatNumber(r.min);
        document.getElementById('max').textContent = formatNumber(r.max);
    }

    function displaySteps(data, r) {
        let html = '';

        html += '<h4>Step 1: Find the Mean (Average)</h4>';
        html += `<div class="step">Sum = ${data.map(n => formatNumber(n)).join(' + ')} = ${formatNumber(r.sum)}</div>`;
        html += `<div class="step">Mean = ${formatNumber(r.sum)} / ${r.n} = <span class="formula-inline">${formatNumber(r.mean)}</span></div>`;

        html += '<h4>Step 2: Squared Differences from the Mean</h4>';
        data.forEach((x, i) => {
            const diff = x - r.mean;
            html += `<div class="step">(${formatNumber(x)} - ${formatNumber(r.mean)})² = ${formatNumber(r.squaredDiffs[i])}</div>`;
        });

        html += '<h4>Step 3: Sum of Squared Differences</h4>';
        html += `<div class="step">Σ(xᵢ - x̄)² = ${formatNumber(r.sumSquaredDiffs)}</div>`;

        html += '<h4>Step 4: Variances</h4>';
        html += `<div class="step">s² = ${formatNumber(r.sumSquaredDiffs)} / ${r.n - 1} = <span class="formula-inline">${formatNumber(r.sampleVariance)}</span></div>`;
        html += `<div class="step">σ² = ${formatNumber(r.sumSquaredDiffs)} / ${r.n} = <span class="formula-inline">${formatNumber(r.popVariance)}</span></div>`;

        html += '<h4>Step 5: Standard Deviations</h4>';
        html += `<div class="step">s = √${formatNumber(r.sampleVariance)} = <span class="formula-inline">${formatNumber(r.sampleStdDev)}</span></div>`;
        html += `<div class="step">σ = √${formatNumber(r.popVariance)} = <span class="formula-inline">${formatNumber(r.popStdDev)}</span></div>`;

        stepsDiv.innerHTML = html;
    }

    function drawHistogram(data, r) {
        const canvas = histogramCanvas;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        const dpr = window.devicePixelRatio || 1;
        const cssW = canvas.parentElement.clientWidth;
        const cssH = 200;
        canvas.width = cssW * dpr;
        canvas.height = cssH * dpr;
        canvas.style.width = cssW + 'px';
        canvas.style.height = cssH + 'px';
        ctx.scale(dpr, dpr);
        ctx.clearRect(0, 0, cssW, cssH);

        const numBins = Math.max(3, Math.min(Math.ceil(Math.sqrt(data.length)), 15));
        const binWidth = (r.max - r.min) / numBins || 1;
        const bins = new Array(numBins).fill(0);
        for (const val of data) {
            let idx = Math.floor((val - r.min) / binWidth);
            if (idx >= numBins) idx = numBins - 1;
            bins[idx]++;
        }
        const maxCount = Math.max(...bins);

        const pad = { top: 10, right: 10, bottom: 30, left: 40 };
        const plotW = cssW - pad.left - pad.right;
        const plotH = cssH - pad.top - pad.bottom;
        const barW = plotW / numBins;

        ctx.fillStyle = '#3498db';
        for (let i = 0; i < numBins; i++) {
            const barH = maxCount > 0 ? (bins[i] / maxCount) * plotH : 0;
            const x = pad.left + i * barW;
            const y = pad.top + plotH - barH;
            ctx.fillRect(x + 1, y, barW - 2, barH);
        }

        const meanX = pad.left + ((r.mean - r.min) / (r.max - r.min || 1)) * plotW;
        ctx.strokeStyle = '#e74c3c';
        ctx.lineWidth = 2;
        ctx.setLineDash([5, 3]);
        ctx.beginPath();
        ctx.moveTo(meanX, pad.top);
        ctx.lineTo(meanX, pad.top + plotH);
        ctx.stroke();
        ctx.setLineDash([]);

        ctx.fillStyle = '#e74c3c';
        ctx.font = '11px -apple-system, sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText('mean', meanX, pad.top - 1);

        ctx.fillStyle = '#7f8c8d';
        ctx.font = '11px -apple-system, sans-serif';
        ctx.textAlign = 'center';
        for (let i = 0; i <= numBins; i += Math.max(1, Math.floor(numBins / 5))) {
            const val = r.min + i * binWidth;
            const x = pad.left + i * barW;
            ctx.fillText(formatNumber(val), x, pad.top + plotH + 16);
        }

        ctx.textAlign = 'right';
        ctx.fillText(maxCount, pad.left - 5, pad.top + 10);
        ctx.fillText('0', pad.left - 5, pad.top + plotH + 4);
    }

    function displaySortedData(data, r) {
        const sorted = r.sorted.map(formatNumber).join(', ');
        sortedDataDiv.innerHTML =
            '<div class="sorted-label">Sorted data (ascending):</div>' +
            '<div class="sorted-values">' + sorted + '</div>' +
            '<div class="five-num">' +
                '<span>Min: <strong>' + formatNumber(r.min) + '</strong></span>' +
                '<span>Q1: <strong>' + formatNumber(r.q1) + '</strong></span>' +
                '<span>Median: <strong>' + formatNumber(r.median) + '</strong></span>' +
                '<span>Q3: <strong>' + formatNumber(r.q3) + '</strong></span>' +
                '<span>Max: <strong>' + formatNumber(r.max) + '</strong></span>' +
            '</div>';
    }

    function copyResults() {
        if (!lastResults) return;
        const r = lastResults;
        const lines = [
            'Count (n): ' + r.n,
            'Sum: ' + formatNumber(r.sum),
            'Mean: ' + formatNumber(r.mean),
            'Median: ' + formatNumber(r.median),
            'Mode: ' + (r.mode ? r.mode.map(formatNumber).join(', ') : 'No mode'),
            'Range: ' + formatNumber(r.range),
            'Min: ' + formatNumber(r.min),
            'Max: ' + formatNumber(r.max),
            'Sample Std Dev (s): ' + formatNumber(r.sampleStdDev),
            'Population Std Dev (σ): ' + formatNumber(r.popStdDev),
            'Sample Variance (s²): ' + formatNumber(r.sampleVariance),
            'Population Variance (σ²): ' + formatNumber(r.popVariance),
        ];
        const text = lines.join('\n');
        navigator.clipboard.writeText(text).then(function() {
            copyBtn.textContent = 'Copied!';
            setTimeout(function() { copyBtn.textContent = 'Copy Results'; }, 2000);
        });
    }

    function formatNumber(num) {
        if (Number.isInteger(num)) return num.toString();
        const rounded = Math.round(num * 1000000) / 1000000;
        if (Number.isInteger(rounded)) return rounded.toString();
        return parseFloat(rounded.toPrecision(10)).toString();
    }

    function showError(message) {
        errorDiv.textContent = message;
        errorDiv.style.display = 'block';
    }

    function clearAll() {
        dataInput.value = '';
        resultsDiv.style.display = 'none';
        errorDiv.style.display = 'none';
        copyBtn.style.display = 'none';
        sortedDataDiv.innerHTML = '';
        lastResults = null;
        const ctx = histogramCanvas.getContext('2d');
        ctx.clearRect(0, 0, histogramCanvas.width, histogramCanvas.height);
        dataInput.focus();
    }

    function loadExample() {
        dataInput.value = '10, 12, 23, 23, 16, 23, 21, 15';
        dataInput.focus();
        calculate();
    }
});
