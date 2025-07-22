// Webstruktur for "Matematikk 1T – Kompendium"
// Bruker slug i URL for Netlify-støtte og robust routing

import { BrowserRouter as Router, Routes, Route, Link, useNavigate, useParams } from "react-router-dom";
import { useState } from "react";

const chapters = [
  "Tall og algebra",
  "Likninger og ulikheter",
  "Polynomdivisjon",
  "Funksjoner og grafer",
  "Andregradsfunksjoner",
  "Asymptoter",
  "Grunnleggende trigonometri",
  "Trigonometri i praksis",
  "Derivasjon og vekstfart",
  "Modellering og anvendelse",
  "Geometri og areal/volum",
  "Sannsynlighet og kombinatorikk",
  "Figurtall og tallmønstre",
  "Programmering og algoritmisk tenkning"
];

const pageTypes = ['Teori', 'Eksempler', 'Øving', 'Eksamensoppgaver'];

function slugify(str) {
  return str
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)+/g, '');
}

function Layout({ children }) {
  return (
    <div className="min-h-screen bg-white text-gray-800">
      <header className="bg-blue-600 text-white p-4 shadow">
        <div className="max-w-5xl mx-auto">
          <Link to="/" className="text-xl font-bold hover:underline">Matematikk 1T – Kompendium</Link>
        </div>
      </header>
      <main className="max-w-5xl mx-auto p-6">{children}</main>
    </div>
  );
}

function ChapterPageWrapper() {
  const { slugChapter, slugType } = useParams();
  const chapter = chapters.find(ch => slugify(ch) === slugChapter);
  const type = pageTypes.find(pt => slugify(pt) === slugType);

  if (!chapter || !type) {
    return <Layout><p className="text-red-500">Kapittel eller underside ikke funnet.</p></Layout>;
  }

  return <ChapterPage chapter={chapter} type={type} />;
}

function ChapterPage({ chapter, type }) {
  const navigate = useNavigate();
  return (
    <Layout>
      <button onClick={() => navigate(-1)} className="mb-4 text-blue-600 hover:underline">← Tilbake</button>
      <h1 className="text-2xl font-bold mb-4">{chapter} – {type}</h1>
      <p className="text-gray-600">Innhold for "{type}" i "{chapter}" kommer her.</p>
    </Layout>
  );
}

function ChapterMenu({ chapter }) {
  return (
    <div className="p-4 border rounded-xl shadow-xl">
      <h2 className="text-xl font-semibold mb-2">{chapter}</h2>
      <ul className="space-y-1">
        {pageTypes.map(type => (
          <li key={type}>
            <Link className="text-blue-600 hover:underline" to={`/${slugify(chapter)}/${slugify(type)}`}>{type}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

function Home() {
  return (
    <Layout>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {chapters.map(ch => (
          <ChapterMenu key={ch} chapter={ch} />
        ))}
      </div>
    </Layout>
  );
}

function Fasit({ children }) {
  const [show, setShow] = useState(false);
  return (
    <div className="my-4">
      <button onClick={() => setShow(!show)} className="bg-gray-200 px-3 py-1 rounded hover:bg-gray-300">
        {show ? 'Skjul fasit' : 'Vis fasit'}
      </button>
      {show && <div className="mt-2 p-3 border-l-4 border-green-500 bg-green-50">{children}</div>}
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/:slugChapter/:slugType" element={<ChapterPageWrapper />} />
      </Routes>
    </Router>
  );
}
