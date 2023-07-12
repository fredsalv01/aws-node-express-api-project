class Personaje {
  constructor(
    id,
    nombre,
    altura,
    peso,
    color_cabello,
    color_piel,
    color_ojos,
    fecha_nacimiento,
    genero,
    planetaNatal,
    peliculas,
    especies,
    vehiculos,
    navesEspaciales,
    biografia = null
  ) {
    this.id = id;
    this.nombre = nombre;
    this.altura = altura;
    this.peso = peso;
    this.color_cabello = color_cabello;
    this.color_piel = color_piel;
    this.color_ojos = color_ojos;
    this.fecha_nacimiento = fecha_nacimiento;
    this.genero = genero;
    this.planetaNatal = planetaNatal;
    this.peliculas = peliculas;
    this.especies = especies;
    this.vehiculos = vehiculos;
    this.navesEspaciales = navesEspaciales;
    this.biografia = biografia;
  }
}

module.exports = Personaje;