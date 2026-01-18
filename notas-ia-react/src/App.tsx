import { useState } from "react";

type Nota ={
  id: number;
  contenido: string;
  resumen: string;
};


function App() {
  const [notas, setNotas] = useState<Nota[]>([]);

  const addNota = () => {
    const nuevaNota: Nota = {
      id: Date.now(),
      contenido: "Contenido de la nota",
      resumen: "Resumen de la nota",
    };
    setNotas([...notas, nuevaNota]);
  };

  const actualizarNota = (id: number, contenido: string) => {
    setNotas(
      notas.map(nota => 
         nota.id === id ? { ...nota, contenido } : nota
      )
    );
  };
  const resumirNota = (id: number) => {
      const nota = notas.find(n => n.id === id);
    if (!nota || !nota.contenido) return alert("Escribe una nota primero");
    const resumen = "Resumen con ia: "; // Conectar con api ia.

    setNotas(
      notas.map(n =>
        n.id === id ? { ...n, resumen } : n
      )
    );
  };

  return(
     <main className="container">
      <header className="app-header">
        <h2>📝 Mis notas</h2>
        <button onClick={addNota}>Agregar nota</button>
      </header>

      <section className="notas">
        {notas.map(note => (
          <article key={note.id} className="nota">
            <textarea
              placeholder="Escribe tu nota aquí..."
              value={note.contenido}
              onChange={e => actualizarNota(note.id, e.target.value)}
            />

            <button onClick={() => resumirNota(note.id)}>
              Resumir con IA
            </button>

            {note.resumen && (
              <section className="summary">
                <h3>Resumen</h3>
                <p>{note.resumen}</p>
              </section>
            )}
          </article>
        ))}
      </section>
    </main>
  );
}

export default App
