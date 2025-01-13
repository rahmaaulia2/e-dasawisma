const { Op, where } = require("sequelize");
const { comparePassword, hashPassword } = require("../helpers/bcrypt");
const { generateToken } = require("../helpers/jwt");
const { User, DetailKK, Role, RT, RW } = require("../models");
const path = require("path");

class Controller {
  static async getAllRole(req, res, next) {
    try {
      const roles = await Role.findAll({
        attributes: { exclude: ["createdAt", "updatedAt"] },
      });
      res.status(200).json(roles);
    } catch (error) {
      next(error);
    }
  }
  static async addUser(req, res, next) {
    try {
      const { nama, email, noHp, alamat, RoleId, RtId, RwId, password } =
        req.body;
      console.log(req.body, "<<<<<<<<<<<<<<<<<<<<<<<<");
      const findUser = await User.findOne({ where: { email } });
      if (findUser) throw { name: "EmailAlreadyExist" };

      const user = await User.create({
        nama,
        email,
        noHp,
        alamat,
        RoleId,
        RtId,
        RwId,
        password,
      });
      if (!user) throw { name: "CannotCreateUser" };
      res.status(201).json({ message: `User ${user.nama} Created` });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
  static async login(req, res, next) {
    try {
      const { nama, password } = req.body;
      const user = await User.findOne({
        where: { nama },
        include: {
          model: Role,
          attributes: { exclude: ["createdAt", "updatedAt", "id"] },
        },
        attributes: { exclude: ["createdAt", "updatedAt"] },
      });
      if (!user) throw { name: "InvalidUsername/Password" };
      //   console.log(user);
      //   console.log(user.Role.name);

      const isValidPassword = comparePassword(password, user.password);
      if (!isValidPassword) throw { name: "InvalidUsername/Password" };

      const access_token = generateToken(user);
      res.status(200).json({ access_token, role: user.Role.name });
    } catch (error) {
      next(error);
    }
  }
  static async getAllUsers(req, res, next) {
    try {
      const { filterRole, search,page } = req.query;
      let limit = 10;
      let offset = 1;
      let paramsquery = {
        attributes: {
          exclude: ["password", "createdAt", "updatedAt"],
        },
        include: {
          model: Role,
          attributes: { exclude: ["createdAt", "updatedAt"] },
        },
      };
      if (filterRole && search) {
        paramsquery.where = {
          [Op.and]: [
            { "$Role.name$": filterRole },
            { nama: { [Op.iLike]: `%${search}%` } },
          ],
        };
      } else if (filterRole) {
        paramsquery.where = { "$Role.name$": filterRole };
      } else if (search) {
        paramsquery.where = { nama: { [Op.iLike]: `%${search}%` } };
      }
      if (page) {
        if (page.size) {
          console.log('masuk sini', page.size)
          limit = page.size;
          paramsquery.limit = limit;
        } else {
          paramsquery.limit = limit;
        }
        if (page.number) {
          offset = page.number;
          paramsquery.offset = limit * (offset - 1);
        } else {
          paramsquery.offset = limit * (offset - 1);
        }
      }
      const users = await User.findAll(paramsquery);
      res.status(200).json(users);
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
  static async getUserById(req, res, next) {
    try {
      const { userId } = req.params;
      console.log(userId, "<<<<<<<<<<userId");
      const user = await User.findByPk(userId, {
        attributes: { exclude: ["password", "createdAt", "updatedAt"] },
      });
      if (!user) {
        throw { name: "UserNotFound" };
      }
      console.log(user, "userrrrr");
      res.status(200).json(user);
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
  static async updateUser(req, res, next) {
    try {
      const { nama, email, noHp, alamat, RoleId, RtId, RwId } = req.body;
      const { userId } = req.params;
      //   const newPass = hashPassword(password);
      const user = await User.update(
        {
          nama,
          email,
          noHp,
          alamat,
          RoleId,
          RtId,
          RwId,
        },
        {
          where: { id: userId },
        }
      );
      if (!user) {
        throw { name: "UserNotFound" };
      }
      res.status(200).json({ message: `User ${nama} Updated` });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
  static async deleteUser(req, res, next) {
    try {
      const { userId } = req.params;
      const user = await User.findByPk(userId);
      if (!user) {
        throw { name: "UserNotFound" };
      }
      await user.destroy();
      res.status(200).json({ message: `User ${user.nama} Deleted` });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
  static async getProfile(req, res, next) {
    try {
      const { id } = req.user;
      const user = await User.findByPk(id, {
        attributes: { exclude: ["password", "createdAt", "updatedAt"] },
      });
      if (!user) {
        throw { name: "UserNotFound" };
      }
      res.status(200).json(user);
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
  static async addKK(req, res, next) {
    try {
      const { id } = req.user;
      const findUser = await User.findByPk(id);
      if (!findUser) throw { name: "CannotCreateDasawisma" };

      const {
        namaLengkap,
        jenisKelamin,
        tempatLahir,
        tanggalLahir,
        noKKKTP,
        statusPerkawinan,
        agama,
        RtId,
        RwId,
        alamat,
        pendidikan,
        pekerjaan,
        penghasilanSebulan,
        dokumenKependudukan,
        wusKeluarga,
        pusKeluarga,
        pusKB,
        ibuHamilKeluarga,
        ibuMenyusuiKeluarga,
        ibuBekerjaKeluarga,
        balitaKeluarga,
        bbBayiNormal,
        asiBayiEkslusif,
        bayiPosyandu,
        bayiImunisasi,
        bbTbBayiNormal,
        riwayatPenyakitBayi,
        anakSekolah,
        anakTidakSekolah,
        anakYatimPiatu,
        lansia,
        keluargaDifabel,
        keluargaCacatMental,
        keluargaTidakMendapatkanPengobatan,
        bantuanPemerintah,
        keluargaMerokok,
        saranaAirBersih,
        jambanKeluarga,
        septicTank,
        pembuanganSampah,
        kriteriaRumah,
        statusRumah,
        aktivitasKeagamaan,
        aktivitasSosial,
        memilikiToga,
        jenisUsaha,
        pengeluaranBulanan,
        keterangan,
      } = req.body;
      console.log(req.body);

      const kartuKeluargaName = req.file?.originalname; //file

      const findByName = await DetailKK.findOne({
        where: { namaLengkap },
      });
      if (findByName) throw { name: "NameAlreadyExist" };

      await DetailKK.create({
        UserId: id,
        namaLengkap,
        jenisKelamin,
        tempatLahir,
        tanggalLahir,
        kartuKeluarga: kartuKeluargaName,
        noKKKTP,
        statusPerkawinan,
        agama,
        RtId,
        RwId,
        alamat,
        pendidikan,
        pekerjaan,
        penghasilanSebulan,
        dokumenKependudukan,
        wusKeluarga,
        pusKeluarga,
        pusKB,
        ibuHamilKeluarga,
        ibuMenyusuiKeluarga,
        ibuBekerjaKeluarga,
        balitaKeluarga,
        bbBayiNormal,
        asiBayiEkslusif,
        bayiPosyandu,
        bayiImunisasi,
        bbTbBayiNormal,
        riwayatPenyakitBayi,
        anakSekolah,
        anakTidakSekolah,
        anakYatimPiatu,
        lansia,
        keluargaDifabel,
        keluargaCacatMental,
        keluargaTidakMendapatkanPengobatan,
        bantuanPemerintah,
        keluargaMerokok,
        saranaAirBersih,
        jambanKeluarga,
        septicTank,
        pembuanganSampah,
        kriteriaRumah,
        statusRumah,
        aktivitasKeagamaan,
        aktivitasSosial,
        memilikiToga,
        jenisUsaha,
        pengeluaranBulanan,
        keterangan,
      });
      res.status(201).json({ message: "Success input dasawisma" });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
  static async getAllKK(req, res, next) {
    try {
      const { id, role } = req.user;
      const findUser = await User.findByPk(id);
      const { RwId, RtId } = findUser;

      const {
        filterKelurahan,
        filterGender,
        filterStatusPerkawinan,
        filterAgama,
        filterRT,
        filterRW,
        filterPendidikan,
        filterPekerjaan,
        filterPenghasilan,
        filterDokumen,
        filterWus,
        filterPus,
        filterPusKB,
        filterIbuHamil,
        filterIbuMenyusui,
        filterIbuBekerja,
        filterBalita,
        filterBbBayi,
        filterAsiBayi,
        filterBayiPosyandu,
        filterBayiImunisasi,
        filterBbTbBayi,
        filterAnakSekolah,
        filterAnakTidakSekolah,
        filterAnakYatimPiatu,
        filterLansia,
        filterDifabel,
        filterCacatMental,
        filterTidakPengobatan,
        filterBantuanPemerintah,
        filterMerokok,
        filterAirBersih,
        filterJamban,
        filterSeptictank,
        filterPembuanganSampah,
        filterKriteriaRumah,
        filterStatusRumah,
        filterKeagamaan,
        filterSosial,
        filterToga,
        searchByNama,
        page,
      } = req.query;
      console.log(page, 'ini pageeeeeeee')
      let limit = 10;
      let offset = 1;
      let paramsquery = {
        attributes: { exclude: ["createdAt", "updatedAt"] },
        where: {},
        include: [
          {
            model: RT,
            attributes: ["nomor"],
          },
          {
            model: RW,
            attributes: ["nomor"],
          },
        ],
        order: [["id", "ASC"]],
      };
      if (page) {
        if (page.size) {
          console.log('masuk sini', page.size)
          limit = page.size;
          paramsquery.limit = limit;
        } else {
          paramsquery.limit = limit;
        }
        if (page.number) {
          offset = page.number;
          paramsquery.offset = limit * (offset - 1);
        } else {
          paramsquery.offset = limit * (offset - 1);
        }
      }
      const filters = {
        KelurahanCode: filterKelurahan,
        jenisKelamin: filterGender,
        statusPerkawinan: filterStatusPerkawinan,
        agama: filterAgama,
        RtId: filterRT,
        RwId: filterRW,
        pendidikan: filterPendidikan,
        pekerjaan: filterPekerjaan,
        penghasilanSebulan: filterPenghasilan,
        dokumenKependudukan: filterDokumen,
        wusKeluarga: filterWus,
        pusKeluarga: filterPus,
        pusKB: filterPusKB,
        ibuHamilKeluarga: filterIbuHamil,
        ibuMenyusuiKeluarga: filterIbuMenyusui,
        ibuBekerjaKeluarga: filterIbuBekerja,
        balitaKeluarga: filterBalita,
        bbBayiNormal: filterBbBayi,
        asiBayiEkslusif: filterAsiBayi,
        bayiPosyandu: filterBayiPosyandu,
        bayiImunisasi: filterBayiImunisasi,
        bbTbBayiNormal: filterBbTbBayi,
        anakSekolah: filterAnakSekolah,
        anakTidakSekolah: filterAnakTidakSekolah,
        anakYatimPiatu: filterAnakYatimPiatu,
        lansia: filterLansia,
        keluargaDifabel: filterDifabel,
        keluargaCacatMental: filterCacatMental,
        keluargaTidakMendapatkanPengobatan: filterTidakPengobatan,
        bantuanPemerintah: filterBantuanPemerintah,
        keluargaMerokok: filterMerokok,
        saranaAirBersih: filterAirBersih,
        jambanKeluarga: filterJamban,
        septicTank: filterSeptictank,
        pembuanganSampah: filterPembuanganSampah,
        kriteriaRumah: filterKriteriaRumah,
        statusRumah: filterStatusRumah,
        aktivitasKeagamaan: filterKeagamaan,
        aktivitasSosial: filterSosial,
        memilikiToga: filterToga,
      };

      // menambahkan filter yang tidak kosong
      for (const [key, value] of Object.entries(filters)) {
        if (value) {
          paramsquery.where[key] = value;
        }
      }

      // menambahkan filter search by nama
      if (searchByNama) {
        paramsquery.where.namaLengkap = { [Op.iLike]: `%${searchByNama}%` };
      }

      // mendefinisikan role berdasarkan kondisi
      const roleConditions = {
        rw: { RwId },
        rt: { RtId },
      };

      // menambahkan kondisi role jika bukan admin
      if (role !== "kelurahan") {
        paramsquery.where = {
          ...paramsquery.where,
          ...(roleConditions[role] || { UserId: id }),
        };
      }

      const kk = await DetailKK.findAll(paramsquery);
      res.status(200).json(kk);
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
  static async getDetailKkById(req, res, next) {
    try {
      const { idKK } = req.params;
      const detailKK = await DetailKK.findByPk(idKK, {
        attributes: { exclude: ["createdAt", "updatedAt"] },
      });
      if (!detailKK) {
        throw { name: "DetailKKNotFound" };
      }
      res.status(200).json(detailKK);
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
  static async updateDetailKK(req, res, next) {
    try {
      const { idKK } = req.params;
      const {
        namaLengkap,
        jenisKelamin,
        tempatLahir,
        tanggalLahir,
        noKKKTP,
        statusPerkawinan,
        agama,
        RwId,
        RtId,
        alamat,
        pendidikan,
        pekerjaan,
        penghasilanSebulan,
        dokumenKependudukan,
        wusKeluarga,
        pusKeluarga,
        pusKB,
        ibuHamilKeluarga,
        ibuMenyusuiKeluarga,
        ibuBekerjaKeluarga,
        balitaKeluarga,
        bbBayiNormal,
        asiBayiEkslusif,
        bayiPosyandu,
        bayiImunisasi,
        bbTbBayiNormal,
        riwayatPenyakitBayi,
        anakSekolah,
        anakTidakSekolah,
        anakYatimPiatu,
        lansia,
        keluargaDifabel,
        keluargaCacatMental,
        keluargaTidakMendapatkanPengobatan,
        bantuanPemerintah,
        keluargaMerokok,
        saranaAirBersih,
        jambanKeluarga,
        septicTank,
        pembuanganSampah,
        kriteriaRumah,
        statusRumah,
        aktivitasKeagamaan,
        aktivitasSosial,
        memilikiToga,
        jenisUsaha,
        pengeluaranBulanan,
        keterangan,
      } = req.body;
      console.log(req.params, req.body, "<<<<<<<<<<<<<<<<<<<<<<<<<<<<");
      const kartuKeluargaName = req.file?.originalname; //file

      await DetailKK.update(
        {
          namaLengkap,
          jenisKelamin,
          tempatLahir,
          tanggalLahir,
          kartuKeluarga: kartuKeluargaName,
          noKKKTP,
          statusPerkawinan,
          agama,
          RwId,
          RtId,
          alamat,
          pendidikan,
          pekerjaan,
          penghasilanSebulan,
          dokumenKependudukan,
          wusKeluarga,
          pusKeluarga,
          pusKB,
          ibuHamilKeluarga,
          ibuMenyusuiKeluarga,
          ibuBekerjaKeluarga,
          balitaKeluarga,
          bbBayiNormal,
          asiBayiEkslusif,
          bayiPosyandu,
          bayiImunisasi,
          bbTbBayiNormal,
          riwayatPenyakitBayi,
          anakSekolah,
          anakTidakSekolah,
          anakYatimPiatu,
          lansia,
          keluargaDifabel,
          keluargaCacatMental,
          keluargaTidakMendapatkanPengobatan,
          bantuanPemerintah,
          keluargaMerokok,
          saranaAirBersih,
          jambanKeluarga,
          septicTank,
          pembuanganSampah,
          kriteriaRumah,
          statusRumah,
          aktivitasKeagamaan,
          aktivitasSosial,
          memilikiToga,
          jenisUsaha,
          pengeluaranBulanan,
          keterangan,
        },
        {
          where: { id: idKK },
        }
      );
      console.log("berhasil update");
      res.status(200).json({ message: "Detail KK Updated" });
    } catch (error) {
      next(error);
    }
  }
  static async deleteKK(req, res, next) {
    try {
      const { idKK } = req.params;
      const detailKK = await DetailKK.findByPk(idKK);
      if (!detailKK) {
        throw { name: "DetailKKNotFound" };
      }
      await detailKK.destroy();
      res.status(200).json({ message: "Detail KK Deleted" });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
  static async getUploads(req, res, next) {
    try {
      const { filename } = req.params;
      const findData = await DetailKK.findOne({
        where: { kartuKeluarga: filename },
      });
      if (!findData) {
        throw { name: "DetailKKNotFound" };
      }

      const filePath = path.join(__dirname, "../uploads", filename);
      console.log(filePath);

      res.sendFile(filePath, (err) => {
        if (err) {
          res.status(404).send("File not found");
        }
      });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
  static async getAllRT(req, res, next) {
    try {
      const data = await RT.findAll({
        attributes: { exclude: ["createdAt", "updatedAt"] },
      });
      res.status(200).json(data);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }
  static async getTotalRw(req, res, next) {
    try {
      const dataRw = await RW.findAndCountAll({
        attributes: ["id", "nomor"],
        raw: true,
      });
      const dataKK = await DetailKK.findAndCountAll({
        attributes: ["id", "RwId"],
        raw: true,
      });
      // console.log(dataRw,"ini data rw")
      const result = [];
      dataRw.rows.forEach((rw) => {
        const count = dataKK.rows.filter((kk) => kk.RwId === rw.id).length;
        result.push({ ...rw, count });
      });

      // console.log(dataKK,"ini data kk")
      res.status(200).json(result);
      // res.status(200).json({message :"ini test data dulu"});
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }
  static async buatChart(req, res, next) {
    try {
      const dataQuery = [
        "filterGender",
        "filterStatusPerkawinan",
        "filterAgama",
        "filterRT",
        "filterRW",
        "filterPendidikan",
        "filterPekerjaan",
        "filterPenghasilan",
        "filterDokumen",
        "filterWus",
        "filterPus",
        "filterPusKB",
        "filterIbuHamil",
        "filterIbuMenyusui",
        "filterIbuBekerja",
        "filterBalita",
        "filterBbBayi",
        "filterAsiBayi",
        "filterBayiPosyandu",
        "filterBayiImunisasi",
        "filterBbTbBayi",
        "filterAnakSekolah",
        "filterAnakTidakSekolah",
        "filterAnakYatimPiatu",
        "filterLansia",
        "filterDifabel",
        "filterCacatMental",
        "filterTidakPengobatan",
        "filterBantuanPemerintah",
        "filterMerokok",
        "filterAirBersih",
        "filterJamban",
        "filterSeptictank",
        "filterPembuanganSampah",
        "filterKriteriaRumah",
        "filterStatusRumah",
        "filterKeagamaan",
        "filterSosial",
        "filterToga",
      ];
      const dataFilter = [
        "gender",
        "status perkawinan",
        "agama",
        "Rw",
        "Rt",
        "pendidikan",
        "pekerjaan",
        "penghasilan sebulan",
        "dokumen kependudukan",
        "wus keluarga",
        "pus keluarga",
        "pus KB",
        "ibu hamil keluarga",
        "ibu menyusui keluarga",
        "ibu bekerja keluarga",
        "balita keluarga",
        "bb bayi normal",
        "asi bayi ekslusif",
        "bayi posyandu",
        "bayi imunisasi",
        "bb tb bayi normal",
        "anak sekolah",
        "anak tidak sekolah",
        "anak yatim piatu",
        "lansia",
        "keluarga difabel",
        "keluarga cacat mental",
        "keluarga tidak mendapatkan pengobatan",
        "bantuan pemerintah",
        "keluarga merokok",
        "sarana air bersih",
        "jamban keluarga",
        "septic tank",
        "pembuangan sampah",
        "kriteria rumah",
        "status rumah",
        "aktivitas keagamaan",
        "aktivitas sosial",
        "memiliki toga",
      ];
      const results = [];
      dataFilter.forEach((dataItem) => {
        dataQuery.forEach((query) => {
          // Remove filter prefix
          const cleanQuery = query.replace("filter", "").toLowerCase();

          // Clean data item
          let cleanData = dataItem.replace(/\s+/g, "").toLowerCase();

          // Handle special cases
          if (cleanData.includes("keluarga")) {
            cleanData = cleanData.replace("keluarga", "");
          }
          if (cleanData === "rt") cleanData = "rt";
          if (cleanData === "rw") cleanData = "rw";
          if (cleanData === "penghasilansebulan") cleanData = "penghasilan";
          if (cleanData === "dokumenkependudukan") cleanData = "dokumen";
          if (cleanData === "bbbayinormal") cleanData = "bbbayi";
          if (cleanData === "asibayiekslusif") cleanData = "asibayi";
          if (cleanData === "bbtbbayinormal") cleanData = "bbtbbayi";
          if (cleanData.includes("aktivitas")) {
            cleanData = cleanData.replace("aktivitas", "");
          }
          if (cleanData === "memilikiToga") cleanData = "toga";

          if (cleanQuery === cleanData) {
            results.push({ nama: dataItem, filter: query });
          }
        });
      });

      // console.log(results);
      const pagination = {
        // pagination: {
        more: true,
        // },
      };
      const resultsAkhir = { results, pagination };
      res.status(200).json(resultsAkhir);
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
  static async chartFilter(req, res, next) {
    try {
      const { filter } = req.query;
      const filterMappings = {
        filterGender: "jenisKelamin",
        filterStatusPerkawinan: "statusPerkawinan",
        filterAgama: "agama",
        filterRT: "RtId",
        filterRW: "RwId",
        filterPendidikan: "pendidikan",
        filterPekerjaan: "pekerjaan",
        filterPenghasilan: "penghasilanSebulan",
        filterDokumen: "dokumenKependudukan",
        filterWus: "wusKeluarga",
        filterPus: "pusKeluarga",
        filterPusKB: "pusKB",
        filterIbuHamil: "ibuHamilKeluarga",
        filterIbuMenyusui: "ibuMenyusuiKeluarga",
        filterIbuBekerja: "ibuBekerjaKeluarga",
        filterBalita: "balitaKeluarga",
        filterBbBayi: "bbBayiNormal",
        filterAsiBayi: "asiBayiEkslusif",
        filterBayiPosyandu: "bayiPosyandu",
        filterBayiImunisasi: "bayiImunisasi",
        filterBbTbBayi: "bbTbBayiNormal",
        filterAnakSekolah: "anakSekolah",
        filterAnakTidakSekolah: "anakTidakSekolah",
        filterAnakYatimPiatu: "anakYatimPiatu",
        filterLansia: "lansia",
        filterDifabel: "keluargaDifabel",
        filterCacatMental: "keluargaCacatMental",
        filterTidakPengobatan: "keluargaTidakMendapatkanPengobatan",
        filterBantuanPemerintah: "bantuanPemerintah",
        filterMerokok: "keluargaMerokok",
        filterAirBersih: "saranaAirBersih",
        filterJamban: "jambanKeluarga",
        filterSeptictank: "septicTank",
        filterPembuanganSampah: "pembuanganSampah",
        filterKriteriaRumah: "kriteriaRumah",
        filterStatusRumah: "statusRumah",
        filterKeagamaan: "aktivitasKeagamaan",
        filterSosial: "aktivitasSosial",
        filterToga: "memilikiToga",
      };
      ;
      // Pastikan filter disediakan
      if (!filter) {
        return res
          .status(400)
          .json({ error: "Parameter 'filter' diperlukan!" });
      }

      // Cek apakah filter valid
      const column = filterMappings[filter];
      if (!column) {
        return res
          .status(400)
          .json({ error: `Filter '${filter}' tidak valid!` });
      }
      const data = await DetailKK.findAll()

      // Proses data untuk mengelompokkan berdasarkan filter
      const groupedData = data.reduce((acc, curr) => {
        const key = curr[column];
        acc[key] = (acc[key] || 0) + 1;
        return acc;
      }, {});

      // Format hasil menjadi array of objects
      const result = Object.entries(groupedData).map(([key, value]) => ({
        label : key, value: value,
      }));
      res.status(200).json(result);
    } catch (error) {
      console.log(error);
      next(error);
    }
    // try {
    //   const {filter} = req.query
    //   console.log(req.query)
    //   const dataFilter = [
    //     "jenisKelamin",
    //     "statusPerkawinan",
    //     "agama",
    //     "RwId",
    //     "RtId",
    //     "pendidikan",
    //     "pekerjaan",
    //     "penghasilanSebulan",
    //     "dokumenKependudukan",
    //     "wusKeluarga",
    //     "pusKeluarga",
    //     "pusKB",
    //     "ibuHamilKeluarga",
    //     "ibuMenyusuiKeluarga",
    //     "ibuBekerjaKeluarga",
    //     "balitaKeluarga",
    //     "bbBayiNormal",
    //     "asiBayiEkslusif",
    //     "bayiPosyandu",
    //     "bayiImunisasi",
    //     "bbTbBayiNormal",
    //     "anakSekolah",
    //     "anakTidakSekolah",
    //     "anakYatimPiatu",
    //     "lansia",
    //     "keluargaDifabel",
    //     "keluargaCacatMental",
    //     "keluargaTidakMendapatkanPengobatan",
    //     "bantuanPemerintah",
    //     "keluargaMerokok",
    //     "saranaAirBersih",
    //     "jambanKeluarga",
    //     "septicTank",
    //     "pembuanganSampah",
    //     "kriteriaRumah",
    //     "statusRumah",
    //     "aktivitasKeagamaan",
    //     "aktivitasSosial",
    //     "memilikiToga",
    //   ];
    //   const filters = {
    //     jenisKelamin,
    //     statusPerkawinan: filterStatusPerkawinan,
    //     agama: filterAgama,
    //     RtId: filterRT,
    //     RwId: filterRW,
    //     pendidikan: filterPendidikan,
    //     pekerjaan: filterPekerjaan,
    //     penghasilanSebulan: filterPenghasilan,
    //     dokumenKependudukan: filterDokumen,
    //     wusKeluarga: filterWus,
    //     pusKeluarga: filterPus,
    //     pusKB: filterPusKB,
    //     ibuHamilKeluarga: filterIbuHamil,
    //     ibuMenyusuiKeluarga: filterIbuMenyusui,
    //     ibuBekerjaKeluarga: filterIbuBekerja,
    //     balitaKeluarga: filterBalita,
    //     bbBayiNormal: filterBbBayi,
    //     asiBayiEkslusif: filterAsiBayi,
    //     bayiPosyandu: filterBayiPosyandu,
    //     bayiImunisasi: filterBayiImunisasi,
    //     bbTbBayiNormal: filterBbTbBayi,
    //     anakSekolah: filterAnakSekolah,
    //     anakTidakSekolah: filterAnakTidakSekolah,
    //     anakYatimPiatu: filterAnakYatimPiatu,
    //     lansia: filterLansia,
    //     keluargaDifabel: filterDifabel,
    //     keluargaCacatMental: filterCacatMental,
    //     keluargaTidakMendapatkanPengobatan: filterTidakPengobatan,
    //     bantuanPemerintah: filterBantuanPemerintah,
    //     keluargaMerokok: filterMerokok,
    //     saranaAirBersih: filterAirBersih,
    //     jambanKeluarga: filterJamban,
    //     septicTank: filterSeptictank,
    //     pembuanganSampah: filterPembuanganSampah,
    //     kriteriaRumah: filterKriteriaRumah,
    //     statusRumah: filterStatusRumah,
    //     aktivitasKeagamaan: filterKeagamaan,
    //     aktivitasSosial: filterSosial,
    //     memilikiToga: filterToga,
    //   };
    //   let paramsquery = {where: {}};
    //   for (const [key, value] of Object.entries(filters)) {
    //     if (value) {
    //       paramsquery.where[key] = value;
    //     }
    //   }

    //   const kk = await DetailKK.findAll(paramsquery);
    //   res.status(200).json(kk);

    // } catch (error) {
    //   console.log(error)
    //   next(error)
    // }
  }
}

module.exports = Controller;
