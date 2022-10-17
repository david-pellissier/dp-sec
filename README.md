# DP-Security

[![Deploy Next.js site to Pages](https://github.com/david-pellissier/dp-sec/actions/workflows/nextjs.yml/badge.svg)](https://github.com/david-pellissier/dp-sec/actions/workflows/nextjs.yml)
[![Semgrep](https://github.com/david-pellissier/dp-sec/actions/workflows/semgrep.yml/badge.svg)](https://github.com/david-pellissier/dp-sec/actions/workflows/semgrep.yml)


This project is my personal website hosted on Github Pages, using NextJS and TailwindCSS.

Its main feature of is a curated list of CTF tools and resources. The app connects to Google Sheets API to retrieve the data. The document can also be found here: [https://docs.google.com/spreadsheets/d/153EWt5MA0mzLMnP5FlJ15d02YZwlyERIMjdAUdZwdzU/](https://docs.google.com/spreadsheets/d/153EWt5MA0mzLMnP5FlJ15d02YZwlyERIMjdAUdZwdzU/)

## To Do List

- Header
    - [ ] Implement
    - [ ] Responsiveness
- Blog
    - [ ] Markdown posts
- About me
- CTF Tools
    - [x] Grid format
        - [x] Make it more responsive
    - [x] Filters
        - [x] Single selection
        - [x] Apply multiple filters
        - [x] Search box
        - [ ] Select multiple values for each filter
        - [ ] Better looking selectors 
    - [ ] Table format

## Getting Started

Run the development server:

```bash
npm run dev
# or
yarn dev
```

Then open [http://localhost:3000](http://localhost:3000) with your browser to see the result.