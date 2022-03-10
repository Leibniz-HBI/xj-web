# X-Journalism Website
This repository contains all the code needed to build and update the webapp running at xjournalism.org via Github Pages.  

### Prerequisites

1. Node
2. Webpack
3. A fresh .csv export from our spreadsheet

## Development
### Getting started
```bash
npm install # install deps
npm run start:development
```

### Deployment
To deploy to Github Pages, first build the website with `npm run build` and drag the resulting production files in `/dist` manually to the Github Pages branch `gh-pages` in this repository. Alternatively, if you are authenticated against the repo, you can try `npm run deploy`.

### Update spreadsheet
Follow these rules if you are tasked with researching new journalism terms and add these to the spreadsheet. Temporarily, newest/unverified terms should be added to the sheet "todo". Then they should move into "xjournalism", our nice sheet, which only contains terms that we agreed to add and that have the metadata described below in more detail.

  * id => copy/paste a formula from another id field to generate a new random id
  * term => the english term in the format "{modifier} journalism"
  * categories => one/two of {Motivation, Medium, Technology, Location, Audience, Time, Beat}, separated by a blank and a comma, e.g "Motivation, Technology"
  * alternative spellings => any other spellings for the terms
  * notable_names => any individuals associated with the term
  * appeared_year => open https://www.nytimes.com/search and search for the term as stated in column "term" encased in quotation marks, sort results by oldest first and enter the article date for the oldest result in the format yyyy-mm-dd in this column
  * search_results_gscholar => open https://scholar.google.com and search for the term as stated in column "term" encased in quotation marks, enter the number of search results in this column
  * source_citation => research relevant journal articles and enter citations here
  * source_doi => the full document object identifier URL for the respective article
  * definition => if available, a definition for the term
  * definition_url => if available, the URL to the definition

### General spreadsheet conventions
  * Terms should always be translated to English
  * Take extra care with the category spellings, e.g. “Ogranization”
  * Consolidate, where needed, e.g. “Hip-Hop” und “Hip-Hop-Entertainment”
  * If in doubt about a term, discuss the term in Slack, e.g. “Policy Issues Surrounding Journalism” might not syntactically be a modifier plus "journalism" but rather a whole statement.

### Updated list in web app
To update the mapping table, simply replace `src/lib/data/data.csv` with a fresh export from our Google spreadsheet and re-run build/wait for the development server to reload.
    
### Copyright
(c) Leibniz HBI, Hamburg 2022
