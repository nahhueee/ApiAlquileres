-- phpMyAdmin SQL Dump
-- version 4.7.9
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1:3306
-- Tiempo de generación: 21-12-2021 a las 18:53:50
-- Versión del servidor: 5.7.21
-- Versión de PHP: 5.6.35

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `dbalquileres`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `alquileres`
--

DROP TABLE IF EXISTS `alquileres`;
CREATE TABLE IF NOT EXISTS `alquileres` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(100) NOT NULL,
  `imgPrincipal` varchar(300) NOT NULL,
  `descripcion` varchar(500) NOT NULL,
  `idTipo` int(11) NOT NULL,
  `idZona` int(11) NOT NULL,
  `ubicacion` varchar(150) NOT NULL,
  `capacidad` int(11) NOT NULL,
  `habitaciones` int(11) NOT NULL,
  `idCategoria` int(11) NOT NULL,
  `web` varchar(200) NOT NULL,
  `telefono1` varchar(100) NOT NULL,
  `telefono2` varchar(100) NOT NULL,
  `wpp` varchar(50) NOT NULL,
  `mail` varchar(100) NOT NULL,
  `destacado` int(11) NOT NULL DEFAULT '0',
  `precioGral` decimal(10,2) NOT NULL,
  `precioCond` varchar(50) NOT NULL,
  `latitud` varchar(50) NOT NULL,
  `longitud` varchar(50) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=14 DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `alquileres`
--

INSERT INTO `alquileres` (`id`, `nombre`, `imgPrincipal`, `descripcion`, `idTipo`, `idZona`, `ubicacion`, `capacidad`, `habitaciones`, `idCategoria`, `web`, `telefono1`, `telefono2`, `wpp`, `mail`, `destacado`, `precioGral`, `precioCond`, `latitud`, `longitud`) VALUES
(1, 'Cabañas del Oso', 'https://media-cdn.tripadvisor.com/media/photo-s/12/1c/26/7b/cabanas-del-oso.jpg', 'Excelente Cabañas', 1, 1, 'sdaasdw', 5, 1, 3, 'www.oso.com', '', '', '', '', 1, '500.00', 'xPersona', '', ''),
(2, 'Cabañas Las Nubes', 'https://cf.bstatic.com/images/hotel/max1024x768/534/53497865.jpg', 'Un complejo único con piscina, deck y bar propio. Ubicado a 2 cuadras del Río San Antonio. Con una hermosa vista a las Montañas\r\nLos departamentos se encuentran en alquiler todo el año. Están en la bella ciudad de San Antonio De Arredondo ubicada en la provincia de Córdoba preparados hasta para 10 personas.\r\n\r\nEsperamos puedas relajarte en nuestro complejo \"Un Lugar Diferente\". Reservá anticipado para la temporada de verano, consultá precios a Marcos.', 1, 2, 'asda', 4, 3, 3, '', '5544963', '', '', 'nahu852na\r\n@gmail.com', 1, '700.00', 'xNoche', '-31.716373', '-65.005792'),
(3, 'Cabañas Tunkelen', 'https://cf.bstatic.com/images/hotel/max1024x768/229/229756234.jpg', 'Excelente Servicios', 1, 1, 'asdasd', 6, 2, 4, 'www.tunkelen.com', '', '', '', 'lasnubes2020 @gmail.com', 1, '200.00', 'xPersona', '', ''),
(4, 'Cabañas Cumelen', 'https://cf.bstatic.com/images/hotel/max1024x768/130/130448040.jpg', 'Excelente cabaña bro', 1, 1, 'gfgdfgdfg', 5, 2, 1, 'www.cumelen.com', '', '', '', 'lasnubes2020 @gmail.com', 1, '0.00', 'Consultar', '', ''),
(5, 'Cabañas Morerava', 'https://images.adsttc.com/media/images/56fd/b861/e58e/ce2e/3200/000a/newsletter/sergio_rapanui_morerava_518.jpg?1459468366', 'Excelente Patio', 1, 2, 'aswweeqq', 2, 3, 2, 'www.cabanias.com', '', '', '', 'lasnubes2020 @gmail.com', 0, '0.00', '', '', ''),
(6, 'Cabañas los Amores', 'https://www.cabanias.com.ar/fotos/losamores.021.b1.jpg', 'Buenisimo', 1, 1, 'jbjb', 6, 4, 5, 'www.losanores.net', '', '', '', 'cabañasmaranata\r\n@gmail.com', 1, '600.00', 'xPersona', '', ''),
(7, 'Altozano Cabañas', 'https://q-xx.bstatic.com/images/hotel/max1024x768/246/246678570.jpg', 'Buenisima atencion', 1, 2, 'kolioihjkhjk', 4, 1, 2, 'www.altozano.com', '', '', '', '', 0, '0.00', '', '', ''),
(8, 'La Serranita', 'https://x.cdrst.com/foto/hotel-sf/a78eb/granderesp/cabanas-la-serranita-general-53eeb6b.jpg', 'Buena Calidad', 1, 2, 'kodosojr', 3, 2, 3, 'www.laserranita.tk', '', '', '', '', 1, '1200.00', 'xNoche', '', ''),
(9, 'Cabañas San Martin', 'https://www.pasionserrana.com/wp-content/uploads/2021/05/WhatsApp-Image-2021-05-14-at-15.00.00-768x512.jpeg', 'buenisima ocupacion', 1, 1, 'knmkkoo', 4, 1, 2, 'www.sanmartin.net', '', '', '', '', 1, '750.00', 'xPersona', '', ''),
(10, 'Patagonia Encantada', 'http://www.patagoniaencantada.com.ar/templates/patagoniaencantada/images/pagina/home/mosaic_1.jpg', 'pdoasjdas', 1, 2, 'asdasd', 5, 3, 5, 'www.patagonia.org', '', '', '', '', 0, '0.00', '', '', ''),
(11, 'La Soñada', 'https://fotos.alquilerargentina.com/v7/propiedades/pl73/pl73-Cabana-GE85E4FE.jpg?p=general', 'ryrdfkdf', 1, 2, 'jibnjasa', 6, 2, 1, 'www.soniada.com', '', '', '', '', 1, '0.00', 'Consultar', '', ''),
(12, 'El Raulí del Bonito', 'https://www.montehermosoalquila.com.ar/images/properties/images/257/3823_257.jpg', 'asdasdasd', 1, 2, 'asdasda', 5, 3, 3, 'www.rauli.tk', '', '', '', '', 0, '0.00', '', '', ''),
(13, 'Cabañas Maranata', 'https://res.cloudinary.com/creation-code/image/upload/v1616370512/20170105_143753_jtvlvo.jpg', 'Unidades con capacidad de 2 a 5 personas. Cochera cubierta, amplio patio, asador, predio perimetrado, TV satelital, sabanas, agua caliente las 24 hs, ventiladores en cada ambiente, 2 habitaciones, vajilla completa .\r\nA 300m de la oficina de turismo (rotonda de ingreso) , 250m del río Los Sauces y a 500m del centro.', 1, 1, 'Villa de Soto 2039', 5, 2, 3, 'https://www.cabañasmaranata.ml', '3544 554459', '3544 661040', '543544554459', 'duplexmaranata\r\n@gmail.com', 1, '1200.00', 'xPersona', '-31.73857178234314', '-65.00440872624107');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `categorias`
--

