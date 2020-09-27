//Se decidio hacer un objeto para las propiedades y otro para los metodos
var properties = {
    paginacion: document.querySelectorAll("#paginacion li"),
    item: 0,
    slideN: document.querySelector("#slideshow ul"),
    cantImages: document.querySelectorAll("#slideshow ul li"),
    left: document.querySelector("#slideshow #left"),
    right: document.querySelector("#slideshow #right"),
    autoSlide: false,
    slideVelocity: 3000
};

var methods = {
    inicio: function () {
        properties.autoSlide = this.isAutoSlide();
        if (properties.autoSlide == false || properties.autoSlide == "false" || properties.autoSlide == "") {
            //selecciona todos los li de #paginacion y les asigna el eventListener
            for (let i = 0; i < properties.paginacion.length; i++) {
                properties.paginacion[i].addEventListener("click", methods.paginacionSlide);
            }
            //aniade eventos a los botones left y right
            properties.left.addEventListener("click", methods.goLeft);
            properties.right.addEventListener("click", methods.goRight);
        } else {
            //automatiza el slide en caso de que la propiedad auto este en true
            methods.autoSlide();
        }

        /* Setteo dinamico de los proporciones (width) para agregar mas imagenes */
        //Ampliar el width total del contenedor de imagenes
        properties.slideN.style.width = (properties.cantImages.length * 100) + "%";
        //Settear porcentaje entre la cantidad de imagenes que hay
        for (let i = 0; i < properties.cantImages.length; i++) {
            properties.cantImages[i].style.width = (100 / properties.cantImages.length) + "%";
        }

    },
    paginacionSlide: function (item) {
        //(target) propiedad de algun elemento del DOM que selecciona el HTML del objeto seleccionado
        //(parentNode) propiedad, selecciona el "padre" o contenedor de ese objeto HTML
        //(getAttribute()) metodo, obtiene el valor de un atributo del html (primitivo o creado por el dev)
        properties.item = item.target.parentNode.getAttribute("item-nro") - 1;
        //-1 para compararlo con el array
        methods.moveSlide(properties.item);
    },
    moveSlide: function (item) {
        /* el elemento "#slideshow ul" tiene un largo de 400% (en total por sus 4 imagenes) y cada
        vez que se utiliza el metodo, el left cambia por un 100% dependiendo su numero de item
        ej: 2 * 100% = 200%, se le agrega un menos para que se mueva a la izquierda siendo asi: -200%
        asi desaparezca/n el/los objeto/s anteriores */
        properties.slideN.style.left = (item * -100) + "%";

        /* aniade una transicion al mover el slide */
        properties.slideN.style.transition = "all 1s";

        /* selecciona todos los item de paginacion y les da opacidad 0.5 */
        for (let i = 0; i < properties.paginacion.length; i++) {
            properties.paginacion[i].style.opacity = .5;
        }

        /* selecciona al item de paginacion seleccionado y le da opacidad 1 */
        properties.paginacion[item].style.opacity = 1;
    },
    goLeft: function () {
        //validacion para que no pase la cantidad de imagenes que hay (0 ya que es un array)
        if (properties.item == 0) {
            properties.item = properties.cantImages.length - 1;
        } else {
            properties.item--;
        }
        methods.moveSlide(properties.item);
    },
    goRight: function () {
        //validacion para que no pase la cantidad de imagenes que hay (3+1 por el array)
        if (properties.item == properties.cantImages.length - 1) {
            properties.item = 0;
        } else {
            properties.item++;
        }
        methods.moveSlide(properties.item);
    },
    autoSlide: function () {
        setInterval(function () {
            methods.goRight();
        }, properties.slideVelocity);
        //oculta los controles del slideshow
        for (let i = 0; i < properties.paginacion.length; i++) {
            properties.paginacion[i].style.display = "none";
        }
        properties.left.style.display = "none";
        properties.right.style.display = "none";

    },
    isAutoSlide: function () {
        return this.urlReader("auto");
    },
    urlReader: function getParameterByName(name) {
        //funcion extraida de https://stackoverflow.com/questions/901115/how-can-i-get-query-string-values-in-javascript
        //para obtener el valor del parametro get (auto=true)
        name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
        var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
            results = regex.exec(location.search);
        return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
    }
}

methods.inicio();