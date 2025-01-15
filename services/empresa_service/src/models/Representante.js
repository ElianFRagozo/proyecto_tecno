const Representante = sequelize.define("Representante", {
    nombres: {
      type: DataTypes.STRING,
      allowNull: false,
      comment: "Nombres del representante legal",
    },
    apellidos: {
      type: DataTypes.STRING,
      allowNull: false,
      comment: "Apellidos del representante legal",
    },
    tipoDocumento: {
      type: DataTypes.STRING,
      allowNull: false,
      comment: "Tipo de documento del representante (CC, CE, etc.)",
    },
    numeroDocumento: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      comment: "Número de documento del representante",
    },
    anoNacimiento: {
      type: DataTypes.INTEGER,
      allowNull: false,
      comment: "Año de nacimiento del representante",
    },
    cargo: {
      type: DataTypes.STRING,
      allowNull: false,
      comment: "Cargo del representante dentro de la empresa",
    },
  }, {
    timestamps: true,
    tableName: "representantes",
  });
  
  module.exports = Representante;
  