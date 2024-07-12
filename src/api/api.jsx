import axios from "axios";

async function getTags() {
  try {
    const response = await axios.get("https://renderproject-wl0t.onrender.com/tags/getTags", {
      headers: {
        "Content-Type": "application/json",
      },
    });

    return response.data;
  } catch (error) {
    console.error("Error trying to fetch Tags:", error);
    throw error;
  }
}

async function deleteNote(noteId) {
  console.log(noteId);
  try {
    const response = await axios.delete(
      `https://renderproject-wl0t.onrender.com/notes/delete/${noteId}`,
      {
        headers: {
          "Content-Type": "application/json",
          // Agrega otros encabezados si es necesario
        },
        timeout: 5000, // Tiempo límite para la solicitud
      }
    );
    return true;
  } catch (error) {
    if (error.response) {
      // El servidor respondió con un estado fuera del rango 2xx
      console.error("Respuesta del servidor con error:", error.response.data);
    } else if (error.request) {
      // La solicitud fue hecha pero no hubo respuesta
      console.error("No hubo respuesta del servidor:", error.request);
    } else {
      // Algo sucedió al configurar la solicitud
      console.error("Error al configurar la solicitud:", error.message);
    }
  }
}

async function getNotes() {
  try {
    const response = await axios.get("https://renderproject-wl0t.onrender.com/notes/getNotes", {
      headers: {
        "Content-Type": "application/json",
      },
    });

    return response.data;
  } catch (error) {
    console.error("Error trying to fetch Tags:", error);
    throw error;
  }
}

async function createNote(note) {
  console.log(JSON.stringify(note));
  try {
    const response = await fetch("https://renderproject-wl0t.onrender.com/notes/saveNote", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(note), //
    });

    if (!response.ok) {
      throw new Error("Error response not ok"); // Maneja errores si la respuesta no es exitosa
    }

    const data = await response.json(); // Procesa la respuesta JSON, si es necesario
    return data; // Devuelve la data recibida, si es necesario
  } catch (error) {
    console.error("Error al crear la nota!:", error);
    throw error; // Puedes manejar el error según tu lógica de la aplicación
  }
}

async function updateNote(note) {
  console.log(JSON.stringify(note))
  try {
    const response = await fetch("https://renderproject-wl0t.onrender.com/notes/updateNote", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(note), //
    });

    if (!response.ok) {
      throw new Error("Error response not ok");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error al editar la nota!:", error);
    throw error;
  }
}

async function toggleActive(noteId) {
  console.log(`noteId ${noteId}`);
  try {
    const response = await fetch("https://renderproject-wl0t.onrender.com/notes/changeActive", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(noteId),
    });

    if (!response.ok) {
      throw new Error("Error response not ok"); // Maneja errores si la respuesta no es exitosa
    }

    const data = await response.json(); // Procesa la respuesta JSON, si es necesario
    return data; // Devuelve la data recibida, si es necesario
  } catch (error) {
    console.error("Error en el toggle:", error);
    throw error; // Puedes manejar el error según tu lógica de la aplicación
  }
}

export { getTags, deleteNote, getNotes, createNote, toggleActive,updateNote };
