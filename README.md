# DCP Security Dashboard

A comprehensive Next.js + TypeScript dashboard for data privacy and security management, built with Shadcn UI components.

## Features

### 📊 Data Overview Dashboard (`/dashboard/data-overview`)

- **Data Table**: Displays recent data entries with columns for Date, Data Type, Details, Source, and Shared With
- **Mood Chart**: Interactive line chart showing mood trends over time using Recharts
- **Badge System**: Color-coded badges for different data types and sources
- **Responsive Design**: Works seamlessly on desktop and mobile devices

### 🎛 Consent Manager (`/dashboard/consent-manager`)

- **Toggle Switches**: Interactive switches for each data category using Shadcn Switch component
- **State Persistence**: Uses Zustand for local state management with persistence
- **Category Badges**: Visual indicators for different data categories
- **Summary Cards**: Overview of active and disabled permissions

### 📜 Data Access Logs (`/dashboard/access-logs`)

- **Chronological Logs**: Sorted by latest timestamp first
- **Action Tracking**: Monitor Viewed, Synced, Shared, Deleted actions
- **Access Analytics**: Summary cards showing total accesses, today's activity, and weekly trends
- **Entity Tracking**: Track who accessed data (User, App Backend, Therapist, SDK, External)

### 🔔 Custom Alerts (`/dashboard/alerts`)

- **Alert Table**: Comprehensive list of recent alerts with icons and severity levels
- **Toast Notifications**: Real-time toast notifications using Shadcn Toast
- **Alert Types**: Different categories (mood, activity, consent, access, data)
- **Severity Levels**: Info, Warning, Success, Error indicators

## Tech Stack

- **Framework**: Next.js 15 with TypeScript
- **UI Components**: Shadcn UI with Radix UI primitives
- **Styling**: Tailwind CSS
- **State Management**: Zustand for consent settings
- **Charts**: Recharts for data visualization
- **Icons**: Lucide React and Tabler Icons
- **Date Handling**: date-fns for date formatting

## Project Structure

```
src/
├── app/
│   ├── dashboard/
│   │   ├── data-overview/
│   │   │   └── page.tsx
│   │   ├── consent-manager/
│   │   │   └── page.tsx
│   │   ├── access-logs/
│   │   │   └── page.tsx
│   │   ├── alerts/
│   │   │   └── page.tsx
│   │   └── page.tsx
│   ├── api/
│   │   └── data/
│   │       └── route.ts
│   └── layout.tsx
├── components/
│   ├── ui/
│   │   ├── badge.tsx
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   ├── switch.tsx
│   │   ├── table.tsx
│   │   ├── toast.tsx
│   │   ├── toaster.tsx
│   │   └── use-toast.ts
│   └── dashboard-nav.tsx
└── lib/
    ├── data.json
    ├── store.ts
    └── utils.ts
```

## Getting Started

1. **Install Dependencies**:

   ```bash
   npm install
   ```

2. **Run Development Server**:

   ```bash
   npm run dev
   ```

3. **Access the Dashboard**:
   - Main Dashboard: `http://localhost:3000/dashboard`
   - Data Overview: `http://localhost:3000/dashboard/data-overview`
   - Consent Manager: `http://localhost:3000/dashboard/consent-manager`
   - Access Logs: `http://localhost:3000/dashboard/access-logs`
   - Alerts: `http://localhost:3000/dashboard/alerts`

## Data Sources

The dashboard uses mock data stored in `src/lib/data.json` with the following structure:

- **dataOverview**: Array of data entries with timestamps, types, and sharing information
- **consentSettings**: Array of consent preferences with toggle states
- **accessLogs**: Array of access events with timestamps and entity information
- **alerts**: Array of alert messages with types and severity levels
- **moodChartData**: Array of mood data points for chart visualization

## Key Features

### State Management

- **Zustand Store**: Manages consent settings with local persistence
- **React State**: Handles component-level state for data fetching and UI interactions

### Responsive Design

- **Mobile-First**: All components are responsive and work on mobile devices
- **Grid Layouts**: Flexible grid systems for different screen sizes
- **Navigation**: Collapsible sidebar with mobile-friendly navigation

### Accessibility

- **ARIA Labels**: Proper accessibility attributes on interactive elements
- **Keyboard Navigation**: Full keyboard support for all interactive components
- **Screen Reader Support**: Semantic HTML structure for screen readers

### Performance

- **Client-Side Rendering**: Optimized for interactive dashboards
- **Lazy Loading**: Components load efficiently
- **Memoization**: React.memo and useMemo for performance optimization

## Customization

### Adding New Data Types

1. Update the data structure in `src/lib/data.json`
2. Add corresponding badges in the component files
3. Update TypeScript interfaces as needed

### Styling

- Uses Tailwind CSS with custom design tokens
- Dark mode support built-in
- Consistent spacing and typography scales

### Extending Features

- Easy to add new dashboard pages following the existing pattern
- Modular component architecture for reusability
- TypeScript interfaces for type safety

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

This project is built for demonstration purposes and uses various open-source libraries.
