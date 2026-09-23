document.addEventListener('DOMContentLoaded', function() {
    const dataInput = document.getElementById('dataInput');
    const calculateBtn = document.getElementById('calculateBtn');
    const clearBtn = document.getElementById('clearBtn');
    const exampleBtn = document.getElementById('exampleBtn');
    const resultsDiv = document.getElementById('results');
    const errorDiv = document.getElementById('error');
    const stepsDiv = document.getElementById('steps');

    calculateBtn.addEventListener('click', calculate);
    clearBtn.addEventListener('click', clearAll);
    exampleBtn.addEventListener('click', loadExample);

    dataInput.addEventListener('keydown', function(e) {
        if (e.key === 'Enter' && e.ctrlKey) {
            calculate();
        }
    });

    function calculate() {
        errorDiv.style.display = 'none';
        resultsDiv.style.display = 'none';

        const input = dataInput.value.trim();
        if (!input) {
            showError('Please enter some numbers to calculate.');
            return;
        }

        const numbers = parseNumbers(input);
        if (numbers.length === 0) {
            showError('No valid numbers found. Please enter numbers separated by commas, spaces, or line breaks.');
            return;
        }

        if (numbers.length < 2) {
            showError('Please enter at least 2 numbers to calculate standard deviation.');
            return;
        }

        const results = computeStats(numbers);
        displayResults(results);
        displaySteps(numbers, results);
    }

    function parseNumbers(input) {
        const tokens = input.split(/[,\s\n\r\t]+/).filter(t => t.length > 0);
        const numbers = [];
        for (const token of tokens) {
            const num = parseFloat(token);
            if (!isNaN(num)) {
                numbers.push(num);
            }
        }
        return numbers;
    }

    function computeStats(data) {
        const n = data.length;
        const sum = data.reduce((a, b) => a + b, 0);
        const mean = sum / n;

        const squaredDiffs = data.map(x => Math.pow(x - mean, 2));
        const sumSquaredDiffs = squaredDiffs.reduce((a, b) => a + b, 0);

        const sampleVariance = sumSquaredDiffs / (n - 1);
        const popVariance = sumSquaredDiffs / n;
        const sampleStdDev = Math.sqrt(sampleVariance);
        const popStdDev = Math.sqrt(popVariance);

        return {
            n,
            sum,
            mean,
            sampleVariance,
            popVariance,
            sampleStdDev,
            popStdDev,
            squaredDiffs,
            sumSquaredDiffs
        };
    }

    function displayResults(results) {
        document.getElementById('count').textContent = results.n;
        document.getElementById('sum').textContent = formatNumber(results.sum);
        document.getElementById('mean').textContent = formatNumber(results.mean);
        document.getElementById('sampleStdDev').textContent = formatNumber(results.sampleStdDev);
        document.getElementById('popStdDev').textContent = formatNumber(results.popStdDev);
        document.getElementById('sampleVariance').textContent = formatNumber(results.sampleVariance);
        document.getElementById('popVariance').textContent = formatNumber(results.popVariance);

        resultsDiv.style.display = 'block';
    }

    function displaySteps(data, results) {
        let html = '';

        html += '<h4>Step 1: Find the Mean (Average)</h4>';
        html += `<div class="step">Sum = ${data.map(n => formatNumber(n)).join(' + ')} = ${formatNumber(results.sum)}</div>`;
        html += `<div class="step">Mean = Sum / n = ${formatNumber(results.sum)} / ${results.n} = <span class="formula-inline">${formatNumber(results.mean)}</span></div>`;

        html += '<h4>Step 2: Find the Squared Differences from the Mean</h4>';
        const diffDetails = data.map((x, i) => {
            const diff = x - results.mean;
            const squared = results.squaredDiffs[i];
            return `(${formatNumber(x)} - ${formatNumber(results.mean)})² = (${formatNumber(diff)})² = ${formatNumber(squared)}`;
        });
        diffDetails.forEach(d => {
            html += `<div class="step">${d}</div>`;
        });

        html += '<h4>Step 3: Sum the Squared Differences</h4>';
        html += `<div class="step">Σ(xᵢ - x̄)² = ${formatNumber(results.sumSquaredDiffs)}</div>`;

        html += '<h4>Step 4: Calculate Variances</h4>';
        html += `<div class="step">Sample Variance (s²) = ${formatNumber(results.sumSquaredDiffs)} / (${results.n} - 1) = ${formatNumber(results.sumSquaredDiffs)} / ${results.n - 1} = <span class="formula-inline">${formatNumber(results.sampleVariance)}</span></div>`;
        html += `<div class="step">Population Variance (σ²) = ${formatNumber(results.sumSquaredDiffs)} / ${results.n} = <span class="formula-inline">${formatNumber(results.popVariance)}</span></div>`;

        html += '<h4>Step 5: Calculate Standard Deviations</h4>';
        html += `<div class="step">Sample Std Dev (s) = √${formatNumber(results.sampleVariance)} = <span class="formula-inline">${formatNumber(results.sampleStdDev)}</span></div>`;
        html += `<div class="step">Population Std Dev (σ) = √${formatNumber(results.popVariance)} = <span class="formula-inline">${formatNumber(results.popStdDev)}</span></div>`;

        stepsDiv.innerHTML = html;
    }

    function formatNumber(num) {
        if (Number.isInteger(num)) {
            return num.toString();
        }
        const rounded = Math.round(num * 1000000) / 1000000;
        if (Number.isInteger(rounded)) {
            return rounded.toString();
        }
        return rounded.toFixed(Math.min(6, getDecimalPlaces(rounded)));
    }

    function getDecimalPlaces(num) {
        const str = num.toString();
        const dotIndex = str.indexOf('.');
        if (dotIndex === -1) return 0;
        return str.length - dotIndex - 1;
    }

    function showError(message) {
        errorDiv.textContent = message;
        errorDiv.style.display = 'block';
    }

    function clearAll() {
        dataInput.value = '';
        resultsDiv.style.display = 'none';
        errorDiv.style.display = 'none';
        dataInput.focus();
    }

    function loadExample() {
        dataInput.value = '10, 12, 23, 23, 16, 23, 21, 15';
        dataInput.focus();
    }
});