DROP TABLE IF EXISTS `categorias`;
CREATE TABLE IF NOT EXISTS `categorias` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `categoria` varchar(100) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=6 DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `categorias`
--

INSERT INTO `categorias` (`id`, `categoria`) VALUES
(1, 'Casas o Chalets'),
(2, 'Departamentos o Duplex'),
(3, 'Cabañas o Bungalows'),
(4, 'Hoteles'),
(5, 'Campings');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `comentarios`
--

DROP TABLE IF EXISTS `comentarios`;
CREATE TABLE IF NOT EXISTS `comentarios` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `idAlquiler` int(11) NOT NULL,
  `raiting` int(11) NOT NULL,
  `titulo` varchar(30) NOT NULL,
  `descripcion` varchar(250) NOT NULL,
  `fecha` varchar(30) NOT NULL,
  `mail` varchar(150) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=23 DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `comentarios`
--

INSERT INTO `comentarios` (`id`, `idAlquiler`, `raiting`, `titulo`, `descripcion`, `fecha`, `mail`) VALUES
(1, 13, 5, 'Excelente', 'Muy buena la atención, excelente lugar para descansar.', '0000-00-00', ''),
(9, 13, 2, 'Excelente', 'NO me gusto mucho la verdad', '2021-03-23', ''),
(8, 13, 4, 'Me gusto bastante', 'excelente', '2021-03-23', ''),
(7, 13, 3, 'Mediocre', 'maso menos', '2021-03-23', ''),
(6, 13, 4, 'Buenisima mi estadia', 'Todo Joya', '2021-03-22', ''),
(10, 13, 5, 'Todo Ok', 'La verdad que excelente', '2021-03-23', ''),
(11, 13, 5, 'Sin comentarios', 'Muy buena expericia', '2021-03-23', ''),
(12, 2, 4, 'Excelente', 'Bastante buenardo ', '2021-03-26', ''),
(13, 2, 2, 'Desepcionado', 'No tuve una buena experiencia', '2021-03-27', ''),
(14, 1, 5, 'Muy bien', 'Muy bueno todo', '2021-03-27', ''),
(15, 2, 4, 'Me encanto', 'Me gusto mucho el alojamiento, muy lindo toda la vista y la piscina', '2021-03-27', ''),
(16, 2, 5, 'Buena Atencion', 'Me super encanto el alojamiento, muy recomendable.', '2021-03-27', ''),
(17, 13, 5, 'Buenisima', 'Me encanto', '2021-03-27', ''),
(18, 13, 3, 'Muy interesante', 'asdasdasdasdasdasdasdasdasdasdasd', '2021-12-10T02:48:53.467Z', 'nahu852na@gmail.com'),
(19, 13, 1, 'Malisimo', 'Jajdbebrkdidnsndkdkdnnnmllpplk', '2021-12-10T02:50:35.025Z', 'Nahu852na@gmail.com'),
(20, 13, 5, 'Excelente', 'la verdad que muy bien, nunca me diverti tanto\n', '2021-12-10T02:57:33.533Z', 'nahu852na@gmail.com'),
(21, 13, 5, 'Muy interesante', 'asdasdasdasdasdasdasdasdsdaddsd', '2021/12/10', 'nahu852na@gmail.com'),
(22, 13, 4, 'Excelente', 'Estuvo muy bien el alojamiento', '2021/12/10', 'nahu09812@gmail.com');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `condicionesalquiler`
--

