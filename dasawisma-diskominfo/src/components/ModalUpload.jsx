import DocViewer, { DocViewerRenderers } from "@cyntler/react-doc-viewer";
import { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
import ServerApi from "../helper/ServerApi";
import Swal from 'sweetalert2';

export default function ModalUpload({ setModalOpen, id, getkk }) {
  const [selectedDocs, setSelectedDocs] = useState([]);
  // const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async () => {
    try {
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
      <div className="fixed inset-0 bg-white bg-opacity-75 flex items-center justify-center z-50">
        <dotlottie-player
          src="https://lottie.host/47837f57-413f-4424-9cc0-873217624825/97zYatYfkI.json"
          background="transparent"
          speed="1"
          style={{ width: 300, height: 300 }}
          loop
          autoPlay
        />
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white w-full max-w-3xl rounded-xl shadow-2xl overflow-hidden">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold text-gray-800">Upload Document</h2>
            <button 
              onClick={() => setModalOpen(false)}
              className="text-gray-500 hover:text-gray-700 transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div className="bg-white rounded-lg">
            {selectedDocs.length === 0 ? (
              <div className="relative">
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-8">
                  <div className="text-center">
                    <svg
                      className="mx-auto h-12 w-12 text-gray-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
                        d="M19.479 10.092c-.212-3.951-3.473-7.092-7.479-7.092-4.005 0-7.267 3.141-7.479 7.092-2.57.463-4.521 2.706-4.521 5.408 0 3.037 2.463 5.5 5.5 5.5h13c3.037 0 5.5-2.463 5.5-5.5 0-2.702-1.951-4.945-4.521-5.408zm-7.479-1.092l4 4h-3v4h-2v-4h-3l4-4z" />
                    </svg>
                    <p className="mt-4 text-sm text-gray-600">
                      <span className="font-medium">Click to upload</span> or drag and drop
                    </p>
                    <p className="mt-1 text-xs text-gray-500">PDF files only</p>
                  </div>

                  <input
                    type="file"
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    accept=".pdf"
                    multiple
                    onChange={(el) =>
                      el.target.files?.length &&
                      setSelectedDocs(Array.from(el.target.files))
                    }
                  />
                </div>
              </div>
            ) : (
              <div className="h-96 overflow-auto">
                <DocViewer
                  documents={selectedDocs.map((file) => ({
                    uri: window.URL.createObjectURL(file),
                    fileName: file.name,
                  }))}
                  pluginRenderers={DocViewerRenderers}
                />
              </div>
            )}
          </div>
        </div>

        <div className="bg-gray-50 px-6 py-4 flex justify-end gap-3">
          <button
            onClick={() => setModalOpen(false)}
            className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors"
          >
            Upload
          </button>
        </div>
      </div>
    </div>
  );
}