import React from 'react'
import ReactDOM from 'react-dom'
import {BrowserRouter} from 'react-router-dom'
import renderer from 'react-test-renderer'
import {NoteList} from './Notes/NoteList'
import App from './App';

test('renders without crashing (smoke test)', () => {
  const div = document.createElement('div');
  ReactDOM.render(<BrowserRouter><App /></BrowserRouter>, div)
  ReactDOM.unmountComponentAtNode(div);
});

it('renders the User Interface as expected (snapshot test)', () => {
  const tree = renderer
    .create(NoteList)
    .toJSON();
  expect(tree).toMatchSnapshot();  
  });