DROP TABLE IF EXISTS `condicionesalquiler`;
CREATE TABLE IF NOT EXISTS `condicionesalquiler` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `idAlquiler` int(11) NOT NULL,
  `titulo` varchar(30) NOT NULL,
  `descripcion` varchar(200) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=9 DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `condicionesalquiler`
--

INSERT INTO `condicionesalquiler` (`id`, `idAlquiler`, `titulo`, `descripcion`) VALUES
(2, 13, 'Reservas', 'Se reserva con el 50% del total de días a hospedarse'),
(3, 13, 'Visitas', 'No son permitidas'),
(4, 13, 'Tipos de Pago', 'Efectivo - Tarjeta - Trasferencia'),
(7, 13, 'Horario de Entrada', '11:00hs'),
(8, 13, 'Horario de Salida', '10:00hs');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `galeria`
--

DROP TABLE IF EXISTS `galeria`;
CREATE TABLE IF NOT EXISTS `galeria` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `imagen` varchar(600) NOT NULL,
  `idAlquiler` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=13 DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `galeria`
--

INSERT INTO `galeria` (`id`, `imagen`, `idAlquiler`) VALUES
(1, 'https://res.cloudinary.com/creation-code/image/upload/v1616371351/CabaniasMaranata/DSCN9218_ltlvps.jpg', 13),
(2, 'https://res.cloudinary.com/creation-code/image/upload/v1616371029/CabaniasMaranata/DSCN9271_i4pkd4.jpg', 13),
(3, 'https://res.cloudinary.com/creation-code/image/upload/v1616371009/CabaniasMaranata/DSCN9266_se4laq.jpg', 13),
(4, 'https://res.cloudinary.com/creation-code/image/upload/v1616370935/CabaniasMaranata/DSCN9222_rs48xg.jpg', 13),
(5, 'https://res.cloudinary.com/creation-code/image/upload/v1616370906/CabaniasMaranata/DSCN9187_ejntm2.jpg', 13),
(6, 'https://res.cloudinary.com/creation-code/image/upload/v1616370903/CabaniasMaranata/DSCN9228_zz9tbc.jpg', 13),
(7, 'https://res.cloudinary.com/creation-code/image/upload/v1616373303/cabaniasLasNubes/10_ojmfrq.jpg', 2),
(8, 'https://res.cloudinary.com/creation-code/image/upload/v1616373302/cabaniasLasNubes/home_whatsapp-image-2021-01-02-at-15-17-13-jpeg_dvrh93.jpg', 2),
(9, 'https://res.cloudinary.com/creation-code/image/upload/v1616373302/cabaniasLasNubes/home_dsc_4913_jmngwr.jpg', 2),
(10, 'https://res.cloudinary.com/creation-code/image/upload/v1616373299/cabaniasLasNubes/vista-desde-loft-champaqui_lef2ez.jpg', 2),
(11, 'https://res.cloudinary.com/creation-code/image/upload/v1616373298/cabaniasLasNubes/lightbox_diciembre-del-2011-en-san-javier-021_ksnvom.jpg', 2),
(12, 'https://res.cloudinary.com/creation-code/image/upload/v1616373296/cabaniasLasNubes/lasnubes.021.b2_w7h8fe.jpg', 2);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `galeriazona`
--

