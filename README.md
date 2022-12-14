# VET
System do wspomagania procesów w sieci gabinetów weterynaryjnych

Informacje:

1. Podstawowym branchem jest develop
2. Wszystkie taski mają mieć własny branch o nazewnictwie JIRA-ID-short-task-description f.e. 'VET-21-employees-register'
3. Wszystkie commity muszą mieć strukture typu JIRA-ID 'short description' f.e. 'VET-21 Adding Employee Model'
4. Commity powinny być atomowe
5. Kod musi być okomentowany
6. Unit Testy do każdej funkcjonalności
7. Skończony task musi być wystawiony jako pull request do branch develop
8. Każdy task musi przejść proces code review dopiero wtedy może być mergowany do głównego brancha develop


Wymagania środowiskowe:

1. Środowisko Node.js
2. Visual Studio Code
3. Sklonowane repozytorium na dysk lokalny - git clone https://github.com/vet-agh/VET.git
3. Pobrany pakietu nodemon - npm install -g nodemon
4. Pobrany plik .env do folderu 'backend'
6. Pobrane pakiety node.js dla backend i frontend
  - cd backend
  - npm install
  
  - cd frontend
  - npm install
  
  
W celu uruchomienia środowiska:

- cd backend
- npm run dev

- cd frontend
- npm start
