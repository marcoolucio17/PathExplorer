# PathExplorer Global Styling System

This is a comprehensive CSS architecture that provides a consistent styling foundation for the PathExplorer application.

## Structure

The styling system is organized into the following files:

- `variables.css` - CSS variables for colors, spacing, shadows, etc.
- `typography.css` - Font definitions and text styling utilities
- `layout.css` - Page layouts, grid systems, and containers
- `components.css` - Reusable component styles (buttons, modals, etc.)
- `utilities.css` - Utility classes for common styling needs
- `animations.css` - Animation keyframes and classes

All of these files are imported in the main `index.css` file.

## How to Use

### Page Layout

For consistent page layouts, use the provided page container classes:

```jsx
<div className="page-container">
  <div className="page-content">
    <div className="page-header">
      <Button 
        type="secondary"
        variant="back"
        icon="bi bi-arrow-left"
        onClick={handleBack}
      >
        Back
      </Button>
      <h1 className="page-title">Page Title</h1>
    </div>
    
    <div className="main-content">
      {/* Your content here */}
    </div>
  </div>
</div>
```

### Typography

Use the provided typography classes for consistent text styling:

```jsx
<h1 className="page-title">Page Title</h1>
<h2 className="section-title">Section Title</h2>
<h3 className="card-title">Card Title</h3>
<p className="subtitle">This is a subtitle text</p>
<label className="label-text">Input Label</label>
```

Or use the utility classes:

```jsx
<p className="text-lg font-medium text-light">Custom Text</p>
```

### Components

For consistent component styling, use the provided classes:

```jsx
{/* Button */}
<button className="btn btn-primary">Primary Button</button>
<button className="btn btn-secondary">Secondary Button</button>

{/* Modal */}
<div className="modal-backdrop">
  <div className="modal-content">
    <button className="close-button">×</button>
    <div className="modal-header">
      <h2 className="modal-title">Modal Title</h2>
      <p className="modal-subtitle">Modal subtitle text</p>
    </div>
    <div className="modal-body">
      {/* Modal content */}
    </div>
    <div className="modal-footer">
      <button className="btn btn-secondary">Cancel</button>
      <button className="btn btn-primary">Confirm</button>
    </div>
  </div>
</div>
```

### Utility Classes

Use utility classes for common styling needs:

```jsx
<div className="flex items-center justify-between gap-4 p-4 border rounded-lg shadow-card">
  <div className="w-full">
    <h3 className="card-title mb-2">Title</h3>
    <p className="text-sm text-muted">Description text</p>
  </div>
  <button className="btn btn-primary ml-4">Action</button>
</div>
```

### Animations

Apply animations to elements:

```jsx
<div className="card fade-in">Animated Card</div>

{/* Staggered card animations */}
<div className="card card-animation stagger-1">Card 1</div>
<div className="card card-animation stagger-2">Card 2</div>
<div className="card card-animation stagger-3">Card 3</div>
```

## Converting from Module CSS to Global CSS

To convert a component from module CSS to the global styling system:

1. Replace the CSS module import:
   ```jsx
   // Before
   import styles from "./ComponentName.module.css";
   
   // After
   // No import needed, global styles are available
   ```

2. Replace class references:
   ```jsx
   // Before
   <div className={styles.container}>
   
   // After
   <div className="page-container">
   ```

3. Use utility classes for one-off styling needs:
   ```jsx
   // Before (in CSS module)
   .specialText {
     color: white;
     font-weight: bold;
     margin-top: 1rem;
   }
   
   // After (in JSX)
   <div className="text-light font-bold mt-4">Text</div>
   ```

## Example Conversion

Here's an example of converting the ManagerApplicantsPage component:

```jsx
// Before
import styles from "./ManagerApplicantsPage.module.css";

export const ManagerApplicantsPage = () => {
  return (
    <div className={styles.dashboardContainer}>
      <div className={styles.dashboardContent}>
        <div className={styles.pageHeader}>
          <Button 
            type="secondary"
            variant="back"
            icon="bi bi-arrow-left"
            onClick={handleBackToDashboard}
          >
            Back to Dashboard
          </Button>
          <h1 className={styles.pageTitle}>Project Applicants</h1>
        </div>
        
        {/* Rest of component */}
      </div>
    </div>
  );
};

// After
export const ManagerApplicantsPage = () => {
  return (
    <div className="page-container">
      <div className="page-content">
        <div className="page-header">
          <Button 
            type="secondary"
            variant="back"
            icon="bi bi-arrow-left"
            onClick={handleBackToDashboard}
          >
            Back to Dashboard
          </Button>
          <h1 className="page-title">Project Applicants</h1>
        </div>
        
        {/* Rest of component */}
      </div>
    </div>
  );
};
```