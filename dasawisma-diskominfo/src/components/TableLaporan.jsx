import { useState } from "react";
import DocViewer, { DocViewerRenderers } from "@cyntler/react-doc-viewer";
import "@cyntler/react-doc-viewer/dist/index.css";
import ModalUpload from "./ModalUpload";
import { Link } from "react-router-dom";

export default function TableLaporan() {
  const array = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  const [modalOpen, setModalOpen] = useState(false);
  const [viewOpen, setViewOpen] = useState(false);
  const [colorrr, setColor] = useState("red");
  const handleDelete = () => {
    return Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "Deleted!",
          text: "Your file has been deleted.",
          icon: "success",
        });
      }
    });
  };
  // function ViewDoc() {
  //   const docs = [
  //     {
  //       uri: "example.pdf",
  //       fileType: "pdf",
  //       fileName: "Laporan b",
  //     },
  //     {
  //       uri: "https://s28.q4cdn.com/392171258/files/doc_downloads/test.pdf",
  //       fileType: "pdf",
  //       fileName: "Laporan A",
  //     },
  //     {
  //       uri: "https://storage.googleapis.com/flip-prod-mktg-strapi/media-library/Indonesian_Foods_80deed788b/Indonesian_Foods_80deed788b.png",
  //       fileType: "jpg",
  //       fileName: "Laporan A",
  //     },
  //   ];
  //   return (
  //     <DocViewer
  //       documents={docs}
  //       pluginRenderers={DocViewerRenderers}
  //       style={{ height: "100vh" }}
  //     />
  //   );
  // }
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
  const [selectedDocs, setSelectedDocs] = useState([]);
  if (modalOpen) {
    return <ModalUpload setModalOpen={setModalOpen} />;
  } else if (viewOpen) {
    return (
      <>
        <div className="flex justify-center items-center h-screen">
          <div className="max-w-lg w-full">
            <button
              onClick={() => setViewOpen(false)}
              className="bg-slate-400 rounded-md w-14 text-white"
            >
              Back
            </button>
            <DocViewer
              documents={docs}
              pluginRenderers={DocViewerRenderers}
              style={{ height: "1000" }}
            />
          </div>
        </div>
      </>
    );
  } else if (!modalOpen || !viewOpen) {
    return (
      <>
        {/* <h6 style={{ color: colorrr }}>iniiiii</h6> */}
        <div className="p-6">
          <Link
            to={"/dashboard"}
            className="inline-block p-1 rounded bg-gray-500/10 text-gray-500 font-medium text-[12px] leading-none"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              x="px"
              y="0px"
              width="24"
              height="24"
              viewBox="0 0 48 48"
            >
              <path d="M 24 4 C 12.972066 4 4 12.972074 4 24 C 4 35.027926 12.972066 44 24 44 C 35.027934 44 44 35.027926 44 24 C 44 12.972074 35.027934 4 24 4 z M 24 7 C 33.406615 7 41 14.593391 41 24 C 41 33.406609 33.406615 41 24 41 C 14.593385 41 7 33.406609 7 24 C 7 14.593391 14.593385 7 24 7 z M 22.470703 16.486328 A 1.50015 1.50015 0 0 0 21.439453 16.939453 L 15.439453 22.939453 A 1.50015 1.50015 0 0 0 15.439453 25.060547 L 21.439453 31.060547 A 1.50015 1.50015 0 1 0 23.560547 28.939453 L 20.121094 25.5 L 31.5 25.5 A 1.50015 1.50015 0 1 0 31.5 22.5 L 20.121094 22.5 L 23.560547 19.060547 A 1.50015 1.50015 0 0 0 22.470703 16.486328 z"></path>
            </svg>
          </Link>
          <div className="grid grid-cols-1 gap-4 sm:mt-2 sm:grid-cols-2 lg:grid-cols-2 gap-6 mb-2">
            <div className="bg-white border border-gray-200 shadow-md shadow-black/5 p-6 rounded-md lg:col-span-2">
              <div className="flex justify-between mb-4 items-start">
                <div className="font-medium">Data Penduduk</div>
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
                        Kecamatan
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
                        <td className="py-2 px-4 border-b border-b-gray-50">
                          <span className="text-[13px] font-medium text-gray-500">
                            Warudoyong
                          </span>
                        </td>
                        <td className="flex gap-2 py-2 px-4 border-b border-b-gray-50">
                          <button
                            onClick={() => {
                              // setColor("yellow")
                              // ViewDoc();
                              setViewOpen(true);
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
                          <button
                            onClick={() => {
                              handleDelete();
                            }}
                            className="inline-block p-1 rounded bg-red-500/10 text-red-500 font-medium text-[12px] leading-none"
                          >
                            Delete
                          </button>
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
