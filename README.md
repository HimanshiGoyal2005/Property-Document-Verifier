# PropCheck AI - Modular Structure

This project has been restructured from a single monolithic file into a modular architecture for better maintainability and reusability.

## File Structure

```
PropCheckAI/
├── components/           # React components
│   ├── UploadPage.jsx
│   ├── ResultsPage.jsx
│   ├── UploadZone.jsx
│   ├── StateSelector.jsx
│   ├── AgentProgress.jsx
│   ├── FlagCard.jsx
│   ├── TitleChain.jsx
│   ├── ComplianceChecklist.jsx
│   ├── DocumentSummary.jsx
│   ├── SectionHeader.jsx
│   ├── Logo.jsx
│   └── RiskBadge.jsx
├── constants/            # Application constants
│   ├── tokens.js
│   ├── riskConfig.js
│   ├── stateDocs.js
│   └── steps.js
├── data/                 # Mock data
│   └── mockReport.js
├── icons/                # Icon components
│   └── index.js
├── styles/               # CSS styles
│   └── main.css
├── App.jsx               # Main application component
├── index.js              # Entry point
└── PropCheckAI.old.jsx   # Original monolithic file (backup)
```

## Usage

To use this modular structure:

1. Import the main App component from `index.js`
2. Ensure your build system supports ES6 modules and JSX
3. Import the CSS file in your main component

## Benefits

- **Maintainability**: Each component has a single responsibility
- **Reusability**: Components can be easily imported and reused
- **Testing**: Individual components can be tested in isolation
- **Collaboration**: Multiple developers can work on different parts simultaneously
- **Performance**: Better tree-shaking and code splitting opportunities

## Original File

The original monolithic file has been preserved as `PropCheckAI.old.jsx` for reference.