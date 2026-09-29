# API Explorer

A polished, responsive React frontend that explores posts from a public REST API.

## Features

- Responsive modern UI
- Reusable React components
- REST API integration with JSONPlaceholder
- Search posts by title and content
- Filter posts by user
- Refresh API data
- Loading skeleton states
- Empty-result handling
- API error and timeout handling
- Retry support
- Responsive card-based layout

## Tech Stack

- React
- Vite
- JavaScript
- CSS
- Lucide React
- JSONPlaceholder REST API

## Run Locally

```bash
npm install
npm run dev
```

Then open the local Vite development URL shown in the terminal.

## Build

```bash
npm run build
```

## API

This project uses the JSONPlaceholder posts endpoint:

https://jsonplaceholder.typicode.com/posts

## Project Structure

```
src/
├── components/
│   ├── Header.jsx
│   ├── PostCard.jsx
│   ├── States.jsx
│   └── Toolbar.jsx
├── main.jsx
└── styles.css
```

## Purpose

This project demonstrates responsive frontend development, reusable component design, API integration, state management, and practical error handling in React.
