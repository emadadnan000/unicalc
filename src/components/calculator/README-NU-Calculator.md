# NU Marks Calculator Component

A React component for calculating NU (National University) test marks with proper scoring logic and validation.

## Features

- ✅ Modal/dropdown style interface
- ✅ Solid blue theme (no gradients)
- ✅ Fully responsive design
- ✅ No transitions on mobile for better performance
- ✅ Input validation
- ✅ Proper NU scoring system implementation
- ✅ Self-contained and reusable

## Usage

### Basic Usage

```tsx
import NUCalculatorButton from './components/calculator/NUCalculatorButton';

function MyComponent() {
  return (
    <div>
      <NUCalculatorButton />
    </div>
  );
}
```

### Advanced Usage

```tsx
import React, { useState } from 'react';
import NUMarksCalculator from './components/calculator/NUMarksCalculator';

function MyComponent() {
  const [showCalculator, setShowCalculator] = useState(false);

  return (
    <div>
      <button onClick={() => setShowCalculator(true)}>
        Open NU Calculator
      </button>
      
      <NUMarksCalculator
        isOpen={showCalculator}
        onClose={() => setShowCalculator(false)}
      />
    </div>
  );
}
```

### Integration with Existing Calculator Page

Add to your existing calculator page:

```tsx
import NUCalculatorButton from '../calculator/NUCalculatorButton';

// In your component JSX:
<div className="flex gap-4">
  <button>Regular Calculator</button>
  <NUCalculatorButton variant="secondary" />
</div>
```

## Scoring System

### Advanced Maths (50 MCQs)
- Correct: +1 mark
- Incorrect: -0.25 marks

### Basic Maths (20 MCQs)
- Correct: +1 mark
- Incorrect: -0.25 marks

### IQ (20 MCQs)
- Correct: +1 mark
- Incorrect: -0.25 marks

### English (30 MCQs)
- Correct: +0.33 marks
- Incorrect: -0.0825 marks

## Props

### NUMarksCalculator

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| isOpen | boolean | Yes | Controls modal visibility |
| onClose | () => void | Yes | Called when modal should close |

### NUCalculatorButton

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| className | string | No | Additional CSS classes |
| variant | 'primary' \| 'secondary' | No | Button style variant |

## Mobile Optimization

The component automatically removes transitions and animations on mobile devices (screen width < 768px) for better performance and faster loading.

## Accessibility

- Proper ARIA labels
- Keyboard navigation support
- Focus management
- Screen reader friendly

## Dependencies

- React 18+
- Lucide React (for icons)
- Tailwind CSS

## Files

- `NUMarksCalculator.tsx` - Main calculator component
- `NUCalculatorButton.tsx` - Button to trigger calculator
- `nu-calculator.css` - Mobile optimizations and accessibility styles 