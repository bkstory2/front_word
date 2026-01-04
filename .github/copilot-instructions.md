# Copilot Instructions for `front_word` (Vue 3 + Vite)

## Architecture & Data Flow

- **SPA** using **Vue 3** and **Vite**. Main UI is a two-pane layout in [src/views/WordView.vue](src/views/WordView.vue), showing days and word lists.
- **Vue Router** is set up in [src/router/index.js](src/router/index.js), but only a single main view is currently registered. Structure supports future expansion.
- **API communication** is centralized in [src/api/wordApi.js](src/api/wordApi.js) using Axios. All backend calls (fetching days, words, updating word status) go through this layer. Target backend: `http://localhost:8080/api`.
- **State management** is local to components using Vue's `ref`/`reactive`. No global store (Vuex/Pinia) is used.

## Key Files & Patterns

- [src/App.vue](src/App.vue): Root component, renders `WordView`.
- [src/views/WordView.vue](src/views/WordView.vue): Main UI logic, handles fetching, selection, and updating of days/words.
- [src/api/wordApi.js](src/api/wordApi.js): All API endpoints. Add new backend calls here and import into components.
- [vite.config.js](vite.config.js): Sets up `@` alias for `src/` imports.
- [package.json](package.json): Scripts and dependencies.

## Developer Workflows

- **Install dependencies:** `npm install`
- **Start dev server:** `npm run dev` (hot reload)
- **Build for production:** `npm run build`
- **Lint & auto-fix:** `npm run lint`
- **Format code:** `npm run format`

## Project Conventions

- **API Layer:** All backend communication must go through [src/api/wordApi.js](src/api/wordApi.js). Do not call Axios directly in components.
- **Component Imports:** Use `@/` alias for paths from `src/`.
- **Styling:** Use scoped CSS in `.vue` files. Layouts use flexbox.
- **Data Fetching:** Fetch day/word data on mount. Selecting a day triggers a word list update. Word status updates trigger API calls and local state updates.
- **Routing:** Only one route/view is active, but router is ready for more.

## Integration Points

- **Backend API:** Expects endpoints `/day/list`, `/word/list/:dSeq`, `/word/update` at `http://localhost:8080/api`.
- **Devtools:** Use [Vue.js devtools](https://chromewebstore.google.com/detail/vuejs-devtools/nhdogjmejiglipccpnnnanhbledajbpd) for debugging.

## Examples

- **Add new API call:**
  1. Add function to [src/api/wordApi.js](src/api/wordApi.js).
  2. Import and use in the relevant component.
- **Add new view/route:**
  1. Create new `.vue` in `src/views/`.
  2. Register route in [src/router/index.js](src/router/index.js).
  3. Add navigation as needed.

## References

- [README.md](README.md): Setup and scripts
- [vite.config.js](vite.config.js): Build and alias config
- [src/views/WordView.vue](src/views/WordView.vue): Main UI/data patterns

---

If any patterns or workflows are unclear, review the above files or request clarification.
