import '../semantic/dist/semantic.js';
import '../semantic/dist/semantic.css';

import React from 'react';
import { render } from 'react-dom';

import { Route, Router, useRouterHistory } from 'react-router';
import { createHistory } from 'history';

let history = useRouterHistory(createHistory)({
  basename: '/BASENAME'
});

import App from './app';

import AllSamples from './containers/allSamples';
import AllSequences from './containers/allSequences';
import AllClones from './containers/allClones';
import Clone from './containers/clone';
import CloneExport from './containers/cloneExport';
import SampleAnalysis from './components/sampleAnalysis';
import Sequence from './components/sequence';
import SequenceExport from './containers/sequenceExport';
import SampleExport from './containers/sampleExport';
import SubjectList from './components/subjectList';
import Subject from './containers/subject';

render(
  <Router history={history}>
    <Route path='/' component={App}>
      <Route path='clones' component={AllClones} />
      <Route path='clone/:id' component={Clone} />
      <Route path='samples' component={AllSamples} />
      <Route path='sample-analysis/:sampleEncoding' component={SampleAnalysis} />
      <Route path='sequences' component={AllSequences} />
      <Route path='sequence/:sampleId/:seqId' component={Sequence} />
      <Route path='subjects' component={SubjectList} />
      <Route path='subject/:id' component={Subject} />
      <Route path='export/sequences' component={SequenceExport} />
      <Route path='export/clones' component={CloneExport} />
      <Route path='export/samples' component={SampleExport} />
    </Route>
  </Router>,
  document.getElementById('root')
);
