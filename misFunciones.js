
function traerDatosBarcos(){
    alert("Bienvenidos a la lista de barcos")
    $.ajax({
        url:  'https://gbc877c5e8ec869-j29jjtmijhjlvfye.adb.us-ashburn-1.oraclecloudapps.com/ords/admin/boat/boat',
        type: 'GET',
		dataType: 'json',
        success: function(respuesta){
            pintarDatosGeneral(respuesta.items, "name", "boat");
        },
        error: function(respuesta, xhr){
            alert("Error de petición!");

        }
    })
}

function traerDatosClientes(){
    alert("Bienvenidos a la lista de Clientes")
    $.ajax({
        url:  'https://gbc877c5e8ec869-j29jjtmijhjlvfye.adb.us-ashburn-1.oraclecloudapps.com/ords/admin/client/client',
        type: 'GET',
		dataType: 'json',
        success: function(respuesta){
            pintarDatosGeneral(respuesta.items, "name", "client");
        },
        error: function(respuesta, xhr){
            alert("Error de petición!");

        }
    })
}

function traerDatosMessage(){
    alert("Bienvenidos a la lista de Message")
    $.ajax({
        url:  'https://gbc877c5e8ec869-j29jjtmijhjlvfye.adb.us-ashburn-1.oraclecloudapps.com/ords/admin/message/message',
        type: 'GET',
		dataType: 'json',
        success: function(respuesta){
            pintarDatosGeneral(respuesta.items, "messagetext", "message");
        },
        error: function(respuesta, xhr){
            alert("Error de petición!");

        }
    })
}

function guardarIdyTipo(id, tipo){
    sessionStorage.setItem('id', id);
    sessionStorage.setItem('tipo', tipo);
    location.href='detalles.html';
}

function mostrarDetalle(){
    alert("Bienvenidos a la lista de Detalle")
    let id = sessionStorage.getItem('id');
    let tipo = sessionStorage.getItem('tipo');

    $.ajax({
        url:  'https://gbc877c5e8ec869-j29jjtmijhjlvfye.adb.us-ashburn-1.oraclecloudapps.com/ords/admin/'+tipo+'/'+tipo+'/'+id,
        type: 'GET',
		dataType: 'json',
        success: function(respuesta){
            pintarDatosDetalle(respuesta.items);
        },
        error: function(respuesta, xhr){
            alert("Error de petición!");
        }
    });
}

function pintarDatosGeneral(datos, titulo, tipoTabla){
    let htmlParaInsertar ="";
    htmlParaInsertar+="<tr>";
    htmlParaInsertar+="<th>Titulo</th>"
    htmlParaInsertar+="</tr>";

    for(let i=0; i<datos.length; i++){
        htmlParaInsertar+="<tr>";

        htmlParaInsertar+="<td><a href='#' onclick='guardarIdyTipo("+datos[i].id+", \""+tipoTabla+"\");'>"+datos[i][titulo]+"</a></td>";

        htmlParaInsertar+="</tr>";

        $("#resultado").empty();
        $("#resultado").append(htmlParaInsertar);

    }
}


function pintarDatosDetalle(datos){
    let htmlParaInsertar ="";
    htmlParaInsertar+="<tr>";
    Object.keys(datos[0]).forEach(elemento => htmlParaInsertar+="<th>"+elemento+"</th>");
    htmlParaInsertar+="</tr>";

    for(let i=0; i<datos.length; i++){
        htmlParaInsertar+="<tr>";

        Object.values(datos[i]).forEach(elemento => htmlParaInsertar+="<td>"+elemento+"</td>");

        htmlParaInsertar+="</tr>";


    }
        
   

    $("#resultado").empty();
    $("#resultado").append(htmlParaInsertar);

}


function leerDatosTablaDetalle(){
    let fila = document.getElementById('tablaDetalle').ariaRowSpan.item(1).cells;
    let datos={

            "name": fila.item(1).innerText,
            "brand": fila.item(2).innerText,
            "model": fila.item(3).innerText,
            "category_id": parseInt(fila.item(4).innerText),
            "id": fila.item(0).innerText
        }


    return datos;

}