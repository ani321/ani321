// Variables globales
var URIbusqueda = 'http://developer.echonest.com/api/v4/artist/search';
var URInoticias = 'http://developer.echonest.com/api/v4/artist/news';
var apiKey = 'FILDTEOIK2HBORODV';

/**
 * Función llamada al presionar botón "Buscar".
 */
function buscar() {
  // Obtener el nombre de artista ingresado
  var nombre = $('#termino-busqueda').val();

  // Delegar la llamada a la API de Echo Nest en otra función, pasando el nombre del artista
  buscarArtista(nombre);
}

/**
 * Función para buscar un artista utilizando la API de Echo Nest.
 */
function buscarArtista(nombre) {
  // Limpiar listado
  $('#listado').empty();

  // Realizar búsqueda, acción GET sobre protocolo HTTP
  $.ajax({
    type: "GET",
    datatType: "jsonp",
    url: URIbusqueda,
    data: {
      api_key: apiKey,
      name: nombre
    },
    success: function(data) {
      if(data.response.artists.length == 0) {
  alert('No se encontraron resultados.');
        $('#no-results').popup('open');
      }
      else {
        $.each(data.response.artists, function(index, value) {
          agregarArtista(value.id, value.name);
        });
      }
    }
  });
}

/**
 * Función que agrega un artista al listado de resultados.
 */
function agregarArtista(id, nombre) {
  var $ul = $('#listado');

  // Parámetros necesarios para cargar un artista en particular
  var params = {
    idartista: id,
    nombreartista: nombre
  };

  // Construcción de link de resultado de artista
  var $link = $('<a>',{
    id: id,
    text: nombre,
    title: nombre,
    href: '#'
  });

  // Asociamos la función 'cargarArtista' al evento 'click'
  $link.click(params, cargarArtista);

  // Agregamos un item al listado de resultados
  $ul.append($('<li>').append($link));
}

/**
 * Función que manipula la página de detalles del artista.
 */
function cargarArtista(evt) {
  // Obtener los parámetros necesarios para buscar detalles del artista
  var id = evt.data.idartista;
  var nombre = evt.data.nombreartista;

  // Pintar el título
  $('#nombre-artista').html(nombre);

  // Vincular links de pestañas
  var params = {
    idartista: id
  };
  $('#link-noticias').click(params, cargarNoticias);

  // Cambiamos la URL en el browser en el mismo documento pero otro 'anchor'
  window.location.href = '#pagina-artista';
}

/**
 * Función para obtener las noticias de un artista particular utilizando la API de Echo Nest.
 */
function cargarNoticias(evt) {
  // Obtenemos el ID del artista
  var idartista = evt.data.idartista;

  // Obtenemos la URI para solicitar noticias, variable global
  var url = URInoticias;

  // Llamada AJAX para obtener listado de noticias
  $.ajax({
    type: "GET",
    datatType: "jsonp",
    url: URInoticias,
    data: {
      api_key: apiKey,
      id: idartista
    },
    success: function(data) {
      if(data.response.news.length == 0) {
        // Si no hay noticias, pintamos mensaje correspondiente
        $('#contenido-artista').append($('<p>No hay noticias.</p>'));
      }
      else {
        // Si se encontraron noticias, se llama función que agrega cada una al DOM
        $.each(data.response.news, function(index, value) {
          agregarNoticia(value.id, value.name, value.url, value.summary, value.date_found);
        });
      }
    }
  });
}

/**
 * Función que agrega una noticia al contenido central.
 */
function agregarNoticia(id, name, url, summary, date) {
  var $contenido = $('#contenido-artista');
  var $envoltorio = $('<div data-role="collapsible" data-mini="true">');
  var $tituloNoticia = $('<h4>' + name + '</h4>');
  var $cuerpoNoticia = $('<p><strong>' + date.substring(0, 10) + '</strong>: ' + summary + '</p>');
  var $leerMas = $('<a>', {
    href: url,
    title: name,
    text: 'Leer más'
  });
  $envoltorio.append($tituloNoticia)
  $envoltorio.append($cuerpoNoticia);
  $envoltorio.append($leerMas);
  $contenido.append($envoltorio);
  $contenido.find(":jqmData(role=collapsible)").collapsible();
}
