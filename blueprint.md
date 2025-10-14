
# Technical Support Dashboard - Blueprint

## Overview

A professional technical support dashboard where users can respond to already generated tickets and also to check orders. All data is fetched from and updated to Firebase.

## Project Outline

### Styling and Design

*   **Framework:** Tailwind CSS for a modern, utility-first approach.
*   **Icons:** Heroicons for a clean and modern look (`@heroicons/react`).
*   **Color Palette:**
    *   Primary: Blue (`text-blue-500`)
    *   Status Badges: Green for 'Open'/'Delivered', Yellow for 'In Progress'/'Processing', Red for 'Closed', Blue for 'Shipped'.
*   **Typography:**
    *   Font: Default sans-serif.
    *   Headings: `text-2xl`, `font-bold`
*   **Layout:**
    *   A main sidebar for navigation between "Tickets" and "Orders".
    *   A content area that displays lists or details.
    *   Use of cards with shadows (`shadow-md`) to display lists and details.
    *   Clickable list items (`cursor-pointer`, `hover:bg-gray-50`) to navigate to detail views.

### Features

*   **Dashboard Home:**
    *   A unified interface to switch between Tickets and Orders.
*   **Tickets View:**
    *   **List all support tickets from Firestore:** Fetches and displays a list of tickets with their subject, ID, and status.
    *   **View individual ticket details:** On clicking a ticket, a detailed view is shown with subject, ID, status, description, and customer. A "Back" button is provided to return to the list.
    *   (Next) **Update ticket status.**
    *   (Next) **Add a response to a ticket.**
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
    *   Created use cases `getTickets` and `getOrders` to fetch data from Firestore.
3.  **UI Components & Layout:**
    *   Created `Sidebar` for navigation.
    *   Created `TicketList` and `OrderList` components to display data from Firestore, with loading states.
    *   Created `TicketDetails` and `OrderDetails` components to show item-specific information.
4.  **Routing & View Management:**
    *   Implemented state management in the main `Home` component to switch between list and detail views for both tickets and orders.
    *   List items are clickable to show the detail view.
    *   Detail views have a "Back" button to return to the list view.
    *   Sidebar navigation resets any active detail view.

### Current Plan

The next set of features to be implemented are:

1.  **Update Ticket Status:** Add functionality to the `TicketDetails` component to allow changing the status of a ticket (e.g., from 'Open' to 'In Progress').
2.  **Add Responses to Tickets:** Enhance the `TicketDetails` view to display a list of responses and a form to add a new response.
3.  **Styling & UX Polish:** Further refine the UI, improve visual feedback, and ensure a consistent design.

