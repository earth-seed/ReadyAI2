import React, { useState, useEffect } from 'react';
import { Calculator } from 'lucide-react';

const ROICalculator: React.FC = () => {
  const [seats, setSeats] = useState<string>('50');
  const [pricePerSeat, setPricePerSeat] = useState<string>('200');
  const [calculated, setCalculated] = useState<boolean>(false);
  const [annualSavings, setAnnualSavings] = useState<number>(0);
  const [percentageSavings, setPercentageSavings] = useState<number>(0);

  const handleCalculate = () => {
    const seatsNum = parseInt(seats, 10) || 0;
    const priceNum = parseFloat(pricePerSeat) || 0;

    const currentAnnualCost = seatsNum * priceNum * 12;
    const devsAiCost = seatsNum * 30 * 12; // $30 per seat per month
    const savings = currentAnnualCost - devsAiCost;
    const savingsPercentage = currentAnnualCost > 0 ? (savings / currentAnnualCost) * 100 : 0;

    setAnnualSavings(savings);
    setPercentageSavings(savingsPercentage);
    setCalculated(true);
  };

  useEffect(() => {
    if (calculated) {
      setCalculated(false);
    }
  }, [seats, pricePerSeat]);

  return (
    <div className="space-y-6">
      <div>
        <h3 className="font-heading text-primary text-xl font-normal mb-2 flex items-center gap-2">
          <Calculator className="h-5 w-5 text-accent" />
          AI ROI Calculator
        </h3>
        <p className="font-sans text-primary-light text-sm">
          Calculate your potential savings by switching to ReadyAI.
        </p>
      </div>

      <div className="space-y-4">
        <div>
          <label htmlFor="seats" className="block font-sans text-sm font-medium text-primary mb-2">
            Number of AI Users
          </label>
          <input
            type="number"
            id="seats"
            min="1"
            value={seats}
            onChange={(e) => setSeats(e.target.value)}
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg font-sans text-primary focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all"
            placeholder="Enter number of users"
          />
        </div>

        <div>
          <label htmlFor="pricePerSeat" className="block font-sans text-sm font-medium text-primary mb-2">
            Current Monthly Cost Per User ($)
          </label>
          <input
            type="number"
            id="pricePerSeat"
            min="0"
            value={pricePerSeat}
            onChange={(e) => setPricePerSeat(e.target.value)}
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg font-sans text-primary focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all"
            placeholder="Enter current cost per user"
          />
        </div>

        <button 
          onClick={handleCalculate}
          className="w-full bg-accent text-white px-6 py-3 rounded-lg font-sans font-semibold hover:bg-accent-dark transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
        >
          Calculate Savings
        </button>
      </div>

      {calculated && (
        <div className="mt-6 p-4 sm:p-6 bg-gradient-to-br from-accent/10 to-transparent rounded-xl border-2 border-accent/30">
          <h4 className="font-heading text-primary text-base sm:text-lg font-normal mb-4">Your Potential Savings</h4>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mb-4">
            <div className="bg-white rounded-lg p-4 border border-accent/20">
              <p className="font-sans text-xs uppercase tracking-wide text-primary-light mb-1">Annual Savings</p>
              <p className="font-heading text-xl sm:text-2xl font-normal text-accent break-words">${annualSavings.toLocaleString()}</p>
            </div>

            <div className="bg-white rounded-lg p-4 border border-accent/20">
              <p className="font-sans text-xs uppercase tracking-wide text-primary-light mb-1">Percentage Savings</p>
              <p className="font-heading text-xl sm:text-2xl font-normal text-accent">{percentageSavings.toFixed(1)}%</p>
            </div>
          </div>

          <p className="font-sans text-sm text-primary-light leading-relaxed">
            By switching to ReadyAI, you could save <span className="font-semibold text-accent">${annualSavings.toLocaleString()}</span> annually,
            which is <span className="font-semibold text-accent">{percentageSavings.toFixed(1)}%</span> of your current AI spending.
          </p>
        </div>
      )}
    </div>
  );
};

export default ROICalculator;