
# Technical Support Dashboard - Blueprint

## Overview

A professional technical support dashboard where users can respond to already generated tickets and also to check orders. All data is fetched from and updated to Firebase.

## Project Outline

### Styling and Design

*   **Framework:** Tailwind CSS for a modern, utility-first approach.
*   **Icons:** Heroicons for a clean and modern look (`@heroicons/react`).
*   **Charts:** Recharts for data visualization (`recharts`).
*   **Color Palette:**
    *   Primary: Blue (`text-blue-500`)
    *   Status Badges: Green for 'Open'/'Delivered', Yellow for 'In Progress'/'Processing', Red for 'Closed', Blue for 'Shipped'.
*   **Typography:**
    *   Font: Default sans-serif.
    *   Headings: `text-2xl`, `font-bold`
*   **Layout:**
    *   A main sidebar for navigation between "General Overview", "Order Flow", "Tickets", and "Orders".
    *   A content area that displays lists or details.
    *   Use of cards with shadows (`shadow-md`) to display lists and details.
    *   Clickable list items (`cursor-pointer`, `hover:bg-gray-50`) to navigate to detail views.

### Features

*   **Dashboard Home:**
    *   A unified interface to switch between General Overview, Order Flow, Tickets and Orders.
*   **General Overview:**
    *   Displays high-level, key summary statistics of the platform's overall health and performance.
    *   Includes mini-cards for key numbers like Total Revenue, Average Fulfillment Time, Completed Orders, etc.
    *   Data is fetched live from Firebase.
*   **Order Flow:**
    *   **Core Metrics & Visualizations:** Analyzes the efficiency and health of the order processing pipeline.
    *   **Order Volume:** Shows the number of orders placed over time with a bar chart.
    *   **Order Status Breakdown:** A pie chart showing the proportion of orders in different statuses.
    *   **Average Time Per Step:** Displays key metrics for the different stages of the order fulfillment process.
    *   Data is fetched live from Firebase.
*   **Tickets View:**
    *   **List all support tickets from Firestore:** Fetches and displays a list of tickets with their subject, ID, and status.
    *   **View individual ticket details:** On clicking a ticket, a detailed view is shown with subject, ID, status, description, and customer. A "Back" button is provided to return to the list.
    *   **Update ticket status:** Change the status of a ticket (e.g., from 'Active' to 'Inactive').
    *   **Add a response to a ticket:** Add a new message to the ticket's conversation history.
    *   (Future Scope) Filter tickets by status.
*   **Orders View:**
    *   **List all orders from Firestore:** Fetches and displays a list of orders with their ID, customer, and status.
    *   **View order details:** On clicking an order, a detailed view is shown with ID, customer, status, items, and total. A "Back" button is provided to return to the list.
    *   (Future Scope) Search for an order by Order ID or Customer Name.
*   **Authentication:** (Future Scope) User login and authentication.

## Development Plan

### Completed Steps

1.  **Project Setup:** Initialized a Next.js project.
2.  **Firebase Integration:**
    *   Installed `firebase` SDK.
    *   Configured Firebase in `src/firebase/config.js`.
    *   Created use cases `getTickets`, `getOrders`, `getOverviewData`, `getOrderFlowData`, `updateTicketStatus`, and `addResponseToTicket` to interact with Firestore.
3.  **UI Components & Layout:**
    *   Created `Sidebar` for navigation.
    *   Created `TicketList` and `OrderList` components to display data from Firestore, with loading states.
    *   Created `TicketDetails` and `OrderDetails` components to show item-specific information.
    *   Created `GeneralOverview` component and connected it to display live stats from Firebase.
    *   Created `OrderFlow` component and connected it to display live charts and metrics from Firebase.
4.  **Routing & View Management:**
    *   Implemented state management in the main `Home` component to switch between views.
    *   List items are clickable to show the detail view.
    *   Detail views have a "Back" button to return to the list view.
    *   Sidebar navigation resets any active detail view.
    *   Added a "General Overview" link to the sidebar and set it as the default view.
    *   Added an "Order Flow" link to the sidebar.
5.  **Ticket Management:**
    *   Implemented functionality in the `TicketDetails` component to update a ticket's status.
    *   Added a form to the `TicketDetails` component to allow support agents to add responses to a ticket.
6.  **Dependency Management:**
    *   Installed `recharts` for charting.

### Current Plan

The next set of features to be implemented are:

1.  **Styling & UX Polish:** Further refine the UI, improve visual feedback, and ensure a consistent design across the application.
2.  **Filter Tickets:** Add the ability to filter tickets by their status (e.g., 'Active', 'Inactive').
3.  **Search Orders:** Implement a search bar to find orders by their ID or the customer's name.
