import { useEffect, useState } from "react";
import DocViewer, { DocViewerRenderers } from "@cyntler/react-doc-viewer";
import "@cyntler/react-doc-viewer/dist/index.css";
import ModalUpload from "./ModalUpload";
import { Link, useNavigate } from "react-router-dom";
import ServerApi from "../helper/ServerApi";
import { formatDate } from "../helper/formatDate";
import Swal from "sweetalert2";

export default function TableLaporan() {
  // const array = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  // const [fileName, setFileName] = useState("");
  // const [docs, setDocs] = useState({});
  const [idKK, setIdKK] = useState("");
  const [viewOpen, setViewOpen] = useState(false);
  const [kk, setKk] = useState([]);
  const [filter, setFilter] = useState({
    filterKelurahan: "",
    filterGender: "",
    filterStatusPerkawinan: "",
    filterAgama: "",
    filterRT: "",
    filterRW: "",
    filterPendidikan: "",
    filterPekerjaan: "",
    filterPenghasilan: "",
    filterDokumen: "",
    filterWus: "",
    filterPus: "",
    filterPusKB: "",
    filterIbuHamil: "",
    filterIbuMenyusui: "",
    filterIbuBekerja: "",
    filterBalita: "",
    filterBbBayi: "",
    filterAsiBayi: "",
    filterBayiPosyandu: "",
    filterBayiImunisasi: "",
    filterBbTbBayi: "",
    filterAnakSekolah: "",
    filterAnakTidakSekolah: "",
    filterAnakYatimPiatu: "",
    filterLansia: "",
    filterDifabel: "",
    filterCacatMental: "",
    filterTidakPengobatan: "",
    filterBantuanPemerintah: "",
    filterMerokok: "",
    filterAirBersih: "",
    filterJamban: "",
    filterSeptictank: "",
    filterPembuanganSampah: "",
    filterKriteriaRumah: "",
    filterStatusRumah: "",
    filterKeagamaan: "",
    filterSosial: "",
    filterToga: "",
    searchByNama: "",
  });
  const rolee = localStorage.getItem("role");

  const getAllKk = async () => {
    const params = new URLSearchParams(filter).toString();
    setIsLoading(true);
    const response = await fetch(`${ServerApi}KK?${params}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
      },
    });
    const data = await response.json();
    // console.log(data);
    setKk(data);
    setIsLoading(false);
  };
  useEffect(() => {
    getAllKk();
  }, [filter]);
  const handleDelete = async (id) => {
    return Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const response = await fetch(`${ServerApi}KK/${id}`, {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        });
        const data = await response.json();

        if (!response.ok) {
          return Swal.fire({
            title: "Error!",
            text: data.message,
            icon: "error",
          });
        }

        Swal.fire({
          title: "Deleted!",
          text: data.message,
          icon: "success",
        });
        navigate("/dashboard");
      }
    });
  };

  const handleFilterChange = (event) => {
    const { name, value } = event.target;
    setFilter((prevFilter) => ({
      ...prevFilter,
      [name]: value,
    }));
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
  // const getFile = async (fileName) => {
  //   try {
  //     setDocs({
  //       uri: `${ServerApi}uploads/${fileName}`,
  //       fileType: "pdf",
  //       mimeType: "application/pdf",
  //     });
  //     // console.log(fileName,"ini filenameee")
  //     // const res =
  //     // // await fetch(`${ServerApi}uploads/${fileName}`, {
  //     // //   method: "GET",
  //     // //   headers: {
  //     // //     Authorization: `Bearer ${localStorage.getItem("access_token")}`,
  //     // //   },
  //     // // });
  //     // await fetch(`${ServerApi}uploads/${fileName}`,{
  //     //   method: "GET",
  //     //   headers: {
  //     //     Authorization: `Bearer ${localStorage.getItem("access_token")}`,
  //     //   },
  //     // })
  //     // .then(res => res.json())
  //     // .then(data => {
  //     //   setDocs([data]); // react-doc-viewer expects an array of documents
  //     // });
  //     // console.log(res,"ini res filee")
  //     // const data = await res.json();
  //     // console.log(data,"ini data filee")
  //     // setDocs(data)
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };
  // const [selectedDocs, setSelectedDocs] = useState([]);
  if (modalOpen) {
    return (
      <ModalUpload setModalOpen={setModalOpen} id={idKK} getkk={getAllKk} />
    );
  } else if (isLoading) {
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
  } else if (viewOpen) {
    // getFile()
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
        <div className="min-h-screen bg-gray-50">
          <div className="p-4 lg:p-6">
            <div className="mb-4">
              <Link
                to="/dashboard"
                className="inline-flex items-center gap-2 rounded-lg bg-gray-100 p-2 text-gray-600 hover:bg-gray-200"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 48 48"
                  className="fill-current"
                >
                  <path d="M24 4C12.972 4 4 12.972 4 24s8.972 20 20 20 20-8.972 20-20S35.028 4 24 4zm0 3c9.407 0 17 7.593 17 17s-7.593 17-17 17S7 33.407 7 24 14.593 7 24 7zm-1.529 9.486a1.5 1.5 0 00-1.032.453l-6 6a1.5 1.5 0 000 2.122l6 6a1.5 1.5 0 102.122-2.122L20.12 25.5H31.5a1.5 1.5 0 100-3H20.12l3.44-3.44a1.5 1.5 0 00-1.089-2.574z" />
                </svg>
                <span className="hidden sm:inline">Back</span>
              </Link>
            </div>
            <div className="w-full p-4">
              <div className="bg-white border border-gray-200 shadow-md shadow-black/5 p-4 rounded-md">
                <div className="flex justify-between mb-4 items-start">
                  <div className="font-medium">Data Penduduk</div>
                </div>

                {/* Table container with horizontal scroll for small screens */}
                <div className="overflow-x-auto">
                  <table className="w-full table-auto">
                    <thead>
                      <tr>
                        <th className="text-xs uppercase tracking-wide font-medium text-gray-400 py-3 px-4 bg-gray-50 text-left whitespace-nowrap">
                          No
                        </th>
                        <th className="text-xs uppercase tracking-wide font-medium text-gray-400 py-3 px-4 bg-gray-50 text-left whitespace-nowrap">
                          Nama Lengkap
                        </th>
                        <th className="text-[12px] uppercase tracking-wide font-medium text-gray-400 py-2 px-4 bg-gray-50 text-left">
                          Jenis Kelamin
                          <select
                            name="filterGender"
                            value={filter.filterGender}
                            onChange={handleFilterChange}
                          >
                            <option value="">Semua</option>
                            <option value="LAKI-LAKI">Laki-laki</option>
                            <option value="PEREMPUAN">Perempuan</option>
                          </select>
                        </th>
                        {rolee !== "rw" && (
                          <>
                            <th
                              className={`text-[12px] uppercase tracking-wide font-medium text-gray-400 py-2 px-4 bg-gray-50 text-left rounded-tr-md rounded-br-md`}
                            >
                              Tempat Lahir
                            </th>
                            <th className="text-[12px] uppercase tracking-wide font-medium text-gray-400 py-2 px-4 bg-gray-50 text-left rounded-tr-md rounded-br-md">
                              Tanggal Lahir
                            </th>
                            <th className="text-[12px] uppercase tracking-wide font-medium text-gray-400 py-2 px-4 bg-gray-50 text-left rounded-tl-md rounded-bl-md">
                              Kartu Keluarga
                            </th>
                          </>
                        )}
                        <th className="text-[12px] uppercase tracking-wide font-medium text-gray-400 py-2 px-4 bg-gray-50 text-left">
                          No KK/KTP
                        </th>
                        {rolee !== "rw" && (
                          <>
                            <th className="text-[12px] uppercase tracking-wide font-medium text-gray-400 py-2 px-4 bg-gray-50 text-left rounded-tr-md rounded-br-md">
                              Status Perkawinan
                              <select
                                name="filterStatusPerkawinan"
                                value={filter.filterStatusPerkawinan}
                                onChange={handleFilterChange}
                              >
                                <option value="">Semua</option>
                                <option value="NIKAH TERCATAT">
                                  Nikah Tercatat
                                </option>
                                <option value="NIKAH TIDAK TERCATAT">
                                  Nikah Tidak Tercatat
                                </option>
                                <option value="CERAI HIDUP">Cerai Hidup</option>
                                <option value="CERAI MATI">Cerai Mati</option>
                                <option value="LAJANG">Lajang</option>
                              </select>
                            </th>
                          </>
                        )}
                        <th className="text-[12px] uppercase tracking-wide font-medium text-gray-400 py-2 px-4 bg-gray-50 text-left rounded-tr-md rounded-br-md">
                          Agama
                          <select
                            name="filterAgama"
                            value={filter.filterAgama}
                            onChange={handleFilterChange}
                          >
                            <option value="">Semua</option>
                            <option value="ISLAM">Islam</option>
                            <option value="KRISTEN">Kristen</option>
                            <option value="KATOLIK">Katolik</option>
                            <option value="HINDU">Hindu</option>
                            <option value="BUDDHA">Buddha</option>
                            <option value="KONGHUCHU">Konghuchu</option>
                          </select>
                        </th>
                        {rolee !== "rw" && (
                          <>
                            <th className="text-[12px] uppercase tracking-wide font-medium text-gray-400 py-2 px-4 bg-gray-50 text-left rounded-tl-md rounded-bl-md">
                              RT
                              <select
                                name="filterRT"
                                value={filter.filterRT}
                                onChange={handleFilterChange}
                              >
                                <option value="">Semua</option>
                                <option value="001">001</option>
                                <option value="002">002</option>
                                <option value="003">003</option>
                                <option value="004">004</option>
                                <option value="005">005</option>
                                <option value="006">006</option>
                                <option value="007">007</option>
                              </select>
                            </th>
                            <th className="text-[12px] uppercase tracking-wide font-medium text-gray-400 py-2 px-4 bg-gray-50 text-left">
                              RW
                              <select
                                name="filterRW"
                                value={filter.filterRW}
                                onChange={handleFilterChange}
                              >
                                <option value="">Semua</option>
                                <option value="001">001</option>
                                <option value="002">002</option>
                                <option value="003">003</option>
                                <option value="004">004</option>
                                <option value="005">005</option>
                              </select>
                            </th>
                          </>
                        )}
                        <th className="text-[12px] uppercase tracking-wide font-medium text-gray-400 py-2 px-4 bg-gray-50 text-left rounded-tr-md rounded-br-md">
                          Alamat
                        </th>
                        <th className="text-[12px] uppercase tracking-wide font-medium text-gray-400 py-2 px-4 bg-gray-50 text-left rounded-tr-md rounded-br-md">
                          Pendidikan
                          <select
                            name="filterPendidikan"
                            value={filter.filterPendidikan}
                            onChange={handleFilterChange}
                          >
                            <option value="">Semua</option>
                            <option value="TIDAK TAMAT SD">
                              Tidak Tamat SD
                            </option>
                            <option value="SD/MI">SD/MI</option>
                            <option value="SMP">SMP</option>
                            <option value="SMA">SMA</option>
                            <option value="DIII/SARJANA">DIII/Sarjana</option>
                            <option value="S2/Magister">S2/Magister</option>
                          </select>
                        </th>
                        <th className="text-[12px] uppercase tracking-wide font-medium text-gray-400 py-2 px-4 bg-gray-50 text-left rounded-tl-md rounded-bl-md">
                          Pekerjaan
                          <select
                            name="filterPekerjaan"
                            value={filter.filterPekerjaan}
                            onChange={handleFilterChange}
                          >
                            <option value="">Semua</option>
                            <option value="PNS/TNI/POLRI">PNS/TNI/POLRI</option>
                            <option value="KARYAWAN SWASTA">
                              Karyawan Swasta{" "}
                            </option>
                            <option value="WIRASWASTA">Wiraswasta</option>
                            <option value="BURUH">Buruh</option>
                            <option value="TIDAK BEKERJA">Tidak Bekerja</option>
                            <option value="TENAGA HONORER/THL/TKS">
                              Tenaga Honorer/THL/TKS
                            </option>
                            <option value="PENSIUNAN">Pensiunan</option>
                          </select>
                        </th>
                        {rolee !== "rw" && (
                          <>
                            <th className="text-[12px] uppercase tracking-wide font-medium text-gray-400 py-2 px-4 bg-gray-50 text-left ">
                              Jumlah Penghasilan dalam Sebulan
                              <select
                                name="filterPenghasilan"
                                value={filter.filterPenghasilan}
                                onChange={handleFilterChange}
                              >
                                <option value="">Semua</option>
                                <option value="600.000 SD DIBAWAH 2.836.398">
                                  600.000 sd Dibawah 2.836.398
                                </option>
                                <option value="DIATAS ATAU SAMA DENGAN RP.2.836.398">
                                  Diatas atau sama dengan Rp.2.836.398{" "}
                                </option>
                                <option value="DIBAWAH 600.000">
                                  Dibawah 600.000
                                </option>
                              </select>
                            </th>
                            <th className="text-[12px] uppercase tracking-wide font-medium text-gray-400 py-2 px-4 bg-gray-50 text-left rounded-tr-md rounded-br-md">
                              Dokumen Kependudukan
                              <select
                                name="filterDokumen"
                                value={filter.filterDokumen}
                                onChange={handleFilterChange}
                              >
                                <option value="">Semua</option>
                                <option value="LENGKAP">Lengkap</option>
                                <option value="BELUM LENGKAP">
                                  Belum Lengkap{" "}
                                </option>
                              </select>
                            </th>
                            <th className="text-[12px] uppercase tracking-wide font-medium text-gray-400 py-2 px-4 bg-gray-50 text-left rounded-tr-md rounded-br-md">
                              Wanita Usia Subur (WUS) dalam Keluarga
                              <select
                                name="filterWus"
                                value={filter.filterWus}
                                onChange={handleFilterChange}
                              >
                                <option value="">Semua</option>
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="LEBIH DARI 2">
                                  Lebih dari 2
                                </option>
                                <option value="TIDAK ADA">Tidak ada WUS</option>
                              </select>
                            </th>
                            <th className="text-[12px] uppercase tracking-wide font-medium text-gray-400 py-2 px-4 bg-gray-50 text-left rounded-tl-md rounded-bl-md">
                              Pasangan Usia Subur (PUS) dalam Keluarga
                              <select
                                name="filterPus"
                                value={filter.filterPus}
                                onChange={handleFilterChange}
                              >
                                <option value="">Semua</option>
                                <option value="YA">Ya</option>
                                <option value="TIDAK">Tidak</option>
                              </select>
                            </th>
                            <th className="text-[12px] uppercase tracking-wide font-medium text-gray-400 py-2 px-4 bg-gray-50 text-left">
                              Pus Menjadi Akseptor KB
                              <select
                                name="filterPusKB"
                                value={filter.filterPusKB}
                                onChange={handleFilterChange}
                              >
                                <option value="">Semua</option>
                                <option value="SUAMI">Suami</option>
                                <option value="ISTRI">Istri</option>
                                <option value="-">
                                  Tidak menjadi Akseptor KB
                                </option>
                              </select>
                            </th>
                            <th className="text-[12px] uppercase tracking-wide font-medium text-gray-400 py-2 px-4 bg-gray-50 text-left rounded-tr-md rounded-br-md">
                              Ibu Hamil dalam Keluarga
                              <select
                                name="filterIbuHamil"
                                value={filter.filterIbuHamil}
                                onChange={handleFilterChange}
                              >
                                <option value="">Semua</option>
                                <option value="YA">Ya</option>
                                <option value="TIDAK ADA">Tidak ada</option>
                              </select>
                            </th>
                            <th className="text-[12px] uppercase tracking-wide font-medium text-gray-400 py-2 px-4 bg-gray-50 text-left rounded-tr-md rounded-br-md">
                              Ibu Menyusui dalam Keluarga
                              <select
                                name="filterIbuMenyusui"
                                value={filter.filterIbuMenyusui}
                                onChange={handleFilterChange}
                              >
                                <option value="">Semua</option>
                                <option value="YA">Ya</option>
                                <option value="TIDAK ADA">Tidak ada</option>
                              </select>
                            </th>
                            <th className="text-[12px] uppercase tracking-wide font-medium text-gray-400 py-2 px-4 bg-gray-50 text-left rounded-tl-md rounded-bl-md">
                              Ibu Bekerja dalam Keluarga
                              <select
                                name="filterIbuBekerja"
                                value={filter.filterIbuBekerja}
                                onChange={handleFilterChange}
                              >
                                <option value="">Semua</option>
                                <option value="ADA">Ada</option>
                                <option value="TIDAK ADA">Tidak ada</option>
                              </select>
                            </th>
                            <th className="text-[12px] uppercase tracking-wide font-medium text-gray-400 py-2 px-4 bg-gray-50 text-left">
                              Jumlah Balita dalam Keluarga
                              <select
                                name="filterBalita"
                                value={filter.filterBalita}
                                onChange={handleFilterChange}
                              >
                                <option value="">Semua</option>
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="LEBIH DARI 2">
                                  Lebih dari 2
                                </option>
                                <option value="TIDAK ADA BALITA">
                                  Tidak ada Balita
                                </option>
                              </select>
                            </th>
                            <th className="text-[12px] uppercase tracking-wide font-medium text-gray-400 py-2 px-4 bg-gray-50 text-left rounded-tr-md rounded-br-md">
                              Bayi Memiliki Berat Badan Lahir Normal
                              <select
                                name="filterBbBayi"
                                value={filter.filterBbBayi}
                                onChange={handleFilterChange}
                              >
                                <option value="">Semua</option>
                                <option value="YA">Ya</option>
                                <option value="TIDAK ADA">Tidak ada</option>
                                <option value="TIDAK ADA BALITA">
                                  Tidak ada Balita
                                </option>
                              </select>
                            </th>
                            <th className="text-[12px] uppercase tracking-wide font-medium text-gray-400 py-2 px-4 bg-gray-50 text-left rounded-tr-md rounded-br-md">
                              Bayi Diberikan Asi Eksklusif
                              <select
                                name="filterAsiBayi"
                                value={filter.filterAsiBayi}
                                onChange={handleFilterChange}
                              >
                                <option value="">Semua</option>
                                <option value="YA">Ya</option>
                                <option value="TIDAK ADA">Tidak ada</option>
                                <option value="TIDAK ADA BALITA">
                                  Tidak ada Balita
                                </option>
                              </select>
                            </th>
                            <th className="text-[12px] uppercase tracking-wide font-medium text-gray-400 py-2 px-4 bg-gray-50 text-left rounded-tl-md rounded-bl-md">
                              Bayi Diperiksa Setiap Bulan ke Posyandu
                              <select
                                name="filterBayiPosyandu"
                                value={filter.filterBayiPosyandu}
                                onChange={handleFilterChange}
                              >
                                <option value="">Semua</option>
                                <option value="YA">Ya</option>
                                <option value="TIDAK ADA">Tidak ada</option>
                                <option value="TIDAK ADA BALITA">
                                  Tidak ada Balita
                                </option>
                              </select>
                            </th>
                            <th className="text-[12px] uppercase tracking-wide font-medium text-gray-400 py-2 px-4 bg-gray-50 text-left">
                              Bayi Mendapatkan Imunisasi Dasar Lengkap
                              <select
                                name="filterBayiImunisasi"
                                value={filter.filterBayiImunisasi}
                                onChange={handleFilterChange}
                              >
                                <option value="">Semua</option>
                                <option value="YA">Ya</option>
                                <option value="TIDAK ADA">Tidak ada</option>
                                <option value="TIDAK ADA BALITA">
                                  Tidak ada Balita
                                </option>
                              </select>
                            </th>
                            <th className="text-[12px] uppercase tracking-wide font-medium text-gray-400 py-2 px-4 bg-gray-50 text-left rounded-tr-md rounded-br-md">
                              Bayi Memiliki Berat Badan dan Tinggi Badan Normal
                              <select
                                name="filterBbTbBayi"
                                value={filter.filterBbTbBayi}
                                onChange={handleFilterChange}
                              >
                                <option value="">Semua</option>
                                <option value="YA">Ya</option>
                                <option value="TIDAK ADA">Tidak ada</option>
                                <option value="TIDAK ADA BALITA">
                                  Tidak ada Balita
                                </option>
                              </select>
                            </th>
                            <th className="text-[12px] uppercase tracking-wide font-medium text-gray-400 py-2 px-4 bg-gray-50 text-left rounded-tr-md rounded-br-md">
                              Riwayat Penyakit dan Keterlambatan Tumbuh Kembang
                              Bayi
                            </th>
                            <th className="text-[12px] uppercase tracking-wide font-medium text-gray-400 py-2 px-4 bg-gray-50 text-left rounded-tl-md rounded-bl-md">
                              Anak Usia Sekolah dalam Keluarga
                              <select
                                name="filterAnakSekolah"
                                value={filter.filterAnakSekolah}
                                onChange={handleFilterChange}
                              >
                                <option value="">Semua</option>
                                <option value="TK/PAUD">TK/PAUD</option>
                                <option value="SD">SD</option>
                                <option value="SMP">SMP</option>
                                <option value="SMA">SMA</option>
                                <option value="TIDAK ADA ANAK USIA SEKOLAH">
                                  Tidak ada anak usia sekolah
                                </option>
                              </select>
                            </th>
                            <th className="text-[12px] uppercase tracking-wide font-medium text-gray-400 py-2 px-4 bg-gray-50 text-left">
                              Anak Usia Sekolah yang Tidak Sekolah
                              <select
                                name="filterAnakTidakSekolah"
                                value={filter.filterAnakTidakSekolah}
                                onChange={handleFilterChange}
                              >
                                <option value="">Semua</option>
                                <option value="TK/PAUD">TK/PAUD</option>
                                <option value="SD">SD</option>
                                <option value="SMP">SMP</option>
                                <option value="SMA">SMA</option>
                                <option value="TIDAK ADA ANAK USIA SEKOLAH YANG TIDAK SEKOLAH">
                                  Tidak ada anak usia sekolah yang tidak sekolah
                                </option>
                              </select>
                            </th>
                            <th className="text-[12px] uppercase tracking-wide font-medium text-gray-400 py-2 px-4 bg-gray-50 text-left rounded-tr-md rounded-br-md">
                              Anak Yatim/Piatu dalam Keluarga
                              <select
                                name="filterAnakYatimPiatu"
                                value={filter.filterAnakYatimPiatu}
                                onChange={handleFilterChange}
                              >
                                <option value="">Semua</option>
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="LEBIH DARI 2">
                                  Lebih dari 2
                                </option>
                                <option value="TIDAK ADA ANAK YATIM/PIATU">
                                  Tidak ada anak yatim/piatu
                                </option>
                              </select>
                            </th>
                            <th className="text-[12px] uppercase tracking-wide font-medium text-gray-400 py-2 px-4 bg-gray-50 text-left rounded-tr-md rounded-br-md">
                              Orang Tua Lanjut Usia (LANSIA)
                              <select
                                name="filterLansia"
                                value={filter.filterLansia}
                                onChange={handleFilterChange}
                              >
                                <option value="">Semua</option>
                                <option value="ADA">Ada</option>
                                <option value="TIDAK ADA">Tidak ada</option>
                              </select>
                            </th>
                            <th className="text-[12px] uppercase tracking-wide font-medium text-gray-400 py-2 px-4 bg-gray-50 text-left rounded-tl-md rounded-bl-md">
                              Anggota Keluarga dengan Difabel
                              <select
                                name="filterDifabel"
                                value={filter.filterDifabel}
                                onChange={handleFilterChange}
                              >
                                <option value="">Semua</option>
                                <option value="ADA">Ada</option>
                                <option value="TIDAK ADA">Tidak ada</option>
                              </select>
                            </th>
                            <th className="text-[12px] uppercase tracking-wide font-medium text-gray-400 py-2 px-4 bg-gray-50 text-left">
                              Anggota Keluarga dengan Cacat Mental
                              <select
                                name="filterCacatMental"
                                value={filter.filterCacatMental}
                                onChange={handleFilterChange}
                              >
                                <option value="">Semua</option>
                                <option value="ADA">Ada</option>
                                <option value="TIDAK ADA">Tidak ada</option>
                              </select>
                            </th>
                            <th className="text-[12px] uppercase tracking-wide font-medium text-gray-400 py-2 px-4 bg-gray-50 text-left rounded-tr-md rounded-br-md">
                              Anggota Keluarga Sakit yang Tidak Mendapatkan
                              Pengobatan
                              <select
                                name="filterTidakPengobatan"
                                value={filter.filterTidakPengobatan}
                                onChange={handleFilterChange}
                              >
                                <option value="">Semua</option>
                                <option value="ADA">Ada</option>
                                <option value="TIDAK ADA">Tidak ada</option>
                              </select>
                            </th>
                            <th className="text-[12px] uppercase tracking-wide font-medium text-gray-400 py-2 px-4 bg-gray-50 text-left rounded-tr-md rounded-br-md">
                              Penerimaan Manfaat/Bantuan Pemerintah
                              <select
                                name="filterBantuanPemerintah"
                                value={filter.filterBantuanPemerintah}
                                onChange={handleFilterChange}
                              >
                                <option value="">Semua</option>
                                <option value="PKH">PKH</option>
                                <option value="BPNT">BPNT</option>
                                <option value="KIS">KIS</option>
                                <option value="KIP">KIP</option>
                                <option value="KARTU CERDAS">
                                  KARTU CERDAS
                                </option>
                                <option value="RASTRADA">RASTRADA</option>
                                <option value="BUKAN PENERIMA MANFAAT/BANTUAN">
                                  BUKAN PENERIMA MANFAAT/BANTUAN
                                </option>
                              </select>
                            </th>
                            <th className="text-[12px] uppercase tracking-wide font-medium text-gray-400 py-2 px-4 bg-gray-50 text-left rounded-tl-md rounded-bl-md">
                              Anggota Keluarga yang Merokok
                              <select
                                name="filterMerokok"
                                value={filter.filterMerokok}
                                onChange={handleFilterChange}
                              >
                                <option value="">Semua</option>
                                <option value="ADA">Ada</option>
                                <option value="TIDAK ADA">Tidak ada</option>
                              </select>
                            </th>
                            <th className="text-[12px] uppercase tracking-wide font-medium text-gray-400 py-2 px-4 bg-gray-50 text-left">
                              Sumber Sarana Air Bersih
                              <select
                                name="filterAir"
                                value={filter.filterAirBersih}
                                onChange={handleFilterChange}
                              >
                                <option value="">Semua</option>
                                <option value="PDAM">PDAM</option>
                                <option value="SUMUR">Sumur</option>
                                <option value="AIR HUJAN">Air Hujan</option>
                                <option value="AIR SUNGAI">Air Sungai</option>
                              </select>
                            </th>
                            <th className="text-[12px] uppercase tracking-wide font-medium text-gray-400 py-2 px-4 bg-gray-50 text-left rounded-tr-md rounded-br-md">
                              Memiliki Jamban Keluarga
                              <select
                                name="filterJamban"
                                value={filter.filterJamban}
                                onChange={handleFilterChange}
                              >
                                <option value="">Semua</option>
                                <option value="YA">Ya</option>
                                <option value="TIDAK">Tidak</option>
                              </select>
                            </th>
                            <th className="text-[12px] uppercase tracking-wide font-medium text-gray-400 py-2 px-4 bg-gray-50 text-left rounded-tr-md rounded-br-md">
                              Memiliki SepticTank
                              <select
                                name="filterSepticTank"
                                value={filter.filterSeptictank}
                                onChange={handleFilterChange}
                              >
                                <option value="">Semua</option>
                                <option value="YA">Ya</option>
                                <option value="TIDAK">Tidak</option>
                              </select>
                            </th>
                            <th className="text-[12px] uppercase tracking-wide font-medium text-gray-400 py-2 px-4 bg-gray-50 text-left rounded-tl-md rounded-bl-md">
                              Memiliki Tempat Pembuangan Sampah
                              <select
                                name="filterSampah"
                                value={filter.filterSampah}
                                onChange={handleFilterChange}
                              >
                                <option value="">Semua</option>
                                <option value="YA">Ya</option>
                                <option value="TIDAK">Tidak</option>
                              </select>
                            </th>
                            <th className="text-[12px] uppercase tracking-wide font-medium text-gray-400 py-2 px-4 bg-gray-50 text-left">
                              Kriteria Rumah
                              <select
                                name="filterKriteriaRumah"
                                value={filter.filterKriteriaRumah}
                                onChange={handleFilterChange}
                              >
                                <option value="">Semua</option>
                                <option value="SEHAT LAYAK HUNI">
                                  Sehat Layak Huni
                                </option>
                                <option value="LAYAK HUNI">Layak Huni</option>
                                <option value="TIDAK LAYAK HUNI">
                                  Tidak Layak Huni
                                </option>
                              </select>
                            </th>
                            <th className="text-[12px] uppercase tracking-wide font-medium text-gray-400 py-2 px-4 bg-gray-50 text-left rounded-tr-md rounded-br-md">
                              Status Kepemilikan Rumah
                              <select
                                name="filterStatusRumah"
                                value={filter.filterStatusRumah}
                                onChange={handleFilterChange}
                              >
                                <option value="">Semua</option>
                                <option value="MILIK SENDIRI">
                                  Milik Sendiri
                                </option>
                                <option value="SEWA">Sewa</option>
                                <option value="MILIK ORANG TUA">
                                  Milik Orang Tua
                                </option>
                              </select>
                            </th>
                            <th className="text-[12px] uppercase tracking-wide font-medium text-gray-400 py-2 px-4 bg-gray-50 text-left rounded-tr-md rounded-br-md">
                              Mengikuti Aktivitas Keagamaan di Lingkungan
                              Sekitar
                              <select
                                name="filterKeagamaan"
                                value={filter.filterKeagamaan}
                                onChange={handleFilterChange}
                              >
                                <option value="">Semua</option>
                                <option value="YA">Ya</option>
                                <option value="TIDAK">Tidak</option>
                              </select>
                            </th>
                            <th className="text-[12px] uppercase tracking-wide font-medium text-gray-400 py-2 px-4 bg-gray-50 text-left rounded-tr-md rounded-br-md">
                              Mengikuti Aktivitas Sosial di Lingkungan Sekitar
                              <select
                                name="filterSosial"
                                value={filter.filterSosial}
                                onChange={handleFilterChange}
                              >
                                <option value="">Semua</option>
                                <option value="YA">Ya</option>
                                <option value="TIDAK">Tidak</option>
                              </select>
                            </th>
                            <th className="text-[12px] uppercase tracking-wide font-medium text-gray-400 py-2 px-4 bg-gray-50 text-left rounded-tl-md rounded-bl-md">
                              Memiliki Usaha Peningkatan Pendapatan Keluarga
                              (UP2K) atau UMKM
                            </th>
                            <th className="text-[12px] uppercase tracking-wide font-medium text-gray-400 py-2 px-4 bg-gray-50 text-left">
                              Memiliki Tanaman Obat Keluarga (TOGA)
                              <select
                                name="filterToga"
                                value={filter.filterToga}
                                onChange={handleFilterChange}
                              >
                                <option value="">Semua</option>
                                <option value="YA">Ya</option>
                                <option value="TIDAK">Tidak</option>
                              </select>
                            </th>
                            <th className="text-[12px] uppercase tracking-wide font-medium text-gray-400 py-2 px-4 bg-gray-50 text-left rounded-tr-md rounded-br-md">
                              Jumlah Pengeluaran dalam Satu Bulan
                            </th>
                          </>
                        )}
                        <th className="text-[12px] uppercase tracking-wide font-medium text-gray-400 py-2 px-4 bg-gray-50 text-left rounded-tr-md rounded-br-md">
                          Keterangan
                        </th>
                        {rolee !== "rw" && (
                          <>
                            <th className="text-[12px] uppercase tracking-wide font-medium text-gray-400 py-2 px-4 bg-gray-50 text-left rounded-tr-md rounded-br-md">
                              actions
                            </th>
                          </>
                        )}
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
                                className="text-gray-600 text-sm font-medium hover:text-blue-500 ml-2 truncate text-left"
                              >
                                {item.namaLengkap}
                              </a>
                            </div>
                          </td>
                          <td className="py-2 px-4 border-b border-b-gray-50">
                            <span className="text-[13px] font-medium text-cyan-500 text-left">
                              {item.jenisKelamin}
                            </span>
                          </td>
                          {rolee !== "rw" && (
                            <>
                              <td
                                className={`
              py-2 px-4 border-b border-b-gray-50 text-left`}
                              >
                                <span className="text-[13px] font-medium text-gray-500">
                                  {item.tempatLahir}
                                </span>
                              </td>
                              <td className="py-2 px-4 border-b border-b-gray-50 text-left">
                                <span className="text-[13px] font-medium text-cyan-500">
                                  {formatDate(item.tanggalLahir)}
                                </span>
                              </td>
                              <td className="py-2 px-4 border-b border-b-gray-50 text-left">
                                <span className="text-[13px] font-medium text-gray-500">
                                  {item.kartuKeluarga}
                                </span>
                              </td>
                            </>
                          )}
                          <td className="py-2 px-4 border-b border-b-gray-50 text-left">
                            <span className="text-[13px] font-medium text-cyan-500">
                              {item.noKKKTP}
                            </span>
                          </td>
                          {rolee !== "rw" && (
                            <>
                              <td className="py-2 px-4 border-b border-b-gray-50 text-left">
                                <span className="text-[13px] font-medium text-gray-500">
                                  {item.statusPerkawinan}
                                </span>
                              </td>
                            </>
                          )}
                          <td className="py-2 px-4 border-b border-b-gray-50 text-left">
                            <span className="text-[13px] font-medium text-cyan-500">
                              {item.agama}
                            </span>
                          </td>
                          {rolee !== "rw" && (
                            <>
                              <td className="py-2 px-4 border-b border-b-gray-50 text-left">
                                <span className="text-[13px] font-medium text-gray-500">
                                  {item.RT.nomor}
                                </span>
                              </td>
                              <td className="py-2 px-4 border-b border-b-gray-50 text-left">
                                <span className="text-[13px] font-medium text-cyan-500">
                                  {item.RW.nomor}
                                </span>
                              </td>
                            </>
                          )}
                          <td className="py-2 px-4 border-b border-b-gray-50 text-left">
                            <span
                              className="text-[13px] font-medium text-gray-500 truncate max-w-[150px] block"
                              title={item.alamat}
                            >
                              {item.alamat}
                            </span>
                          </td>
                          <td className="py-2 px-4 border-b border-b-gray-50 text-left">
                            <span className="text-[13px] font-medium text-cyan-500">
                              {item.pendidikan}
                            </span>
                          </td>
                          <td className="py-2 px-4 border-b border-b-gray-50 text-left">
                            <span className="text-[13px] font-medium text-gray-500">
                              {item.pekerjaan}
                            </span>
                          </td>
                          {rolee !== "rw" && (
                            <>
                              <td className="py-2 px-4 border-b border-b-gray-50 text-left">
                                <span className="text-[13px] font-medium text-cyan-500">
                                  {item.penghasilanSebulan}
                                </span>
                              </td>
                              <td className="py-2 px-4 border-b border-b-gray-50 text-left">
                                <span className="text-[13px] font-medium text-gray-500">
                                  {item.dokumenKependudukan}
                                </span>
                              </td>
                              <td className="py-2 px-4 border-b border-b-gray-50 text-left">
                                <span className="text-[13px] font-medium text-cyan-500">
                                  {item.wusKeluarga}
                                </span>
                              </td>
                              <td className="py-2 px-4 border-b border-b-gray-50 text-left">
                                <span className="text-[13px] font-medium text-gray-500">
                                  {item.pusKeluarga}
                                </span>
                              </td>
                              <td className="py-2 px-4 border-b border-b-gray-50 text-left">
                                <span className="text-[13px] font-medium text-cyan-500">
                                  {item.pusKB}
                                </span>
                              </td>
                              <td className="py-2 px-4 border-b border-b-gray-50 text-left">
                                <span className="text-[13px] font-medium text-gray-500">
                                  {item.ibuHamilKeluarga}
                                </span>
                              </td>
                              <td className="py-2 px-4 border-b border-b-gray-50 text-left">
                                <span className="text-[13px] font-medium text-cyan-500">
                                  {item.ibuMenyusuiKeluarga}
                                </span>
                              </td>
                              <td className="py-2 px-4 border-b border-b-gray-50 text-left">
                                <span className="text-[13px] font-medium text-gray-500">
                                  {item.ibuBekerjaKeluarga}
                                </span>
                              </td>
                              <td className="py-2 px-4 border-b border-b-gray-50 text-left">
                                <span className="text-[13px] font-medium text-cyan-500">
                                  {item.balitaKeluarga}
                                </span>
                              </td>
                              <td className="py-2 px-4 border-b border-b-gray-50 text-left">
                                <span className="text-[13px] font-medium text-gray-500">
                                  {item.bbBayiNormal}
                                </span>
                              </td>
                              <td className="py-2 px-4 border-b border-b-gray-50 text-left">
                                <span className="text-[13px] font-medium text-cyan-500">
                                  {item.asiBayiEkslusif}
                                </span>
                              </td>
                              <td className="py-2 px-4 border-b border-b-gray-50 text-left">
                                <span className="text-[13px] font-medium text-gray-500">
                                  {item.bayiPosyandu}
                                </span>
                              </td>
                              <td className="py-2 px-4 border-b border-b-gray-50 text-left">
                                <span className="text-[13px] font-medium text-cyan-500">
                                  {item.bayiImunisasi}
                                </span>
                              </td>
                              <td className="py-2 px-4 border-b border-b-gray-50 text-left">
                                <span className="text-[13px] font-medium text-gray-500">
                                  {item.bbTbBayiNormal}
                                </span>
                              </td>
                              <td className="py-2 px-4 border-b border-b-gray-50 text-left">
                                <span className="text-[13px] font-medium text-cyan-500">
                                  {item.riwayatPenyakitBayi}
                                </span>
                              </td>
                              <td className="py-2 px-4 border-b border-b-gray-50 text-left">
                                <span className="text-[13px] font-medium text-gray-500">
                                  {item.anakSekolah}
                                </span>
                              </td>
                              <td className="py-2 px-4 border-b border-b-gray-50 text-left">
                                <span className="text-[13px] font-medium text-cyan-500">
                                  {item.anakTidakSekolah}
                                </span>
                              </td>
                              <td className="py-2 px-4 border-b border-b-gray-50 text-left">
                                <span className="text-[13px] font-medium text-gray-500">
                                  {item.anakYatimPiatu}
                                </span>
                              </td>
                              <td className="py-2 px-4 border-b border-b-gray-50 text-left">
                                <span className="text-[13px] font-medium text-cyan-500">
                                  {item.lansia}
                                </span>
                              </td>
                              <td className="py-2 px-4 border-b border-b-gray-50 text-left">
                                <span className="text-[13px] font-medium text-gray-500">
                                  {item.keluargaDifabel}
                                </span>
                              </td>
                              <td className="py-2 px-4 border-b border-b-gray-50 text-left">
                                <span className="text-[13px] font-medium text-cyan-500">
                                  {item.keluargaCacatMental}
                                </span>
                              </td>
                              <td className="py-2 px-4 border-b border-b-gray-50 text-left">
                                <span className="text-[13px] font-medium text-gray-500">
                                  {item.keluargaTidakMendapatkanPengobatan}
                                </span>
                              </td>
                              <td className="py-2 px-4 border-b border-b-gray-50 text-left">
                                <span className="text-[13px] font-medium text-cyan-500">
                                  {item.bantuanPemerintah}
                                </span>
                              </td>
                              <td className="py-2 px-4 border-b border-b-gray-50 text-left">
                                <span className="text-[13px] font-medium text-gray-500">
                                  {item.keluargaMerokok}
                                </span>
                              </td>
                              <td className="py-2 px-4 border-b border-b-gray-50 text-left">
                                <span className="text-[13px] font-medium text-cyan-500">
                                  {item.saranaAirBersih}
                                </span>
                              </td>
                              <td className="py-2 px-4 border-b border-b-gray-50 text-left">
                                <span className="text-[13px] font-medium text-gray-500">
                                  {item.jambanKeluarga}
                                </span>
                              </td>
                              <td className="py-2 px-4 border-b border-b-gray-50 text-left">
                                <span className="text-[13px] font-medium text-cyan-500">
                                  {item.septicTank}
                                </span>
                              </td>
                              <td className="py-2 px-4 border-b border-b-gray-50 text-left">
                                <span className="text-[13px] font-medium text-gray-500">
                                  {item.pembuanganSampah}
                                </span>
                              </td>
                              <td className="py-2 px-4 border-b border-b-gray-50 text-left">
                                <span className="text-[13px] font-medium text-cyan-500">
                                  {item.kriteriaRumah}
                                </span>
                              </td>
                              <td className="py-2 px-4 border-b border-b-gray-50 text-left">
                                <span className="text-[13px] font-medium text-gray-500">
                                  {item.statusRumah}
                                </span>
                              </td>
                              <td className="py-2 px-4 border-b border-b-gray-50 text-left">
                                <span className="text-[13px] font-medium text-cyan-500">
                                  {item.aktivitasKeagamaan}
                                </span>
                              </td>
                              <td className="py-2 px-4 border-b border-b-gray-50 text-left">
                                <span className="text-[13px] font-medium text-gray-500">
                                  {item.aktivitasSosial}
                                </span>
                              </td>
                              <td className="py-2 px-4 border-b border-b-gray-50 text-left">
                                <span className="text-[13px] font-medium text-cyan-500">
                                  {item.jenisUsaha}
                                </span>
                              </td>
                              <td className="py-2 px-4 border-b border-b-gray-50 text-leftay-50">
                                <span className="text-[13px] font-medium text-gray-500">
                                  {item.memilikiToga}
                                </span>
                              </td>
                              <td className="py-2 px-4 border-b border-b-gray-50 text-left">
                                <span className="text-[13px] font-medium text-cyan-500">
                                  {item.pengeluaranBulanan}
                                </span>
                              </td>
                            </>
                          )}
                          <td className="py-2 px-4 border-b border-b-gray-50 text-left">
                            <span className="text-[13px] font-medium text-gray-500">
                              {item.keterangan}
                            </span>
                          </td>
                          {rolee !== "rw" && (
                            <>
                              <td className="flex gap-2 py-2 px-4 border-b border-b-gray-50">
                                <button
                                  onClick={() => {
                                    // setColor("yellow")
                                    // ViewDoc();
                                    setViewOpen(true);
                                    // setFileName(item.kartuKeluarga)
                                    // getFile(item.kartuKeluarga);
                                  }}
                                  className="inline-block p-1 rounded bg-emerald-500/10 text-emerald-500 font-medium text-[12px] leading-none"
                                >
                                  View
                                </button>
                                {/* <button
                            onClick={() => {
                              setModalOpen(true);
                              setIdKK(item.id);
                            }}
                            className="inline-block p-1 rounded bg-yellow-500/10 text-yellow-500 font-medium text-[12px] leading-none"
                          >
                            Upload
                          </button> */}
                                <button
                                  onClick={() => {
                                    navigate(`/dasawisma/${item.id}`);
                                  }}
                                  className="inline-block p-1 rounded bg-yellow-500/10 text-yellow-500 font-medium text-[12px] leading-none"
                                >
                                  Edit
                                </button>
                                <button
                                  onClick={() => {
                                    handleDelete(item.id);
                                  }}
                                  className="inline-block p-1 rounded bg-red-500/10 text-red-500 font-medium text-[12px] leading-none"
                                >
                                  Delete
                                </button>
                              </td>
                            </>
                          )}
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
        </div>
      </>
    );
  }
}