DROP TABLE IF EXISTS `galeriazona`;
CREATE TABLE IF NOT EXISTS `galeriazona` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `ruta` varchar(250) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `servicios`
--

DROP TABLE IF EXISTS `servicios`;
CREATE TABLE IF NOT EXISTS `servicios` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(80) NOT NULL,
  `icono` varchar(300) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=16 DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `servicios`
--

INSERT INTO `servicios` (`id`, `nombre`, `icono`) VALUES
(1, 'WI-FI', 'https://res.cloudinary.com/creation-code/image/upload/v1638463457/iconos/wifi_t1dzyb.jpg'),
(2, 'Cochera', 'https://res.cloudinary.com/creation-code/image/upload/v1638463452/iconos/cochera_sruhxz.jpg'),
(3, 'Pileta', 'https://res.cloudinary.com/creation-code/image/upload/v1638463454/iconos/piscina_a4tx3o.jpg'),
(4, 'Aire Acondicionado', 'https://res.cloudinary.com/creation-code/image/upload/v1638463452/iconos/aire_f6qmai.jpg'),
(5, 'Calefacción', 'https://res.cloudinary.com/creation-code/image/upload/v1638463452/iconos/calefaccion_eyuwag.jpg'),
(6, 'Asador', 'https://res.cloudinary.com/creation-code/image/upload/v1638463452/iconos/asador_oajbxa.jpg'),
(7, 'Patio', 'https://res.cloudinary.com/creation-code/image/upload/v1638463453/iconos/patio_vmuyuj.jpg'),
(8, 'Ventiladores', 'https://res.cloudinary.com/creation-code/image/upload/v1638463457/iconos/ventilador_u4repu.jpg'),
(9, 'Vajilla', 'https://res.cloudinary.com/creation-code/image/upload/v1638463456/iconos/vajilla_pazk92.jpg'),
(10, 'Se permite fumar', 'https://res.cloudinary.com/creation-code/image/upload/v1638463455/iconos/cigarrillo_klhhlm.jpg'),
(11, 'TV', 'https://res.cloudinary.com/creation-code/image/upload/v1638463453/iconos/tv_cvzxkw.jpg'),
(12, 'Agua Caliente', 'https://res.cloudinary.com/creation-code/image/upload/v1638463455/iconos/agua_ttlvue.jpg'),
(13, 'Ropa de Cama', 'https://res.cloudinary.com/creation-code/image/upload/v1638463453/iconos/ropaCama_ocjgmq.jpg'),
(14, 'Se permite Mascotas', 'https://res.cloudinary.com/creation-code/image/upload/v1638463453/iconos/mascotas_etoknx.jpg'),
(15, 'Desayuno', 'https://res.cloudinary.com/creation-code/image/upload/v1638463452/iconos/desayuno_xcpnps.jpg');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `serviciosalquiler`
--

DROP TABLE IF EXISTS `serviciosalquiler`;
CREATE TABLE IF NOT EXISTS `serviciosalquiler` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `idServicio` int(11) NOT NULL,
  `idAlquiler` int(11) NOT NULL,
  `descripcion` varchar(80) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=33 DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `serviciosalquiler`
--

INSERT INTO `serviciosalquiler` (`id`, `idServicio`, `idAlquiler`, `descripcion`) VALUES
(18, 11, 13, 'DirecTV'),
(17, 10, 13, ''),
(16, 9, 13, 'Completa'),
(15, 8, 13, 'En cada ambiente'),
(14, 7, 13, ''),
(13, 6, 13, ''),
(12, 2, 13, 'Cubierta'),
(11, 1, 13, ''),
(19, 12, 13, 'Todo el Dia'),
(20, 13, 13, 'Sabanas, no Toallas'),
(21, 14, 13, 'Dependiendo la mascota'),
(22, 1, 2, ''),
(23, 2, 2, ''),
(24, 3, 2, ''),
(25, 4, 2, ''),
(26, 10, 2, ''),
(27, 15, 2, ''),
(28, 2, 4, ''),
(29, 3, 4, ''),
(30, 8, 4, ''),
(31, 4, 4, ''),
(32, 12, 4, '');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tarifas`
--

DROP TABLE IF EXISTS `tarifas`;
CREATE TABLE IF NOT EXISTS `tarifas` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `icono` varchar(350) NOT NULL,
  `tarifa` varchar(50) NOT NULL,
  `c` tinyint(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `tarifas`
--

INSERT INTO `tarifas` (`id`, `icono`, `tarifa`, `c`) VALUES
(1, 'https://res.cloudinary.com/creation-code/image/upload/v1638670914/Tarifas/Consultar_csyyud.jpg', 'Consultar', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tarifasalquiler`
--

