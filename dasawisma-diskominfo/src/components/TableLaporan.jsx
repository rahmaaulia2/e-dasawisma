import { useState } from "react";
import DocViewer, { DocViewerRenderers } from "@cyntler/react-doc-viewer";
import "@cyntler/react-doc-viewer/dist/index.css";
import ModalUpload from "./ModalUpload";

export default function TableLaporan() {
  const array = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  const [modalOpen, setModalOpen] = useState(false);
  const [colorrr, setColor] = useState("red");
  function ViewDoc() {
    const docs = [
      {
        uri: "example.pdf",
        fileType: "pdf",
        fileName: "Laporan b",
      },
      {
        uri: "https://s28.q4cdn.com/392171258/files/doc_downloads/test.pdf",
        fileType: "pdf",
        fileName: "Laporan A",
      },
      {
        uri: "https://storage.googleapis.com/flip-prod-mktg-strapi/media-library/Indonesian_Foods_80deed788b/Indonesian_Foods_80deed788b.png",
        fileType: "jpg",
        fileName: "Laporan A",
      },
    ];
    return (
      <DocViewer
        documents={docs}
        pluginRenderers={DocViewerRenderers}
        style={{ height: "100vh" }}
      />
    );
  }
  const [selectedDocs, setSelectedDocs] = useState([]);
  const uploadDoc = () => {
    return (
      <>
        <input
          type="file"
          accept=".pdf"
          multiple
          onChange={(el) =>
            el.target.files?.length &&
            setSelectedDocs(Array.from(el.target.files))
          }
        />
        <DocViewer
          documents={selectedDocs.map((file) => ({
            uri: window.URL.createObjectURL(file),
            fileName: file.name,
          }))}
          pluginRenderers={DocViewerRenderers}
        />
      </>
    );
  };
  if (modalOpen) {
    return <ModalUpload />;
  } else if( !modalOpen) {
    return (
      <>
        <h6 style={{ color: colorrr }}>iniiiii</h6>
        <div className="p-6">
          <div className="grid grid-cols-1 gap-4 sm:mt-2 sm:grid-cols-2 lg:grid-cols-2 gap-6 mb-2">
            <div className="bg-white border border-gray-200 shadow-md shadow-black/5 p-6 rounded-md lg:col-span-2">
              <div className="flex justify-between mb-4 items-start">
                <div className="font-medium">Manajemen Laporan</div>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full min-w-[460px]">
                  <thead>
                    <tr>
                      <th className="text-[12px] uppercase tracking-wide font-medium text-gray-400 py-2 px-4 bg-gray-50 text-left rounded-tl-md rounded-bl-md">
                        Nama File
                      </th>
                      <th className="text-[12px] uppercase tracking-wide font-medium text-gray-400 py-2 px-4 bg-gray-50 text-left">
                        Bulan
                      </th>
                      <th className="text-[12px] uppercase tracking-wide font-medium text-gray-400 py-2 px-4 bg-gray-50 text-left rounded-tr-md rounded-br-md">
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {array.map((item, index) => (
                      <tr key={index}>
                        <td className="py-2 px-4 border-b border-b-gray-50">
                          <div className="flex items-center">
                            <a
                              href="#"
                              className="text-gray-600 text-sm font-medium hover:text-blue-500 ml-2 truncate"
                            >
                              Laporan A
                            </a>
                          </div>
                        </td>
                        <td className="py-2 px-4 border-b border-b-gray-50">
                          <span className="text-[13px] font-medium text-cyan-500">
                            April
                          </span>
                        </td>
                        <td className="flex gap-2 py-2 px-4 border-b border-b-gray-50">
                          <button
                            onClick={() => {
                              // setColor("yellow")
                              ViewDoc();
                            }}
                            className="inline-block p-1 rounded bg-emerald-500/10 text-emerald-500 font-medium text-[12px] leading-none"
                          >
                            View
                          </button>
                          <button
                            onClick={() => {
                              setModalOpen(true);
                            }}
                            className="inline-block p-1 rounded bg-yellow-500/10 text-yellow-500 font-medium text-[12px] leading-none"
                          >
                            Upload
                          </button>
                          <span className="inline-block p-1 rounded bg-red-500/10 text-red-500 font-medium text-[12px] leading-none">
                            Delete
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div>
                <canvas id="order-chart" />
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}
