import { useEffect, useState } from "react";
import DocViewer, { DocViewerRenderers } from "@cyntler/react-doc-viewer";
import "@cyntler/react-doc-viewer/dist/index.css";
import ModalUpload from "./ModalUpload";
import { Link, useNavigate } from "react-router-dom";
import ServerApi from "../helper/ServerApi";
import { formatDate } from "../helper/formatDate";
import Swal from "sweetalert2";
import * as XLSX from "xlsx";

export default function TableLaporan() {
  // const array = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  // const [fileName, setFileName] = useState("");
  const [docs, setDocs] = useState([]);
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
    page: {
      size: 10,
      number: 1,
    },
  });
  const rolee = localStorage.getItem("role");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    setFilter((prev) => ({
      ...prev,
      page: {
        ...prev.page,
        number: pageNumber, 
      },
    }));
  };
  

  const getAllKk = async () => {
    const params = new URLSearchParams();

    Object.entries(filter).forEach(([key, value]) => {
      if (key === "page" && value) {
        Object.entries(value).forEach(([subKey, subValue]) => {
          params.append(`page[${subKey}]`, subValue);
        });
      } else if (value) {
        params.append(key, value);
      }
    });
    
    console.log(params,'ini paramsssss')
    setIsLoading(true);
    const response = await fetch(`${ServerApi}KK?${params}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
      },
      // query: JSON.stringify(filter),
    });
    const data = await response.json();
    // console.log(data);
    setKk(data);
    setIsLoading(false);
  };
  useEffect(() => {
    getAllKk();
    return () => {
      if (docs && docs[0]?.uri) {
        URL.revokeObjectURL(docs[0].uri);
      }
    };
  }, [filter, docs]);
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
  const exportToExcel = () => {
    console.log("ini kepanggil si excel nya");
    console.log(kk, "ini kk");
    // Create a new workbook
    const excludedColumns = ["id", "UserId", "RT", "RW"];
    const filteredData = kk.map((item) =>
      Object.fromEntries(
        Object.keys(item)
          .filter((key) => !excludedColumns.includes(key))
          .map((key) => [key, item[key]])
      )
    );
    const wb = XLSX.utils.book_new();

    // Convert table data to a worksheet
    const ws = XLSX.utils.json_to_sheet(filteredData);

    // Append the worksheet to the workbook
    XLSX.utils.book_append_sheet(wb, ws, "Data");

    // Write the workbook to a file
    XLSX.writeFile(wb, "data dasawisma.xlsx");
  };

  const handleFilterChange = (event) => {
    const { name, value } = event.target;
  
    if (name === 'itemsPerPage') {
      setItemsPerPage(Number(value));
      setCurrentPage(1);
      setFilter((prevFilter) => ({
        ...prevFilter,
        page: {
          size: Number(value),
          number: 1, 
        },
      }));
    } else {
      setFilter((prevFilter) => ({
        ...prevFilter,
        [name]: value,
      }));
    }
  };
  
  
  const getFile = async (fileName) => {
    try {
      const fileUrl = `${ServerApi}uploads/${fileName}`;

      const response = await fetch(fileUrl, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      });

      if (!response.ok) {
        throw new Error("File tidak ditemukan");
      }

      const blob = await response.blob();

      const fileObjectUrl = URL.createObjectURL(blob);

      setDocs([
        {
          uri: fileObjectUrl,
          fileType: "pdf",
          fileName: fileName,
        },
      ]);
    } catch (error) {
      console.log(error);
    }
  };
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
        <div className="flex justify-center items-center min-h-screen px-4 mt-2 md:mt-4 lg:mt-8">
          <div className="w-full max-w-3xl lg:max-w-5xl">
            {/* <button
              onClick={() => setViewOpen(false)}
              className="bg-slate-400 rounded-md w-14 text-white mb-4"
            >
              Back
            </button> */}
            <button
              onClick={() => setViewOpen(false)}
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
            </button>
            <DocViewer
              documents={docs}
              pluginRenderers={DocViewerRenderers}
              style={{ height: "calc(100vh - 200px)" }}
              config={{
                header: {
                  disableHeader: false,
                  disableFileName: false,
                },
              }}
            />
          </div>
        </div>
      </>
    );
  } else if (!modalOpen || !viewOpen) {
    return (
      <>
        <div className="min-h-screen bg-gray-50">
          <div className="p-4 lg:p-6 space-y-4">
            <div className="bg-white border border-gray-200 shadow-md shadow-black/5 rounded-md">
              <div className="flex flex-col gap-4 sm:flex-row sm:justify-between sm:items-center p-4">
                <Link
                  to="/dashboard"
                  className="inline-flex items-center justify-center gap-2 rounded-lg bg-gray-100 px-4 py-2.5 text-gray-600 hover:bg-gray-200 transition-colors w-full sm:w-auto"
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

                {rolee === "kelurahan" && (
                  <>
                    <div className="flex flex-row gap-2">
                      {/* RT Filter */}
                      <div className="relative flex-1 sm:flex-none">
                        <label className="text-xs uppercase tracking-wide font-medium text-gray-400 mb-1 block">
                          RT
                        </label>
                        <select
                          name="filterRT"
                          value={filter.filterRT}
                          onChange={handleFilterChange}
                          className="w-full min-w-[100px] rounded-lg border-gray-200 text-sm py-2 pl-3 pr-8 bg-gray-50 focus:border-blue-500 focus:ring-blue-500"
                        >
                          <option value="">Semua</option>
                          {[...Array(7)].map((_, i) => (
                            <option key={i} value={`00${i + 1}`}>
                              {`00${i + 1}`}
                            </option>
                          ))}
                        </select>
                      </div>

                      {/* RW Filter */}
                      <div className="relative flex-1 sm:flex-none">
                        <label className="text-xs uppercase tracking-wide font-medium text-gray-400 mb-1 block">
                          RW
                        </label>
                        <select
                          name="filterRW"
                          value={filter.filterRW}
                          onChange={handleFilterChange}
                          className="w-full min-w-[100px] rounded-lg border-gray-200 text-sm py-2 pl-3 pr-8 bg-gray-50 focus:border-blue-500 focus:ring-blue-500"
                        >
                          <option value="">Semua</option>
                          {[...Array(5)].map((_, i) => (
                            <option key={i} value={`00${i + 1}`}>
                              {`00${i + 1}`}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <button
                      onClick={exportToExcel}
                      className="inline-flex items-center justify-center gap-2 rounded-lg bg-gray-100 px-4 py-2.5 text-gray-600 hover:bg-gray-200 transition-colors w-full sm:w-auto"
                    >
                      Export to Excel
                    </button>
                  </>
                )}
              </div>
            </div>

            <div className="bg-white border border-gray-200 shadow-md shadow-black/5 rounded-md p-4">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between mb-6">
                <div className="text-lg font-semibold text-gray-800">Data Penduduk</div>
                <div className="flex flex-wrap items-center gap-3">
                <select
                  name="itemsPerPage"
                  value={itemsPerPage}
                  onChange={handleFilterChange}
                  className="w-24 rounded-lg border-gray-200 text-sm py-1.5 px-3 bg-gray-50 focus:border-blue-500 focus:ring-blue-500"
                >
                  <option value={10}>10</option>
                  <option value={25}>25</option>
                  <option value={50}>50</option>
                  <option value={100}>100</option>
                </select>

                <nav className="flex items-center gap-1">
                  <button
                    onClick={() => handlePageChange(1)}
                    disabled={currentPage === 1}
                    className="inline-flex items-center justify-center w-8 h-8 rounded-lg border border-gray-200 bg-white text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <span className="sr-only">First page</span>«
                  </button>
                  <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="inline-flex items-center justify-center w-8 h-8 rounded-lg border border-gray-200 bg-white text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <span className="sr-only">Previous page</span>‹
                  </button>

                  <span className="inline-flex items-center justify-center px-3 h-8 text-sm text-gray-600 bg-gray-50 rounded-lg">
                    {currentPage}
                  </span>

                  <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={kk.length < itemsPerPage}
                    className="inline-flex items-center justify-center w-8 h-8 rounded-lg border border-gray-200 bg-white text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <span className="sr-only">Next page</span>›
                  </button>
                </nav>
              </div>
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
                          <option value="TIDAK TAMAT SD">Tidak Tamat SD</option>
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
                              <option value="LEBIH DARI 2">Lebih dari 2</option>
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
                              <option value="LEBIH DARI 2">Lebih dari 2</option>
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
                              <option value="LEBIH DARI 2">Lebih dari 2</option>
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
                              <option value="KARTU CERDAS">KARTU CERDAS</option>
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
                            Mengikuti Aktivitas Keagamaan di Lingkungan Sekitar
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
                            <td className="flex gap-3 py-3 px-4 border-b border-b-gray-50">
                              <button
                                onClick={() => {
                                  setViewOpen(true);
                                  getFile(item.kartuKeluarga);
                                }}
                                className="inline-flex items-center px-3 py-1.5 rounded-md bg-emerald-100 text-emerald-600 font-medium text-xs hover:bg-emerald-200 transition-colors duration-200"
                              >
                                <svg
                                  className="w-3.5 h-3.5 mr-1"
                                  fill="none"
                                  stroke="currentColor"
                                  viewBox="0 0 24 24"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                                  />
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                                  />
                                </svg>
                                View
                              </button>
                              {rolee === "rt" && (
                                <>
                                  <button
                                    onClick={() => {
                                      setModalOpen(true);
                                      setIdKK(item.id);
                                    }}
                                    className="inline-flex items-center px-3 py-1.5 rounded-md bg-blue-100 text-blue-600 font-medium text-xs hover:bg-blue-200 transition-colors duration-200"
                                  >
                                    <svg
                                      className="w-3.5 h-3.5 mr-1"
                                      fill="none"
                                      stroke="currentColor"
                                      viewBox="0 0 24 24"
                                    >
                                      <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                                      />
                                    </svg>
                                    Update KK
                                  </button>

                                  <button
                                    onClick={() => {
                                      navigate(`/dasawisma/${item.id}`);
                                    }}
                                    className="inline-flex items-center px-3 py-1.5 rounded-md bg-amber-100 text-amber-600 font-medium text-xs hover:bg-amber-200 transition-colors duration-200"
                                  >
                                    <svg
                                      className="w-3.5 h-3.5 mr-1"
                                      fill="none"
                                      stroke="currentColor"
                                      viewBox="0 0 24 24"
                                    >
                                      <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                                      />
                                    </svg>
                                    Edit
                                  </button>

                                  <button
                                    onClick={() => {
                                      handleDelete(item.id);
                                    }}
                                    className="inline-flex items-center px-3 py-1.5 rounded-md bg-red-100 text-red-600 font-medium text-xs hover:bg-red-200 transition-colors duration-200"
                                  >
                                    <svg
                                      className="w-3.5 h-3.5 mr-1"
                                      fill="none"
                                      stroke="currentColor"
                                      viewBox="0 0 24 24"
                                    >
                                      <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                                      />
                                    </svg>
                                    Delete
                                  </button>
                                </>
                              )}
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
      </>
    );
  }
}