DROP TABLE IF EXISTS `tarifasalquiler`;
CREATE TABLE IF NOT EXISTS `tarifasalquiler` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `idAlquiler` int(11) NOT NULL,
  `idTarifa` int(11) NOT NULL,
  `descripcion` varchar(30) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `tarifasalquiler`
--

INSERT INTO `tarifasalquiler` (`id`, `idAlquiler`, `idTarifa`, `descripcion`) VALUES
(1, 13, 1, 'Consultar');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tipoalquiler`
--

DROP TABLE IF EXISTS `tipoalquiler`;
CREATE TABLE IF NOT EXISTS `tipoalquiler` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `tipoAlquiler` varchar(50) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `tipoalquiler`
--

INSERT INTO `tipoalquiler` (`id`, `tipoAlquiler`) VALUES
(1, 'Temporario'),
(2, 'Anual/Mensual');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `zonas`
--

DROP TABLE IF EXISTS `zonas`;
CREATE TABLE IF NOT EXISTS `zonas` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(100) NOT NULL,
  `descripcion` varchar(900) NOT NULL,
  `imgPrincipal` varchar(300) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=5 DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `zonas`
--

INSERT INTO `zonas` (`id`, `nombre`, `descripcion`, `imgPrincipal`) VALUES
(1, 'Mina Clavero', 'Ubicada al pie de las Sierras Grandes, Mina Clavero es el centro urbano más importante del Valle de Traslasierra.\r\nDueña de indescriptibles y variados paisajes, es el destino más elegido del Valle de Traslasierra y un plan ideal para entretenerse o descansar.\r\nEntre las razones para visitarla una y otra vez, se destacan tres ríos e infinidad de arroyos imperdibles. De relucientes y cristalinas aguas, la gran belleza del río Mina Clavero es un orgullo cordobés. A lo largo de estos afluentes, pueden encontrarse balnearios naturales y áreas de descanso para disfrutar en familia o con amigos. Con un microclima privilegiado, cada uno presenta diversas alternativas para pasar el día entre playas de grandes extensiones, ollas profundas , toboganes y cascadas.\r\nTe invitamos a descubrir este paraíso natural en las sierras.', 'https://res.cloudinary.com/creation-code/image/upload/v1639186782/Localidades/Mina_r1ag5s.jpg'),
(2, 'Nono', 'El pintoresco pueblo de Nono se encuentra ubicado al pie de las Sierras Grandes, en el cordón montañoso de las Altas Cumbres, uno de los paisajes más hermosos e imponentes de la provincia de Córdoba.\r\n\r\nEl pueblo está atravesado por dos ríos diferentes y complementarios entre sí El Río de los Sauces', 'https://res.cloudinary.com/creation-code/image/upload/v1639186788/Localidades/Nono_ynv1yn.jpg'),
(3, 'Villa Cura Brochero', 'A orillas del río Panaholma, Villa Cura Brochero  es reconocida por sus paisajes serranos y por haber sido testigo de la obra cristiana del Cura Gaucho, San José Gabriel Brochero, quien vivió allí y llevó su misión evangelizadora a todo el Valle de Traslasierra.', 'https://res.cloudinary.com/creation-code/image/upload/v1639186787/Localidades/Brochero_uigwrf.jpg'),
(4, 'Villa de Las Rosas', 'Agreste y tranquila al pie del cerro Champaquí, Villa de Las Rosas es otro de los imperdibles del Valle de Traslasierra.\r\n\r\nRepleta de las rosas silvestres que le dan su nombre, quien la visite será recibido por el aroma y por la amabilidad de su gente. A su alrededor, los arroyos Los Molles, Las Ch', 'https://res.cloudinary.com/creation-code/image/upload/v1639186789/Localidades/Rosas_bmbdhq.jpg');
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
