let yearCounter = 1;  //This variable keeps track of the number of years (cash flow inputs). Initially, it is set to 1 because there is already one input field for "Year 1" in the HTML.

// Purpose: This function dynamically adds new input fields for additional years of cash flows when the user clicks the "Add Year" button.
// How it works:
// The yearCounter is incremented to keep track of the current year (i.e., 2, 3, 4, etc.).
// A new <div> is created, containing a label (e.g., "Year 2") and an input field for entering the cash flow for that year.
// The new <div> is appended to the container element with the ID 'cashFlowsInput' in the HTML.
function addYearInput() {
    yearCounter++;
    const newInput = document.createElement("div");
    newInput.innerHTML = `<label for="year${yearCounter}">Year ${yearCounter}:</label><input type="number" id="year${yearCounter}" placeholder="Cash flow for year ${yearCounter}">`;
    document.getElementById('cashFlowsInput').appendChild(newInput);
}

// Purpose: This function retrieves user inputs and calls the necessary functions to calculate Net Present Value (NPV), Return on Investment (ROI), Payback Period, and Net Profit. It then displays the results.
function calculateAll() {
    const initialInvestment = parseFloat(document.getElementById('initialInvestment').value);
    const discountRate = parseFloat(document.getElementById('discountRate').value) / 100;

    let cashFlows = [];
    for (let i = 1; i <= yearCounter; i++) {
        cashFlows.push(parseFloat(document.getElementById(`year${i}`).value));
    }

    const npv = calculateNetPresentValue(initialInvestment, discountRate, cashFlows);
    const netProfit = calculateNetProfit(initialInvestment, cashFlows); // Fixing Net Profit Calculation
    const roi = calculateROI(initialInvestment, netProfit); // Fixing ROI calculation
    const payback = calculatePaybackPeriod(initialInvestment, cashFlows);

    document.getElementById('npvResult').textContent = npv.toFixed(2);
    document.getElementById('roiResult').textContent = (roi * 100).toFixed(2) + '%';
    document.getElementById('paybackResult').textContent = payback;
    document.getElementById('netProfitResult').textContent = netProfit.toFixed(2);
}

function calculateNetPresentValue(initialInvestment, discountRate, cashFlows) {
    let npv = -initialInvestment;
    for (let i = 0; i < cashFlows.length; i++) {
        npv += cashFlows[i] / Math.pow(1 + discountRate, i + 1);
    }
    return npv;
}

function calculateROI(initialInvestment, netProfit) {
    return netProfit / initialInvestment; // ROI should use Net Profit
}

function calculatePaybackPeriod(initialInvestment, cashFlows) {
    let cumulativeCashFlow = 0;
    for (let i = 0; i < cashFlows.length; i++) {
        cumulativeCashFlow += cashFlows[i];
        if (cumulativeCashFlow >= initialInvestment) {
            return i + 1; // Payback period in years
        }
    }
    return "Payback not reached";
}

function calculateNetProfit(initialInvestment, cashFlows) {
    const totalCashFlows = cashFlows.reduce((total, current) => total + current, 0);
    return totalCashFlows - initialInvestment; // Fix: Net Profit = Total Cash Flows - Initial Investment
}
