import './tailwind/styles.css';
import { E } from './dom.js';
import { SearchBar } from './components/SearchBar.js';

function App() {
  let classes = [
    'h-screen flex justify-center bg-stone-300 p-3',
    'aspect-[9/18] bg-white rounded-xl flex flex-col p-3 pt-5 gap-3',
  ];

  return E('div', { class: classes[0] }, [
    E('div', { class: classes[1] }, [E('header', [SearchBar()])]),
  ]);
}

document.body.replaceChildren(App());
