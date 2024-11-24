const { Op } = require("sequelize");
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
      const { filterRole, search } = req.query;
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
      const user = await User.findByPk(userId, {
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
  static async updateUser(req, res, next) {
    try {
      const { nama, email, noHp, alamat, RoleId, RtId, RwId } =
        req.body;
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
      const kartuKeluargaName = req.file.originalname; //file

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
      const { RwId,RtId } = findUser;

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
      } = req.query;
      let paramsquery = {
        attributes: { exclude: ["createdAt", "updatedAt"] },
        where: {},
        include:[{
          model: RT,
          attributes: ['nomor'],
        },
        {
          model: RW,
          attributes: ['nomor'],
        }]
      };
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
      const kartuKeluargaName = req.file.originalname; //file
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
}

module.exports = Controller;
