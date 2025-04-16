import { Calculator, InputField } from '@/types/calculator';

// Templates for pre-built calculators
export const prebuiltCalculators: Omit<Calculator, 'id' | 'createdAt' | 'updatedAt'>[] = [
  {
    name: 'Loan Installment Calculator',
    description: 'Calculate monthly payment for a loan based on principal, interest rate, and term.',
    inputs: [
      { id: 'principal', name: 'Principal', placeholder: 'Loan amount', type: 'number' },
      { id: 'rate', name: 'Rate', placeholder: 'Annual interest rate (%)', type: 'number' },
      { id: 'term', name: 'Term', placeholder: 'Loan term in years', type: 'number' }
    ],
    formula: '(Principal * (Rate / 100 / 12) * pow((1 + Rate / 100 / 12), Term * 12)) / (pow((1 + Rate / 100 / 12), Term * 12) - 1)'
  },
  {
    name: 'BMI Calculator',
    description: 'Calculate Body Mass Index based on weight and height.',
    inputs: [
      { id: 'weight', name: 'Weight', placeholder: 'Weight in kg', type: 'number' },
      { id: 'height', name: 'Height', placeholder: 'Height in meters', type: 'number' }
    ],
    formula: 'Weight / (Height * Height)'
  },
  {
    name: 'Z-score Calculator',
    description: 'Calculate the standard score (z-score) of a data point.',
    inputs: [
      { id: 'x', name: 'X', placeholder: 'Data point value', type: 'number' },
      { id: 'mean', name: 'Mean', placeholder: 'Population mean', type: 'number' },
      { id: 'stdDev', name: 'StdDev', placeholder: 'Population standard deviation', type: 'number' }
    ],
    formula: '(X - Mean) / StdDev'
  },
  {
    name: 'Gas Mileage Calculator',
    description: 'Calculate miles per gallon (MPG) for a vehicle.',
    inputs: [
      { id: 'miles', name: 'Miles', placeholder: 'Distance traveled in miles', type: 'number' },
      { id: 'gallons', name: 'Gallons', placeholder: 'Gallons of fuel used', type: 'number' }
    ],
    formula: 'Miles / Gallons'
  },
  {
    name: 'BTU Calculator',
    description: 'Calculate BTUs needed to heat a room based on size and insulation.',
    inputs: [
      { id: 'sqft', name: 'SqFt', placeholder: 'Room size in square feet', type: 'number' },
      { id: 'height', name: 'Height', placeholder: 'Ceiling height in feet', type: 'number' },
      { id: 'factor', name: 'Factor', placeholder: 'Insulation factor (20-30)', type: 'number' }
    ],
    formula: 'SqFt * Height * Factor'
  },
  {
    name: 'Days Between Dates Calculator',
    description: 'Calculate the number of days between two dates (enter days since Jan 1, 2000).',
    inputs: [
      { id: 'date1', name: 'Date1', placeholder: 'First date (days since Jan 1, 2000)', type: 'number' },
      { id: 'date2', name: 'Date2', placeholder: 'Second date (days since Jan 1, 2000)', type: 'number' }
    ],
    formula: 'abs(Date2 - Date1)'
  },
  {
    name: 'Date Addition Calculator',
    description: 'Add days to a date (enter base date as days since Jan 1, 2000).',
    inputs: [
      { id: 'baseDate', name: 'BaseDate', placeholder: 'Base date (days since Jan 1, 2000)', type: 'number' },
      { id: 'daysToAdd', name: 'DaysToAdd', placeholder: 'Days to add', type: 'number' }
    ],
    formula: 'BaseDate + DaysToAdd'
  },
  {
    name: 'Circle Area Calculator',
    description: 'Calculate the area of a circle based on radius.',
    inputs: [
      { id: 'radius', name: 'Radius', placeholder: 'Radius of the circle', type: 'number' }
    ],
    formula: '3.14159 * Radius * Radius'
  },
  {
    name: 'Cube Volume Calculator',
    description: 'Calculate the volume of a cube based on side length.',
    inputs: [
      { id: 'side', name: 'Side', placeholder: 'Length of cube side', type: 'number' }
    ],
    formula: 'Side * Side * Side'
  },
  {
    name: 'Cylinder Volume Calculator',
    description: 'Calculate the volume of a cylinder based on radius and height.',
    inputs: [
      { id: 'radius', name: 'Radius', placeholder: 'Radius of the cylinder', type: 'number' },
      { id: 'height', name: 'Height', placeholder: 'Height of the cylinder', type: 'number' }
    ],
    formula: '3.14159 * Radius * Radius * Height'
  }
];