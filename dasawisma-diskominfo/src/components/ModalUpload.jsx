import DocViewer, { DocViewerRenderers } from "@cyntler/react-doc-viewer";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import ServerApi from "../helper/ServerApi";

export default function ModalUpload({ setModalOpen, id, getkk }) {
  const [selectedDocs, setSelectedDocs] = useState([]);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const handleSubmit = async () => {
    try {
      console.log(selectedDocs, "ini select doc");
      const formData = new FormData();
      formData.append("kartuKeluarga", selectedDocs[0]);
      setIsLoading(true);
      const response = await fetch(`${ServerApi}KK/${id}`, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
        body: formData,
      });
      console.log(response, "ini respon dari modal form");
      setIsLoading(false);
      Swal.fire({
        icon: "success",
        title: `Success upload`,
        text: "I will close in 2 seconds.",
        timer: 2000,
      });
      getkk();
      setModalOpen(false);
    } catch (error) {
      console.log(error);
    }
  };
  if (isLoading) {
    return (
      <>
        <div className="flex items-center justify-center min-h-screen">
          <dotlottie-player
            src="https://lottie.host/47837f57-413f-4424-9cc0-873217624825/97zYatYfkI.json"
            background="transparent"
            speed="1"
            style={{ width: 300, height: 300 }}
            loop
            autoPlay
          ></dotlottie-player>
        </div>
      </>
    );
  }
  return (
    <>
      {/* component */}
      {/* <h1>{modalOpen? "true" : "false"}</h1> */}

      <div className="bg-white h-screen w-screen sm:px-8 md:px-16 sm:py-8">
        <main className="container mx-auto max-w-screen-lg h-full">
          {/* file upload modal */}
          <article
            aria-label="File Upload Modal"
            className="relative h-full flex flex-col bg-white shadow-xl rounded-md"
            onDrop="dropHandler(event);"
            onDragOver="dragOverHandler(event);"
            onDragLeave="dragLeaveHandler(event);"
            onDragEnter="dragEnterHandler(event);"
          >
            {/* overlay */}
            {selectedDocs.length === 0 ? (
              <div>
                <div
                  id="overlay"
                  className="w-full h-full absolute top-0 left-0 pointer-events-none z-50 flex flex-col items-center justify-center rounded-md"
                >
                  <i>
                    <svg
                      className="fill-current w-12 h-12 mb-3 text-blue-700"
                      xmlns="http://www.w3.org/2000/svg"
                      width={24}
                      height={24}
                      viewBox="0 0 24 24"
                    >
                      <path d="M19.479 10.092c-.212-3.951-3.473-7.092-7.479-7.092-4.005 0-7.267 3.141-7.479 7.092-2.57.463-4.521 2.706-4.521 5.408 0 3.037 2.463 5.5 5.5 5.5h13c3.037 0 5.5-2.463 5.5-5.5 0-2.702-1.951-4.945-4.521-5.408zm-7.479-1.092l4 4h-3v4h-2v-4h-3l4-4z" />
                    </svg>
                  </i>
                  <p className="text-lg text-blue-700">Drop files to upload</p>
                </div>
                <section className="overflow-auto p-8 w-full h-full flex flex-col">
                  <header className="border-dashed border-2 border-gray-400 py-12 flex flex-col justify-center items-center">
                    <p className="mb-3 font-semibold text-gray-900 flex flex-wrap justify-center">
                      <span>Drag and drop your</span>&nbsp;
                      <span>files anywhere or</span>
                    </p>
                    <input
                      className="mt-2 rounded-md px-3 py-1 bg-gray-200 hover:bg-gray-300 focus:shadow-outline focus:outline-none"
                      type="file"
                      accept=".pdf"
                      multiple
                      onChange={(el) =>
                        el.target.files?.length &&
                        setSelectedDocs(Array.from(el.target.files))
                      }
                    />
                    {/* <button
      id="button"
      className="mt-2 rounded-sm px-3 py-1 bg-gray-200 hover:bg-gray-300 focus:shadow-outline focus:outline-none"
    >
      Upload a file
    </button> */}
                  </header>
                </section>
              </div>
            ) : (
              <section className="overflow-auto p-8 w-full h-full flex flex-col">
                <ul id="gallery" className="flex flex-1 flex-wrap -m-1">
                  <li
                    id="empty"
                    className="h-full w-full text-center flex flex-col justify-center items-center"
                  >
                    <div className="max-w-md w-full">
                      <DocViewer
                        documents={selectedDocs.map((file) => ({
                          uri: window.URL.createObjectURL(file),
                          fileName: file.name,
                        }))}
                        pluginRenderers={DocViewerRenderers}
                      />
                      <span className="text-small text-gray-500">
                        {selectedDocs.length === 0 ? "No files selected" : ""}
                      </span>
                    </div>
                  </li>
                </ul>
              </section>
            )}

            {/* scroll area */}

            {/* sticky footer */}
            <footer className="flex justify-end px-8 pb-8 pt-4">
              <button
                id="submit"
                onClick={() => {
                  handleSubmit();
                }}
                className="rounded-md px-3 py-1 bg-blue-700 hover:bg-blue-500 text-white focus:shadow-outline focus:outline-none"
              >
                Upload now
              </button>
              <button
                onClick={() => {
                  setModalOpen(false);
                }}
                id="cancel"
                className="ml-3 rounded-md px-3 py-1 hover:bg-gray-300 focus:shadow-outline focus:outline-none"
              >
                Cancel
              </button>
            </footer>
          </article>
        </main>
      </div>
      {/* using two similar templates for simplicity in js code */}
      <template id="file-template" />
      <template id="image-template" />
      <style
        dangerouslySetInnerHTML={{
          __html:
            "\n.hasImage:hover section {\n  background-color: rgba(5, 5, 5, 0.4);\n}\n.hasImage:hover button:hover {\n  background: rgba(5, 5, 5, 0.45);\n}\n\n#overlay p,\ni {\n  opacity: 0;\n}\n\n#overlay.draggedover {\n  background-color: rgba(255, 255, 255, 0.7);\n}\n#overlay.draggedover p,\n#overlay.draggedover i {\n  opacity: 1;\n}\n\n.group:hover .group-hover\\:text-blue-800 {\n  color: #2b6cb0;\n}\n",
        }}
      />
    </>
  );
}
