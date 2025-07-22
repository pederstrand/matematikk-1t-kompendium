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
  const isTargetPage = chapter === "Tall og algebra" && type === "Teori";

  return (
    <Layout>
      <button onClick={() => navigate(-1)} className="mb-4 text-blue-600 hover:underline">← Tilbake</button>
      <h1 className="text-2xl font-bold mb-4">{chapter} – {type}</h1>

      {isTargetPage ? (
        <div className="space-y-4 text-base leading-relaxed">
          <p><strong>Algebra</strong> er matematikkens språk for det ukjente. I stedet for å jobbe med tall vi vet, jobber vi med symboler (variabler) for å finne ut hva tallene må være.</p>

          <h2 className="text-xl font-semibold mt-6">Hva er en variabel?</h2>
          <p>En variabel er en bokstav som representerer et ukjent tall. For eksempel: hvis du tjener 200 kr per time, og jobber <code>x</code> timer, er lønnen din <code>200x</code>.</p>

          <h2 className="text-xl font-semibold mt-6">Å samle like ledd</h2>
          <p>Du kan legge sammen ledd som har samme variabel: <code>3x + 5x = 8x</code></p>

          <h2 className="text-xl font-semibold mt-6">Å gange ut parenteser</h2>
          <p>Distribuer tallet utenfor parentesen til alle inni: <code>2(x + 4) = 2x + 8</code></p>

          <h2 className="text-xl font-semibold mt-6">Hva er en likning?</h2>
          <p>En likning sier at to uttrykk er like. Vi løser likningen ved å finne hvilken verdi av variabelen som gjør at det stemmer.</p>
          <p>Eksempel: <code>2x + 3 = 11 → x = 4</code></p>

          <h2 className="text-xl font-semibold mt-6">Likninger med brøker</h2>
          <p>Du kan fjerne brøkene ved å multiplisere med fellesnevner: <code>x/2 + x/3 = 10 → 3x + 2x = 60 → x = 12</code></p>

          <h2 className="text-xl font-semibold mt-6">Formelomforming</h2>
          <p>Noen ganger kjenner vi alle tallene bortsett fra én. Da kan vi omforme formelen for å isolere den ukjente.</p>
          <p>Eksempel: <code>A = l · b → b = A / l</code></p>
        </div>
      ) : (
        <p className="text-gray-600">Innhold for "{type}" i "{chapter}" kommer her.</p>
      )}
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
