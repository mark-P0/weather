import './tailwind/styles.css';
import { E } from './dom.js';
import { SearchBar } from './components/SearchBar.js';
import { ArrowPrompt } from './components/ArrowPrompt.js';
import { SkeletonView } from './components/SkeletonView.js';
import { InfoView } from './components/InfoView.js';
import { NotFoundView } from './components/NotFoundView.js';
import { Disclaimer } from './components/Disclaimer.js';
import { BackgroundImage } from './components/BackgroundImage.js';

function App() {
  let classes = [
    'h-screen flex justify-center bg-stone-800 p-3',
    'relative overflow-hidden [&>*:not(:last-child)]:z-10 text-white aspect-[9/18] bg-white rounded-xl flex flex-col p-3 pt-5 gap-3',
  ];

  return E('div', { class: classes[0] }, [
    E('div', { class: classes[1] }, [
      E('header', [SearchBar()]),
      E('main', { class: 'flex-1 px-3' }, [
        ArrowPrompt(),
        SkeletonView(),
        InfoView(),
        NotFoundView(),
      ]),
      E('footer', [Disclaimer()]),
      BackgroundImage(),
    ]),
  ]);
}

document.body.replaceChildren(App());
