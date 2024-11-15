import { useEffect, useState } from "react";
import DocViewer, { DocViewerRenderers } from "@cyntler/react-doc-viewer";
import "@cyntler/react-doc-viewer/dist/index.css";
import ModalUpload from "./ModalUpload";
import { Link } from "react-router-dom";
import ServerApi from "../helper/ServerApi";

export default function TableLaporan() {
  // const array = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  const [modalOpen, setModalOpen] = useState(false);
  const [viewOpen, setViewOpen] = useState(false);
  const [kk, setKk] = useState([]);
  const getAllKk = async () => {
    const response = await fetch(`${ServerApi}KK`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
      },
    });
    const data = await response.json();
    // console.log(data);
    setKk(data);
  };
  useEffect(() => {
    getAllKk();
  }, []);
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
  // const [selectedDocs, setSelectedDocs] = useState([]);
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
          <div className="grid grid-cols-1 gap-4 sm:mt-2 sm:grid-cols-2 lg:grid-cols-2 mb-2">
            <div className="bg-white border border-gray-200 shadow-md shadow-black/5 p-6 rounded-md lg:col-span-2">
              <div className="flex justify-between mb-4 items-start">
                <div className="font-medium">Data Penduduk</div>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full min-w-[460px]">
                  <thead>
                    <tr>
                      <th className="text-[12px] uppercase tracking-wide font-medium text-gray-400 py-2 px-4 bg-gray-50 text-center rounded-tl-md rounded-bl-md whitespace-normal">
                        No
                      </th>
                      <th className="text-[12px] uppercase tracking-wide font-medium text-gray-400 py-2 px-4 bg-gray-50 text-center rounded-tl-md rounded-bl-md">
                        Nama Lengkap
                      </th>
                      <th className="text-[12px] uppercase tracking-wide font-medium text-gray-400 py-2 px-4 bg-gray-50 text-center">
                        Jenis Kelamin
                      </th>
                      <th className="text-[12px] uppercase tracking-wide font-medium text-gray-400 py-2 px-4 bg-gray-50 text-center rounded-tr-md rounded-br-md">
                        Tempat Lahir
                      </th>
                      <th className="text-[12px] uppercase tracking-wide font-medium text-gray-400 py-2 px-4 bg-gray-50 text-center rounded-tr-md rounded-br-md">
                        Tanggal Lahir
                      </th>
                      <th className="text-[12px] uppercase tracking-wide font-medium text-gray-400 py-2 px-4 bg-gray-50 text-center rounded-tl-md rounded-bl-md">
                        Kartu Keluarga
                      </th>
                      <th className="text-[12px] uppercase tracking-wide font-medium text-gray-400 py-2 px-4 bg-gray-50 text-center">
                        No KK/KTP
                      </th>
                      <th className="text-[12px] uppercase tracking-wide font-medium text-gray-400 py-2 px-4 bg-gray-50 text-center rounded-tr-md rounded-br-md">
                        Status Perkawinan
                      </th>
                      <th className="text-[12px] uppercase tracking-wide font-medium text-gray-400 py-2 px-4 bg-gray-50 text-center rounded-tr-md rounded-br-md">
                        Agama
                      </th>
                      <th className="text-[12px] uppercase tracking-wide font-medium text-gray-400 py-2 px-4 bg-gray-50 text-center rounded-tl-md rounded-bl-md">
                        RT
                      </th>
                      <th className="text-[12px] uppercase tracking-wide font-medium text-gray-400 py-2 px-4 bg-gray-50 text-center">
                        RW
                      </th>
                      <th className="text-[12px] uppercase tracking-wide font-medium text-gray-400 py-2 px-4 bg-gray-50 text-center rounded-tr-md rounded-br-md">
                        Alamat
                      </th>
                      <th className="text-[12px] uppercase tracking-wide font-medium text-gray-400 py-2 px-4 bg-gray-50 text-center rounded-tr-md rounded-br-md">
                        Pendidikan
                      </th>
                      <th className="text-[12px] uppercase tracking-wide font-medium text-gray-400 py-2 px-4 bg-gray-50 text-center rounded-tl-md rounded-bl-md">
                        Pekerjaan
                      </th>
                      <th className="text-[12px] uppercase tracking-wide font-medium text-gray-400 py-2 px-4 bg-gray-50 text-center ">
                        Jumlah Penghasilan dalam Sebulan
                      </th>
                      <th className="text-[12px] uppercase tracking-wide font-medium text-gray-400 py-2 px-4 bg-gray-50 text-center rounded-tr-md rounded-br-md">
                        Dokumen Kependudukan
                      </th>
                      <th className="text-[12px] uppercase tracking-wide font-medium text-gray-400 py-2 px-4 bg-gray-50 text-center rounded-tr-md rounded-br-md">
                        Wanita Usia Subur (WUS) dalam Keluarga
                      </th>
                      <th className="text-[12px] uppercase tracking-wide font-medium text-gray-400 py-2 px-4 bg-gray-50 text-center rounded-tl-md rounded-bl-md">
                        Pasangan Usia Subur (PUS) dalam Keluarga
                      </th>
                      <th className="text-[12px] uppercase tracking-wide font-medium text-gray-400 py-2 px-4 bg-gray-50 text-center">
                        Pus Menjadi Akseptor KB
                      </th>
                      <th className="text-[12px] uppercase tracking-wide font-medium text-gray-400 py-2 px-4 bg-gray-50 text-center rounded-tr-md rounded-br-md">
                        Ibu Hamil dalam Keluarga
                      </th>
                      <th className="text-[12px] uppercase tracking-wide font-medium text-gray-400 py-2 px-4 bg-gray-50 text-center rounded-tr-md rounded-br-md">
                        Ibu Menyusui dalam Keluarga
                      </th>
                      <th className="text-[12px] uppercase tracking-wide font-medium text-gray-400 py-2 px-4 bg-gray-50 text-center rounded-tl-md rounded-bl-md">
                        Ibu Bekerja dalam Keluarga
                      </th>
                      <th className="text-[12px] uppercase tracking-wide font-medium text-gray-400 py-2 px-4 bg-gray-50 text-center">
                        Jumlah Balita dalam Keluarga
                      </th>
                      <th className="text-[12px] uppercase tracking-wide font-medium text-gray-400 py-2 px-4 bg-gray-50 text-center rounded-tr-md rounded-br-md">
                        Bayi Memiliki Berat Badan Lahir Normal
                      </th>
                      <th className="text-[12px] uppercase tracking-wide font-medium text-gray-400 py-2 px-4 bg-gray-50 text-center rounded-tr-md rounded-br-md">
                        Bayi Diberikan Asi Eksklusif
                      </th>
                      <th className="text-[12px] uppercase tracking-wide font-medium text-gray-400 py-2 px-4 bg-gray-50 text-center rounded-tl-md rounded-bl-md">
                        Bayi Diperiksa Setiap Bulan ke Posyandu
                      </th>
                      <th className="text-[12px] uppercase tracking-wide font-medium text-gray-400 py-2 px-4 bg-gray-50 text-center">
                        Bayi Mendapatkan Imunisasi Dasar Lengkap
                      </th>
                      <th className="text-[12px] uppercase tracking-wide font-medium text-gray-400 py-2 px-4 bg-gray-50 text-center rounded-tr-md rounded-br-md">
                        Bayi Memiliki Berat Badan dan Tinggi Badan Normal
                      </th>
                      <th className="text-[12px] uppercase tracking-wide font-medium text-gray-400 py-2 px-4 bg-gray-50 text-center rounded-tr-md rounded-br-md">
                        Riwayat Penyakit dan Keterlambatan Tumbuh Kembang Bayi
                      </th>
                      <th className="text-[12px] uppercase tracking-wide font-medium text-gray-400 py-2 px-4 bg-gray-50 text-center rounded-tl-md rounded-bl-md">
                        Anak Usia Sekolah dalam Keluarga
                      </th>
                      <th className="text-[12px] uppercase tracking-wide font-medium text-gray-400 py-2 px-4 bg-gray-50 text-center">
                        Anak Usia Sekolah yang Tidak Sekolah
                      </th>
                      <th className="text-[12px] uppercase tracking-wide font-medium text-gray-400 py-2 px-4 bg-gray-50 text-center rounded-tr-md rounded-br-md">
                        Anak Yatim/Piatu dalam Keluarga
                      </th>
                      <th className="text-[12px] uppercase tracking-wide font-medium text-gray-400 py-2 px-4 bg-gray-50 text-center rounded-tr-md rounded-br-md">
                        Orang Tua Lanjut Usia (LANSIA)
                      </th>
                      <th className="text-[12px] uppercase tracking-wide font-medium text-gray-400 py-2 px-4 bg-gray-50 text-center rounded-tl-md rounded-bl-md">
                        Anggota Keluarga dengan Difabel
                      </th>
                      <th className="text-[12px] uppercase tracking-wide font-medium text-gray-400 py-2 px-4 bg-gray-50 text-center">
                        Anggota Keluarga dengan Cacat Mental
                      </th>
                      <th className="text-[12px] uppercase tracking-wide font-medium text-gray-400 py-2 px-4 bg-gray-50 text-center rounded-tr-md rounded-br-md">
                        Anggota Keluarga Sakit yang Tidak Mendapatkan Pengobatan
                      </th>
                      <th className="text-[12px] uppercase tracking-wide font-medium text-gray-400 py-2 px-4 bg-gray-50 text-center rounded-tr-md rounded-br-md">
                        Penerimaan Manfaat/Bantuan Pemerintah
                      </th>
                      <th className="text-[12px] uppercase tracking-wide font-medium text-gray-400 py-2 px-4 bg-gray-50 text-center rounded-tl-md rounded-bl-md">
                        Anggota Keluarga yang Merokok
                      </th>
                      <th className="text-[12px] uppercase tracking-wide font-medium text-gray-400 py-2 px-4 bg-gray-50 text-center">
                        Sumber Sarana Air Bersih
                      </th>
                      <th className="text-[12px] uppercase tracking-wide font-medium text-gray-400 py-2 px-4 bg-gray-50 text-center rounded-tr-md rounded-br-md">
                        Memiliki Jamban Keluarga
                      </th>
                      <th className="text-[12px] uppercase tracking-wide font-medium text-gray-400 py-2 px-4 bg-gray-50 text-center rounded-tr-md rounded-br-md">
                        Memiliki SepticTank
                      </th>
                      <th className="text-[12px] uppercase tracking-wide font-medium text-gray-400 py-2 px-4 bg-gray-50 text-center rounded-tl-md rounded-bl-md">
                        Memiliki Tempat Pembuangan Sampah
                      </th>
                      <th className="text-[12px] uppercase tracking-wide font-medium text-gray-400 py-2 px-4 bg-gray-50 text-center">
                        Kriteria Rumah
                      </th>
                      <th className="text-[12px] uppercase tracking-wide font-medium text-gray-400 py-2 px-4 bg-gray-50 text-center rounded-tr-md rounded-br-md">
                        Status Kepemilikan Rumah
                      </th>
                      <th className="text-[12px] uppercase tracking-wide font-medium text-gray-400 py-2 px-4 bg-gray-50 text-center rounded-tr-md rounded-br-md">
                        Mengikuti Aktivitas Keagamaan di Lingkungan Sekitar
                      </th>
                      <th className="text-[12px] uppercase tracking-wide font-medium text-gray-400 py-2 px-4 bg-gray-50 text-center rounded-tl-md rounded-bl-md">
                        Memiliki Usaha Peningkatan Pendapatan Keluarga (UP2K)
                        atau UMKM
                      </th>
                      <th className="text-[12px] uppercase tracking-wide font-medium text-gray-400 py-2 px-4 bg-gray-50 text-center">
                        Memiliki Tanaman Obat Keluarga (TOGA)
                      </th>
                      <th className="text-[12px] uppercase tracking-wide font-medium text-gray-400 py-2 px-4 bg-gray-50 text-center rounded-tr-md rounded-br-md">
                        Jumlah Pengeluaran dalam Satu Bulan
                      </th>
                      <th className="text-[12px] uppercase tracking-wide font-medium text-gray-400 py-2 px-4 bg-gray-50 text-center rounded-tr-md rounded-br-md">
                        Keterangan
                      </th>
                      <th className="text-[12px] uppercase tracking-wide font-medium text-gray-400 py-2 px-4 bg-gray-50 text-center rounded-tr-md rounded-br-md">
                        actions
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {kk.map((item, index) => (
                      <tr key={index}>
                        <td className="py-2 px-4 border-b border-b-gray-50">
                          <span className="text-[13px] font-medium text-cyan-500">
                            {index + 1}
                          </span>
                        </td>
                        <td className="py-2 px-4 border-b border-b-gray-50">
                          <div className="flex items-center">
                            <a
                              href="#"
                              className="text-gray-600 text-sm font-medium hover:text-blue-500 ml-2 truncate text-center" 
                            >
                              {item.namaLengkap}
                            </a>
                          </div>
                        </td>
                        <td className="py-2 px-4 border-b border-b-gray-50">
                          <span className="text-[13px] font-medium text-cyan-500 text-center">
                            {item.jenisKelamin}
                          </span>
                        </td>
                        <td className="py-2 px-4 border-b border-b-gray-50 text-center">
                          <span className="text-[13px] font-medium text-gray-500">
                            {item.tempatLahir}
                          </span>
                        </td>
                        <td className="py-2 px-4 border-b border-b-gray-50 text-center">
                          <span className="text-[13px] font-medium text-cyan-500">
                            {item.tanggalLahir}
                          </span>
                        </td>
                        <td className="py-2 px-4 border-b border-b-gray-50 text-center">
                          <span className="text-[13px] font-medium text-gray-500">
                            {item.kartuKeluarga}
                          </span>
                        </td>
                        <td className="py-2 px-4 border-b border-b-gray-50 text-center">
                          <span className="text-[13px] font-medium text-cyan-500">
                            {item.noKKKTP}
                          </span>
                        </td>
                        <td className="py-2 px-4 border-b border-b-gray-50 text-center">
                          <span className="text-[13px] font-medium text-gray-500">
                            {item.statusPerkawinan}
                          </span>
                        </td>
                        <td className="py-2 px-4 border-b border-b-gray-50 text-center">
                          <span className="text-[13px] font-medium text-cyan-500">
                            {/* {item.RT.nomor} */}
                          </span>
                        </td>
                        <td className="py-2 px-4 border-b border-b-gray-50 text-center">
                          <span className="text-[13px] font-medium text-gray-500">
                            {/* {item.RW.nomor} */}
                          </span>
                        </td>
                        <td className="py-2 px-4 border-b border-b-gray-50 text-center">
                          <span className="text-[13px] font-medium text-cyan-500">
                            {item.alamat}
                          </span>
                        </td>
                        <td className="py-2 px-4 border-b border-b-gray-50 text-center">
                          <span className="text-[13px] font-medium text-gray-500">
                            {item.pendidikan}
                          </span>
                        </td>
                        <td className="py-2 px-4 border-b border-b-gray-50 text-center">
                          <span className="text-[13px] font-medium text-cyan-500">
                            {item.pekerjaan}
                          </span>
                        </td>
                        <td className="py-2 px-4 border-b border-b-gray-50 text-center">
                          <span className="text-[13px] font-medium text-gray-500">
                            {item.penghasilanSebulan}
                          </span>
                        </td>
                        <td className="py-2 px-4 border-b border-b-gray-50 text-center">
                          <span className="text-[13px] font-medium text-cyan-500">
                            {item.dokumenKependudukan}
                          </span>
                        </td>
                        <td className="py-2 px-4 border-b border-b-gray-50 text-center">
                          <span className="text-[13px] font-medium text-gray-500">
                            {item.wusKeluarga}
                          </span>
                        </td>
                        <td className="py-2 px-4 border-b border-b-gray-50 text-center">
                          <span className="text-[13px] font-medium text-cyan-500">
                            {item.pusKeluarga}
                          </span>
                        </td>
                        <td className="py-2 px-4 border-b border-b-gray-50 text-center">
                          <span className="text-[13px] font-medium text-gray-500">
                            {item.pusKB}
                          </span>
                        </td>
                        <td className="py-2 px-4 border-b border-b-gray-50 text-center">
                          <span className="text-[13px] font-medium text-cyan-500">
                            {item.ibuHamilKeluarga}
                          </span>
                        </td>
                        <td className="py-2 px-4 border-b border-b-gray-50 text-center">
                          <span className="text-[13px] font-medium text-gray-500">
                            {item.ibuMenyusuiKeluarga}
                          </span>
                        </td>
                        <td className="py-2 px-4 border-b border-b-gray-50 text-center">
                          <span className="text-[13px] font-medium text-cyan-500">
                            {item.ibuBekerjaKeluarga}
                          </span>
                        </td>
                        <td className="py-2 px-4 border-b border-b-gray-50 text-center">
                          <span className="text-[13px] font-medium text-gray-500">
                            {item.balitaKeluarga}
                          </span>
                        </td>
                        <td className="py-2 px-4 border-b border-b-gray-50 text-center">
                          <span className="text-[13px] font-medium text-cyan-500">
                            {item.bbBayiNormal}
                          </span>
                        </td>
                        <td className="py-2 px-4 border-b border-b-gray-50 text-center">
                          <span className="text-[13px] font-medium text-gray-500">
                            {item.asiBayiEkslusif}
                          </span>
                        </td>
                        <td className="py-2 px-4 border-b border-b-gray-50 text-center">
                          <span className="text-[13px] font-medium text-cyan-500">
                            {item.bayiPosyandu}
                          </span>
                        </td>
                        <td className="py-2 px-4 border-b border-b-gray-50 text-center">
                          <span className="text-[13px] font-medium text-gray-500">
                            {item.bayiImunisasi}
                          </span>
                        </td>
                        <td className="py-2 px-4 border-b border-b-gray-50 text-center">
                          <span className="text-[13px] font-medium text-cyan-500">
                            {item.bbTbBayiNormal}
                          </span>
                        </td>
                        <td className="py-2 px-4 border-b border-b-gray-50 text-center">
                          <span className="text-[13px] font-medium text-gray-500">
                            {item.riwayatPenyakitBayi}
                          </span>
                        </td>
                        <td className="py-2 px-4 border-b border-b-gray-50 text-center">
                          <span className="text-[13px] font-medium text-cyan-500">
                            {item.anakSekolah}
                          </span>
                        </td>
                        <td className="py-2 px-4 border-b border-b-gray-50 text-center">
                          <span className="text-[13px] font-medium text-gray-500">
                            {item.anakTidakSekolah}
                          </span>
                        </td>
                        <td className="py-2 px-4 border-b border-b-gray-50 text-center">
                          <span className="text-[13px] font-medium text-cyan-500">
                            {item.anakYatimPiatu}
                          </span>
                        </td>
                        <td className="py-2 px-4 border-b border-b-gray-50 text-center">
                          <span className="text-[13px] font-medium text-gray-500">
                            {item.lansia}
                          </span>
                        </td>
                        <td className="py-2 px-4 border-b border-b-gray-50 text-center">
                          <span className="text-[13px] font-medium text-cyan-500">
                            {item.keluargaDifabel}
                          </span>
                        </td>
                        <td className="py-2 px-4 border-b border-b-gray-50 text-center">
                          <span className="text-[13px] font-medium text-gray-500">
                            {item.keluargaCacatMental}
                          </span>
                        </td>
                        <td className="py-2 px-4 border-b border-b-gray-50 text-center">
                          <span className="text-[13px] font-medium text-cyan-500">
                            {item.keluargaTidakMendapatkanPengobatan}
                          </span>
                        </td>
                        <td className="py-2 px-4 border-b border-b-gray-50 text-center">
                          <span className="text-[13px] font-medium text-gray-500">
                            {item.bantuanPemerintah}
                          </span>
                        </td>
                        <td className="py-2 px-4 border-b border-b-gray-50 text-center">
                          <span className="text-[13px] font-medium text-cyan-500">
                            {item.keluargaMerokok}
                          </span>
                        </td>
                        <td className="py-2 px-4 border-b border-b-gray-50 text-center">
                          <span className="text-[13px] font-medium text-gray-500">
                            {item.saranaAirBersih}
                          </span>
                        </td>
                        <td className="py-2 px-4 border-b border-b-gray-50 text-center">
                          <span className="text-[13px] font-medium text-cyan-500">
                            {item.jambanKeluarga}
                          </span>
                        </td>
                        <td className="py-2 px-4 border-b border-b-gray-50 text-center">
                          <span className="text-[13px] font-medium text-gray-500">
                            {item.septicTank}
                          </span>
                        </td>
                        <td className="py-2 px-4 border-b border-b-gray-50 text-center">
                          <span className="text-[13px] font-medium text-cyan-500">
                            {item.pembuanganSampah}
                          </span>
                        </td>
                        <td className="py-2 px-4 border-b border-b-gray-50 text-center">
                          <span className="text-[13px] font-medium text-gray-500">
                            {item.kriteriaRumah}
                          </span>
                        </td>
                        <td className="py-2 px-4 border-b border-b-gray-50 text-center">
                          <span className="text-[13px] font-medium text-cyan-500">
                            {item.statusRumah}
                          </span>
                        </td>
                        <td className="py-2 px-4 border-b border-b-gray-50 text-center">
                          <span className="text-[13px] font-medium text-gray-500">
                            {item.aktivitasKeagamaan}
                          </span>
                        </td>
                        <td className="py-2 px-4 border-b border-b-gray-50 text-center">
                          <span className="text-[13px] font-medium text-cyan-500">
                            {item.aktivitasSosial}
                          </span>
                        </td>
                        <td className="py-2 px-4 border-b border-b-gray-50 text-center">
                          <span className="text-[13px] font-medium text-gray-500">
                            {item.memilikiToga}
                          </span>
                        </td><td className="py-2 px-4 border-b border-b-gr text-centeray-50">
                          <span className="text-[13px] font-medium text-cyan-500">
                            {item.jenisUsaha}
                          </span>
                        </td>
                        <td className="py-2 px-4 border-b border-b-gray-50 text-center">
                          <span className="text-[13px] font-medium text-gray-500">
                            {item.pengeluaranBulanan}
                          </span>
                        </td>
                        <td className="py-2 px-4 border-b border-b-gray-50 text-center">
                          <span className="text-[13px] font-medium text-gray-500">
                            {item.keterangan}
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
