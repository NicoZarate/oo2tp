Trabajo Final De Orientación a Objetos 2

Integrantes:

Zárate, Nicolás
Rodriguez, Gabriela

Objetivo:

Realización de un trabajo para obtener la nota final de la materia. En dicho trabajo se aplicarán los conocimientos aprendidos durante la cursada de Orientación a Objetos 2, y se profundizarán con el uso de tecnologías específicas en las cuales se implementarán.

Propuesta del docente:

A través de pequeñas reuniones al estilo scrum, Arturo Zambrano nos propuso la realización de una aplicación web utilizando el framework Express para Node.js. La aplicación consta de una línea de tiempo en la cual se podrán visualizar distintos tipos de eventos a lo largo del tiempo, agregar nuevos eventos y modificar eventos existentes. Tales eventos cuentan con un tipo, nombre, momento de inicio, momento de fin, una transición de entrada y una transición de salida. Los eventos, sus características y posibles transiciones se encuentran detallados en archivos JSON entregados por el docente, los cuales fueron utilizados en la aplicación.


Reporte sobre las situaciones afrontadas durante el desarrollo y toma de decisiones:

Al inicio del proyecto, se iba a utilizar el framework SeaSide para desarrollar el trabajo final. Sin embargo, luego de investigar sobre este framework, nos dimos cuenta que se nos hacía muy engorroso el no poder utilizar GitHub como sistema de versionamiento de código ya que cada uno de los integrantes del equipo de desarrollo nos encontraríamos trabajando remotamente. Además, la poca documentación extraoficial del framework y su baja utilización nos redujo las expectativas sobre el mismo. Sumado a lo anterior, el entorno de desarrollo de Pharo tampoco nos terminaba de convencer, ya que estamos más acostumbrados a la utilización de editores de texto como Sublime. Por lo tanto, decidimos dar un giro hacia Node.js, que es ampliamente utilizado y con una gran comunidad activa.
Luego de varias pruebas y acostumbrarnos un poco al lenguaje, Arturo Zambrano nos requirió una investigación sobre librerías que pudieran ayudarnos a modelar eventos en alguna especie de línea de tiempo. Realizamos una presentación con diapositivas a modo de recordatorio sobre las distintas APIS que encontramos y testeamos, y se las presentamos al docente justificando nuestra elección final. Entre las librerías analizadas se incluyen Bhive, HighCharts, TimelineJS y React Event Timeline. Sin embargo, la librería que más se ajustaba a nuestras necesidades y nos resultó más simple de utilizar, además de tener una amplia documentación oficial y muchos ejemplos, fue VisJS. VisJS es desarrollada por una organización llamada Almende y es open source. Cuenta con representaciones gráficas de líneas de tiempo, redes, gráficos 2D, gráficos 3D y DataSet. Luego de obtener la aprobación del docente ante esta librería, nosotros la utilizaremos con su funcionalidad de timeline para representar la línea de tiempo que albergará a los eventos.
En las primeras reuniones que tuvimos, se estableció el hecho de tener varias líneas de tiempo sincronizadas, por lo que para realizar esto tuvimos que adentrarnos en el mundo de los eventos, y utilizar listeners para poder captar el instante en que una línea cambiaba, para poder reflejar ese cambio en las demás líneas. Los listeners que utilizamos en esta etapa fueron los de Google API, ya que encontramos varios ejemplos en la documentación oficial utilizando esta librería en combinación con VisJS, aunque también probamos utilizando los propios listeners de VisJS, pero tuvimos un déficit de performance comparado a la utilización de los listeners de Google (los de VisJS eran más lentos en plasmar los resultados actualizados por la sincronización de las líneas de tiempo). De todos modos, en reuniones posteriores se terminó decidiendo que habría solo una única línea de tiempo, por lo que estos listeners de Google para la sincronización de las líneas de tiempo fueron eliminados.