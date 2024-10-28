# Task Dashboard

## Overview

This project aims to create a responsive task dashboard that features offline support, modals, and actionable functionalities for managing tasks. The dashboard is designed to provide a user-friendly interface, allowing administrators to easily navigate, monitor, and interact with various data points in real-time.

## Features

- **Responsive Design**: The dashboard is fully responsive, ensuring optimal usability across different devices and screen sizes.
- **Offline Support**: Users can access cache content on the site and can add new content to which later get synchronised with database when user gained connectivity
- **Modals for Actions**: Modals are used for various actions, including adding or editing tasks providing a seamless user experience.


## Tech Stack

### Frontend
- **UI**: React CRA, Tailwind CSS, TypeScript ,Tanstack Query , Service Worker 
- **State Management**: Context API
- **Data Management**: IndexedDB for caching new content
- **Icons**: React Icons for visual enhancements
- **Validation**: Zod

### Backend 
 - **Express** : For serverless API
 - **Primsa**: For database interaction 
 - **MySQL**: Database



## Run Locally

Clone the project

```bash
  git clone https://github.com/DSB2004/pwa_assignment.git
```

Go to the project directory

```bash
  cd pwa_assignment
```

### For Serverside


Go to the server directory

```bash
  cd ./server
```
Install dependencies

```bash
  npm install
```

Start the server

```bash
  npm run dev
```



### For ClientSide

Go to the client directory
```bash
  cd ./client
```

Install dependencies

```bash
  npm install
```

Start the server

```bash
  npm run start
```

