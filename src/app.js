import React from "react";
import Xjournalism from "./lokaler-xjournalism";
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles'

const categoryStyle = {
  maxWidth: '380px',
  display: 'inline-block'
};

export default function App() {
  return (
    <div className="App">
      
      <Xjournalism from={2010} to={2020} initialZoom={1} onClick={term => alert(JSON.stringify(term, null, '\t'))}/>
      <h2>2010s</h2>
      <p className="p">
        During the 2010s, there was a remarkable increase in tech-related journalisms.
      </p>

      <p>&nbsp;</p>
      <h2>Distribution</h2>
      <div className="distribution"></div>
      <p className="p">
        This classification of XJournalisms is based on when they first appeared in The New York Times. We visualized them in two ways: by the time they first appeared and by categories.
      </p>
      <p></p>
      <div style={categoryStyle}>
        <Xjournalism from={1960} initialZoom={0} categories={['Technology or Data']} onClick={term => alert(JSON.stringify(term, null, '\t'))}/>
      </div>
      <div style={categoryStyle}>
        <Xjournalism from={1960} initialZoom={0} categories={['Type of (Distribution) Medium or Channel']} onClick={term => alert(JSON.stringify(term, null, '\t'))}/>
      </div>
      <div style={categoryStyle}>
        <Xjournalism  from={1960} initialZoom={0} categories={['Motivation or Reporting Style']} onClick={term => alert(JSON.stringify(term, null, '\t'))}/>
      </div>
      <div style={categoryStyle}>
        <Xjournalism from={1960} initialZoom={0} categories={['Thematic Focus or Beat']} onClick={term => alert(JSON.stringify(term, null, '\t'))}/>
      </div>
    </div>
  );
}
