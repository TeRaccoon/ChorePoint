# ChorePoint 🏆

A gamified full-stack chore management system for families, built to help parents assign, track, and reward household tasks for children.

## Project Status
🚧 In active development  
Core authentication and chore management features are complete. Currently developing the parent dashboard.

## Tech Stack

- Frontend: Angular
- Backend: ASP.NET Core Web API
- Auth: JWT Authentication
- Database: MySQL
- Styling: SaSS

## Planned Features

- Parents can set custom rewards for their children to buy with points
- Chore streaks are tracked to keep children motivated
- Parents can add special, one time tasks for bonus points
- Chores are only completed once the parent approves them
- A parent account can manage chores for all children in one place

## Screenshots
Dummy data was used to provide these screenshots.

### Create Account

<img width="389" height="866" alt="image" src="https://github.com/user-attachments/assets/d699b2c4-3aba-4c53-a749-b89ec5c109ca" />

### Login Page
<img width="388" height="867" alt="image" src="https://github.com/user-attachments/assets/5466595e-d513-4853-97ec-aa4c80f06657" />

### Parent Dashboard
<img width="389" height="840" alt="image" src="https://github.com/user-attachments/assets/24975135-4265-4906-b871-9f0ddba81237" />

### Chore Details
<img width="387" height="867" alt="image" src="https://github.com/user-attachments/assets/38752786-fde0-4637-82aa-70d4b92b6874" />

### Kids Management Page
<img width="387" height="844" alt="image" src="https://github.com/user-attachments/assets/bd3b7479-c302-4fcb-9091-fc537e212be8" />

## Architecture

- Angular frontend consuming REST API built with ASP.NET Core
- Clear separation of concerns using Controller → Service → Repository pattern
- Stateless backend design with token-based authentication
